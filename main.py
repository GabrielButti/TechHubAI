import json
from core.generator import gerar_curriculo
from render.pdf_renderer import renderizar_pdf

with open("schemas/curriculo_v1.json", encoding="utf-8") as f:
    schema = json.load(f)

with open("prompts/gerar_curriculo_v2.txt", encoding="utf-8") as f:
    prompt_base = f.read()

dados_candidato = {
    "nome": "Bruno Ribeiro",
    "area": ["Análise de Dados", "Ciência de Dados", "BI", "Automação"],
    "skills": ["Python", "R", "SQL", "Power BI", "AWS", "ETL", "Scrum", "Azure", "IA", "Machine Learning", "Git"],
    "experiencia": ["Estágio em dados com automação de processos", "Projeto acadêmico de análise de dados", "Freelancer em BI"],
    "formacao": "Análise e Desenvolvimento de Sistemas"
}

resultado = gerar_curriculo(schema, dados_candidato, prompt_base)

print(resultado)

curriculo = json.loads(resultado)

renderizar_pdf(
    curriculo=curriculo,)
# renderizar_html(
#     curriculo=curriculo,
#     output_path="curriculo.html"
# )