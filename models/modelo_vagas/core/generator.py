import json
from infra.llm_client import gerar_resposta_llm

def avaliar_candidatura(
    curriculo: dict, vaga: dict, schema: dict, prompt_base: str
) -> dict:
    prompt = (
        prompt_base.replace("{SCHEMA}", json.dumps(schema, ensure_ascii=False))
        .replace("{CURRICULO}", json.dumps(curriculo, ensure_ascii=False))
        .replace("{VAGA}", json.dumps(vaga, ensure_ascii=False))
    )

    resposta = gerar_resposta_llm(prompt)

    return json.loads(resposta)