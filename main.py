import json
from core.generator import gerar_curriculo
from core.generator import avaliar_candidatura
from render.pdf_renderer import renderizar_pdf

with open("schemas/curriculo_v1.json", encoding="utf-8") as f:
    schema_curriculo = json.load(f)

with open("schemas/avaliacao_vaga_v1.json", encoding="utf-8") as f:
    schema_vaga = json.load(f)

with open("prompts/gerar_curriculo_v2.txt", encoding="utf-8") as f:
    prompt_base_curriculo = f.read()

with open("prompts/avaliar_vaga_v1.txt", encoding="utf-8") as f:
    prompt_base_vaga = f.read()

dados_candidato = {
    "nome": "Bruno Ribeiro",
    "area": ["Análise de Dados", "Ciência de Dados", "BI", "Automação"],
    "skills": ["Python", "R", "SQL", "Power BI", "AWS", "ETL", "Scrum", "Azure", "IA", "Machine Learning", "Git"],
    "experiencia": ["Estágio em dados com automação de processos", "Projeto acadêmico de análise de dados", "Freelancer em BI"],
    "formacao": "Análise e Desenvolvimento de Sistemas"
}

resultado_curriculo = gerar_curriculo(schema_curriculo, dados_candidato, prompt_base_curriculo)

print(resultado_curriculo)

curriculo = json.loads(resultado_curriculo)

dados_vaga = "Estamos buscando um Analista de Dados Júnior com experiência em: - SQL avançado;- Python para análise de dados; - Power BI; - Conhecimento em ETL; - Diferencial: AWS e automações; Atuação em time ágil, com foco em BI e tomada de decisão."

resultado_vaga = avaliar_candidatura(curriculo, dados_vaga, schema_vaga, prompt_base_vaga)

print(resultado_vaga)

renderizar_pdf(
    curriculo=curriculo)

# renderizar_html(
#     curriculo=curriculo,
#     output_path="curriculo.html"
# )