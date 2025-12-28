from fastapi import FastAPI
from whiteboardly.orchestrator.planner import generate_attention_lesson

app = FastAPI()

@app.get("/lesson")
def get_lesson():
    return generate_attention_lesson()
