import json
from infra.llm_client import gerar_resposta_llm

def gerar_curriculo(schema: dict, dados: dict, prompt_base: str) -> str:
    prompt = prompt_base \
        .replace("{SCHEMA}", json.dumps(schema, ensure_ascii=False)) \
        .replace("{DADOS}", json.dumps(dados, ensure_ascii=False))

    resposta = gerar_resposta_llm(prompt)
    return resposta
