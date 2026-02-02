import json
from infra.llm_client import gerar_resposta_llm


def gerar_curriculo(schema: dict, dados: dict, prompt_base: str) -> str:
    prompt = prompt_base.replace(
        "{SCHEMA}", json.dumps(schema, ensure_ascii=False)
    ).replace("{DADOS}", json.dumps(dados, ensure_ascii=False))

    resposta = gerar_resposta_llm(prompt)
    return resposta


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


def gerar_perguntas_entrevista(curriculo: dict, vaga: dict, schema: dict, prompt_base: str) -> dict:

    prompt = (
        prompt_base
        .replace("{SCHEMA}", json.dumps(schema, ensure_ascii=False))
        .replace("{CURRICULO}", json.dumps(curriculo, ensure_ascii=False))
        .replace("{VAGA}", json.dumps(vaga, ensure_ascii=False))
    )

    resposta = gerar_resposta_llm(prompt)
    return json.loads(resposta)
