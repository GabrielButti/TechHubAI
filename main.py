# Importação das bibliotecas

import json
from models.modelo_vagas.core.generator import avaliar_candidatura 
from models.modelo_curriculo.core.generator import gerar_curriculo
from models.modelo_entrevista.core.generator import gerar_perguntas_entrevista
from dados.curriculos import data_curriculos
from dados.vagas import data_vagas
from render.pdf_renderer import renderizar_pdf

# Abertura e leitura dos arquivos de schema json

with open("models/modelo_curriculo/schemas/curriculo_v1.json", encoding="utf-8") as f:
    schema_curriculo = json.load(f)
with open("models/modelo_vagas/schemas/avaliacao_vaga_v1.json", encoding="utf-8") as f:
    schema_vaga = json.load(f)
with open("models/modelo_entrevista/schemas/perguntas_vagas_v1.json", encoding="utf-8") as f:
    schema_perguntas = json.load(f)

# Abertura e leitura dos arquivos de prompt

with open("models/modelo_curriculo/prompts/gerar_curriculo_v2en.txt", encoding="utf-8") as f:
    prompt_base_curriculo = f.read()
with open("models/modelo_vagas/prompts/avaliar_vaga_v1en.txt", encoding="utf-8") as f:
    prompt_base_vaga = f.read()
with open("models/modelo_entrevista/prompts/gerar_perguntas_vaga_v1.txt", encoding="utf-8") as f:
    prompt_base_perguntas = f.read()


dados_candidato = data_curriculos[0]
dados_vaga = data_vagas[0]

# Gerar currículo a partir dos dados do candidato

resultado_curriculo = ""

try:    
    resultado_curriculo = gerar_curriculo(dados_candidato, schema_curriculo, prompt_base_curriculo)

except Exception as e:
    print(f"Erro ao gerar currículo: {e}")

# Normalizar resposta em dict (se for string, tentar decodificar JSON)

curriculo = None

if isinstance(resultado_curriculo, dict):
    curriculo = resultado_curriculo

elif isinstance(resultado_curriculo, str) and resultado_curriculo.strip():
    try:
        curriculo = json.loads(resultado_curriculo)
    except json.JSONDecodeError as e:
        print(f"Erro ao decodificar JSON do currículo: {e}")
        print("Resposta bruta (início):", resultado_curriculo[:400])
else:
    raise ValueError("Resposta do gerador de currículo é inválida ou vazia.")

if curriculo:
    # Renderizar PDF do currículo
    try:
        renderizar_pdf(curriculo=curriculo)

    except Exception as e:
        print(f"Erro ao renderizar PDF: {e}")

    # Analisar vagas
    resultado_vaga = None

    try:
        resultado_vaga = avaliar_candidatura(curriculo, dados_vaga, schema_vaga, prompt_base_vaga)
        print(resultado_vaga)
    except Exception as e:
        print(f"Erro ao avaliar vaga: {e}")

    # Gerar perguntas de entrevista
    perguntas_entrevista = None

    try:
        perguntas_entrevista = gerar_perguntas_entrevista(curriculo, dados_vaga, schema_perguntas, prompt_base_perguntas)
        print(perguntas_entrevista)
    except Exception as e:
        print(f"Erro ao gerar perguntas para vaga: {e}")

else:
    print("Não foi possível gerar o currículo. Encerrando fluxo.")