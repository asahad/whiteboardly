from .schemas import Lesson, Instruction

def generate_attention_lesson() -> Lesson:
    return Lesson(
        topic="transformer_attention",
        steps=[
            Instruction(type="draw", entity="token", metadata={"label": "Hello"}),
            Instruction(type="draw", entity="token", metadata={"label": "World"}),
            Instruction(type="draw", entity="matrix", metadata={"name": "Q K V"}),
            Instruction(type="explain", text="Each token is projected into Query, Key, and Value vectors."),
            Instruction(type="animate", entity="attention", metadata={"operation": "dot_product"}),
        ]
    )
