from jinja2 import Environment, FileSystemLoader
from pathlib import Path

def renderizar_html(curriculo: dict, output_path: str):
    env = Environment(
        loader=FileSystemLoader("templates"),
        autoescape=True
    )

    template = env.get_template("curriculo_base.html")
    html_renderizado = template.render(**curriculo)

    Path(output_path).write_text(html_renderizado, encoding="utf-8")
