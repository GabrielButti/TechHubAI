GET /health
```

Retorna um status indicando se a API está funcionando.

### Upload de PDF

```http
POST /pdf
```

**Formato:** `multipart/form-data`

**Campo:** `file` (tipo: file)

**Validações:**
- O arquivo deve ter extensão `.pdf`.
- O tamanho máximo é de 10MB.
- O conteúdo deve começar com `%PDF-` (assinatura básica de PDF).

**Resposta:**
- `201 Created`: Se o upload for bem-sucedido.
- `400 Bad Request`: Se o arquivo estiver vazio, não for um PDF válido ou tiver extensão incorreta.
- `413 Payload Too Large`: Se o arquivo exceder o tamanho máximo.
- `415 Unsupported Media Type`: Se o Content-Type não for `application/pdf`.

## Como Executar

1. **Instalar dependências:**
   ```bash
   uv pip install -r requirements.txt
   ```

2. **Executar a API:**
   ```bash
   uvicorn app.main:app --reload
   ```

## Teste

Você pode testar a API usando o cliente HTML fornecido:

```bash
python -m http.server 8000 --directory client