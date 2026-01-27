import os
from dotenv import load_dotenv
from google import genai

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

'''Modelos = gemini-2.5-flash, gemini-2.0-flash-lite'''

def chamar_gemini(prompt: str, model: str = "gemini-2.5-flash") -> str:
    response = client.models.generate_content(
        model=model,
        contents=prompt
    )
    return response.text