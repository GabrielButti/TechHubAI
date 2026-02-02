import json

from core.generator import avaliar_candidatura, gerar_curriculo, gerar_perguntas_entrevista
from dados.curriculos import data_curriculos
from dados.vagas import data_vagas
from render.pdf_renderer import renderizar_pdf

with open("schemas/curriculo_v1.json", encoding="utf-8") as f:
    schema_curriculo = json.load(f)

with open("schemas/avaliacao_vaga_v1.json", encoding="utf-8") as f:
    schema_vaga = json.load(f)

with open("schemas/perguntas_vagas_v1.json", encoding="utf-8") as f:
    schema_perguntas = json.load(f)

with open("prompts/gerar_curriculo_v2en.txt", encoding="utf-8") as f:
    prompt_base_curriculo = f.read()

with open("prompts/avaliar_vaga_v1en.txt", encoding="utf-8") as f:
    prompt_base_vaga = f.read()

with open("prompts/gerar_perguntas_vaga_v1.txt", encoding="utf-8") as f:
    prompt_base_perguntas = f.read()



dados_candidato = data_curriculos[0]
resultado_curriculo = ""
curriculo = None
try:
    resultado_curriculo = gerar_curriculo(
        schema_curriculo, dados_candidato, prompt_base_curriculo
    )
except Exception as e:
    print(f"Erro ao gerar currículo: {e}")

try:
    renderizar_pdf(curriculo=curriculo)
except Exception as e:
    print(f"Erro ao renderizar PDF: {e}")

print(resultado_curriculo)
curriculo = json.loads(resultado_curriculo)

dados_vaga = data_vagas[2]
resultado_vaga = ""
try:
    resultado_vaga = avaliar_candidatura(
        curriculo, dados_vaga, schema_vaga, prompt_base_vaga
    )
except Exception as e:
    print(f"Erro ao avaliar vaga: {e}")

print(resultado_vaga)

dados_vaga = data_vagas[2]
perguntas_entrevista = ""
try:
    perguntas_entrevista = gerar_perguntas_entrevista(
        curriculo, dados_vaga, schema_perguntas, prompt_base_perguntas
    )
except Exception as e:
    print(f"Erro ao gerar perguntas de entrevista: {e}")

print(perguntas_entrevista)