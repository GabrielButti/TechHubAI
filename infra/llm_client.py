from infra.gemini_client import chamar_gemini

def gerar_resposta_llm(prompt: str) -> str:
    return chamar_gemini(prompt)
