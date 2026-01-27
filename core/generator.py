import json
from infra.ollama_client import chamar_ollama

def gerar_curriculo(schema: dict, dados: dict, prompt_base: str) -> str:
    prompt = prompt_base \
        .replace("{SCHEMA}", json.dumps(schema, ensure_ascii=False)) \
        .replace("{DADOS}", json.dumps(dados, ensure_ascii=False))

    resposta = chamar_ollama(prompt)
    return resposta
