"""
FastAPI server with health-check and PDF upload endpoint.

Run:
    uvicorn app.main:app --reload

Endpoints:
    GET  /health
    POST /pdf  (multipart/form-data, field name: "file")
"""

from __future__ import annotations

import logging
import os
from dataclasses import dataclass
from pathlib import Path
from typing import Protocol
from uuid import uuid4

from fastapi import Depends, FastAPI, File, HTTPException, UploadFile, status
from fastapi.responses import JSONResponse

logger = logging.getLogger(__name__)


# -----------------------------
# Configuration
# -----------------------------
@dataclass(frozen=True, slots=True)
class Settings:
    """Application settings loaded from environment variables.

    Attributes:
        upload_dir: Directory where uploaded PDFs are stored.
        max_upload_bytes: Maximum allowed upload size in bytes.
    """

    upload_dir: Path
    max_upload_bytes: int

    @staticmethod
    def from_env() -> "Settings":
        """Load settings from environment variables."""
        upload_dir = Path(os.getenv("UPLOAD_DIR", "./uploads")).resolve()
        max_upload_bytes = int(
            os.getenv("MAX_UPLOAD_BYTES", str(10 * 1024 * 1024)))  # 10 MB default
        return Settings(upload_dir=upload_dir, max_upload_bytes=max_upload_bytes)


def configure_logging() -> None:
    """Configure application logging."""
    logging.basicConfig(
        level=os.getenv("LOG_LEVEL", "INFO").upper(),
        format="%(asctime)s %(levelname)s %(name)s - %(message)s",
    )


# -----------------------------
# Ports (interfaces)
# -----------------------------
class PdfStorage(Protocol):
    """Storage abstraction for PDF persistence."""

    def save(self, data: bytes, filename: str) -> Path:
        """Persist a PDF payload.

        Args:
            data: Raw PDF bytes.
            filename: Original filename.

        Returns:
            Path where the file was saved.
        """


# -----------------------------
# Adapters (implementations)
# -----------------------------
class LocalPdfStorage:
    """Stores PDFs on local filesystem."""

    def __init__(self, base_dir: Path) -> None:
        self._base_dir = base_dir
        self._base_dir.mkdir(parents=True, exist_ok=True)

    def save(self, data: bytes, filename: str) -> Path:
        safe_name = self._sanitize_filename(filename)
        target = self._base_dir / safe_name
        target.write_bytes(data)
        return target

    @staticmethod
    def _sanitize_filename(filename: str) -> str:
        # Avoid path traversal; keep only name part, replace problematic chars.
        name = Path(filename).name
        name = name.replace("/", "_").replace("\\", "_")
        return name or f"upload-{uuid4().hex}.pdf"


# -----------------------------
# Domain / Services
# -----------------------------
class PdfUploadService:
    """Business logic for validating and storing PDFs."""

    def __init__(self, storage: PdfStorage, max_upload_bytes: int) -> None:
        self._storage = storage
        self._max_upload_bytes = max_upload_bytes

    async def handle_upload(self, upload: UploadFile) -> Path:
        """Validate upload and persist it.

        Args:
            upload: The uploaded file.

        Returns:
            Saved file path.

        Raises:
            HTTPException: For validation failures.
        """
        self._validate_metadata(upload)

        data = await upload.read()
        if not data:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Arquivo vazio.",
            )
        if len(data) > self._max_upload_bytes:
            raise HTTPException(
                status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
                detail=f"Arquivo excede o limite de {self._max_upload_bytes} bytes.",
            )

        # Basic PDF signature check: PDF files typically start with "%PDF-"
        if not data.startswith(b"%PDF-"):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Conteúdo não parece ser um PDF válido.",
            )

        stored_name = f"{uuid4().hex}-{Path(upload.filename or 'upload.pdf').name}"
        saved_path = self._storage.save(data=data, filename=stored_name)

        logger.info("PDF saved: name=%s size=%d path=%s",
                    upload.filename, len(data), saved_path)
        return saved_path

    @staticmethod
    def _validate_metadata(upload: UploadFile) -> None:
        filename = upload.filename or ""
        if not filename.lower().endswith(".pdf"):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Envie um arquivo com extensão .pdf.",
            )

        content_type = (upload.content_type or "").lower()
        # Some clients may send application/octet-stream; we still allow if signature matches later.
        allowed = {"application/pdf", "application/octet-stream"}
        if content_type and content_type not in allowed:
            raise HTTPException(
                status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
                detail=f"Content-Type inválido: {upload.content_type}. Use application/pdf.",
            )


# -----------------------------
# Dependency injection
# -----------------------------
def get_settings() -> Settings:
    """Provide app settings."""
    return Settings.from_env()


def get_storage(settings: Settings = Depends(get_settings)) -> PdfStorage:
    """Provide PDF storage implementation."""
    return LocalPdfStorage(settings.upload_dir)


def get_upload_service(
    settings: Settings = Depends(get_settings),
    storage: PdfStorage = Depends(get_storage),
) -> PdfUploadService:
    """Provide the upload service."""
    return PdfUploadService(storage=storage, max_upload_bytes=settings.max_upload_bytes)


# -----------------------------
# FastAPI application
# -----------------------------
configure_logging()
app = FastAPI(title="PDF Upload API", version="1.0.0")


@app.get("/health", response_class=JSONResponse)
def health_check() -> dict[str, str]:
    """Health-check endpoint.

    Returns:
        A simple status payload.
    """
    return {"status": "ok"}


@app.post("/pdf", status_code=status.HTTP_201_CREATED)
async def upload_pdf(
    file: UploadFile = File(...),
    service: PdfUploadService = Depends(get_upload_service),
) -> dict[str, str]:
    """Receive a PDF file upload and store it.

    The request must be multipart/form-data with field name "file".

    Args:
        file: Uploaded file.
        service: Upload service.

    Returns:
        Metadata about the stored file.
    """
    saved_path = await service.handle_upload(file)
    return {"message": "PDF recebido com sucesso.", "path": str(saved_path)}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("app.main:app", host="0.0.0.0", port=int(
        os.getenv("PORT", "8000")), reload=True)
