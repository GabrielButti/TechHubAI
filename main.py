import json

from core.generator import avaliar_candidatura, gerar_curriculo
from dados.curriculos import data_curriculos
from dados.vagas import data_vagas
from render.pdf_renderer import renderizar_pdf

with open("schemas/curriculo_v1.json", encoding="utf-8") as f:
    schema_curriculo = json.load(f)

with open("schemas/avaliacao_vaga_v1.json", encoding="utf-8") as f:
    schema_vaga = json.load(f)

with open("prompts/gerar_curriculo_v2en.txt", encoding="utf-8") as f:
    prompt_base_curriculo = f.read()

with open("prompts/avaliar_vaga_v1en.txt", encoding="utf-8") as f:
    prompt_base_vaga = f.read()

dados_candidato = data_curriculos[0]
resultado_curriculo = ""
curriculo = None
try:
    resultado_curriculo = gerar_curriculo(
        schema_curriculo, dados_candidato, prompt_base_curriculo
    )
except Exception as e:
    print(f"Erro ao gerar currículo: {e}")


print(resultado_curriculo)
curriculo = json.loads(resultado_curriculo)

dados_vaga = data_vagas[0]
resultado_vaga = ""
try:
    resultado_vaga = avaliar_candidatura(
        curriculo, dados_vaga, schema_vaga, prompt_base_vaga
    )
except Exception as e:
    print(f"Erro ao avaliar vaga: {e}")

print(resultado_vaga)

renderizar_pdf(curriculo=curriculo)

# renderizar_html(
#     curriculo=curriculo,
#     output_path="curriculo.html"
# )
