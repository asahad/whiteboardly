from pydantic import BaseModel
from typing import List, Literal, Optional

class Instruction(BaseModel):
    type: Literal["draw", "explain", "animate", "pause"]
    entity: Optional[str] = None
    text: Optional[str] = None
    metadata: Optional[dict] = None

class Lesson(BaseModel):
    topic: str
    steps: List[Instruction]
