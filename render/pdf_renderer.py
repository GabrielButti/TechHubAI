import json
from fpdf import FPDF

def renderizar_pdf(curriculo: dict):

    pdf = FPDF()
    pdf.add_page()
    pdf.set_auto_page_break(auto=True, margin=15)

    # ===== Nome =====
    pdf.set_font("Helvetica", "B", 18)
    pdf.cell(0, 10, str(curriculo.get("nome", "")), ln=True)

    # ===== Título profissional =====
    pdf.set_font("Helvetica", "", 12)
    pdf.cell(0, 8, str(curriculo.get("titulo_profissional", "")), ln=True)
    pdf.ln(4)

    def subtitulo(texto):
        pdf.ln(6)
        pdf.set_font("Helvetica", "B", 14)
        pdf.cell(0, 8, texto, ln=True)
        pdf.line(10, pdf.get_y(), 200, pdf.get_y())
        pdf.ln(4)

    # ===== Resumo Profissional =====
    subtitulo("Resumo Profissional")
    pdf.set_font("Helvetica", "", 11)
    pdf.multi_cell(0, 6, str(curriculo.get("resumo_profissional", "")))

    # ===== Habilidades Técnicas =====
    subtitulo("Habilidades Técnicas")
    pdf.set_font("Helvetica", "", 11)

    habilidades = curriculo.get("habilidades_tecnicas", [])
    if isinstance(habilidades, list):
        for skill in habilidades:
            pdf.cell(5)
            pdf.cell(0, 6, f"- {str(skill)}", ln=True)

    # ===== Experiência Profissional =====
    subtitulo("Experiência Profissional")

    experiencias = curriculo.get("experiencias", [])
    if isinstance(experiencias, list):
        for exp in experiencias:
            if isinstance(exp, dict):
                pdf.set_font("Helvetica", "B", 11)
                pdf.cell(0, 6, str(exp.get("cargo", "")), ln=True)

                pdf.set_font("Helvetica", "I", 10)
                pdf.cell(0, 6, str(exp.get("empresa", "")), ln=True)

                pdf.set_font("Helvetica", "", 11)
                pdf.multi_cell(0, 6, str(exp.get("descricao", "")))
                pdf.ln(2)

    # ===== Formação Acadêmica =====
    subtitulo("Formação Acadêmica")
    pdf.set_font("Helvetica", "", 11)

    formacao = curriculo.get("formacao", [])
    if isinstance(formacao, list):
        for form in formacao:
            if isinstance(form, dict):
                pdf.multi_cell(
                    0,
                    6,
                    f"{form.get('curso', '')} - {form.get('instituicao', '')} ({form.get('status', '')})"
                )

    # ===== Geração do PDF =====
    pdf.output("curriculo.pdf")

    return "curriculo.pdf"
