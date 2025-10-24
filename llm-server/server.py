from fastapi import FastAPI, Request
from transformers import pipeline
from fastapi.middleware.cors import CORSMiddleware

# Initialize FastAPI app
app = FastAPI()

# Allow access from your Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load all 3 models
models = {
    "mistral": pipeline("text-generation", model="mistralai/Mistral-7B-Instruct-v0.3", device_map="auto"),
    "gemma": pipeline("text-generation", model="google/gemma-7b", device_map="auto"),
    "phi3": pipeline("text-generation", model="microsoft/phi-3-mini-128k-instruct", device_map="auto")
}

@app.post("/generate")
async def generate(request: Request):
    data = await request.json()
    text = data.get("text")
    model_key = data.get("model", "mistral")

    if model_key not in models:
        return {"error": "Unsupported model key"}

    generator = models[model_key]
    output = generator(text, max_new_tokens=200)
    return {"reply": output[0]["generated_text"].replace(text, "").strip()}
