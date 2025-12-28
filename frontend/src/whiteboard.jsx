import { useEffect, useRef } from "react";
import { demoInstructions } from "./instructions";

/* =========================================================
   Canvas Setup & Styling
========================================================= */

const CANVAS_STYLE = {
  background: "#ffffff",
  border: "1px solid #e5e7eb",
};

function setupCanvas(canvas) {
  const ctx = canvas.getContext("2d");
  const scale = window.devicePixelRatio || 1;

  canvas.width = canvas.offsetWidth * scale;
  canvas.height = canvas.offsetHeight * scale;
  ctx.scale(scale, scale);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "#111827";
  ctx.fillStyle = "#111827";
  ctx.lineWidth = 2;
  ctx.font = "16px system-ui";

  return ctx;
}

/* =========================================================
   Drawing Primitives
========================================================= */

function drawRoundedRect(ctx, x, y, w, h, r = 8) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
  ctx.stroke();
}

function drawToken(ctx, x, y, label) {
  drawRoundedRect(ctx, x, y, 120, 56);
  ctx.fillText(label, x + 24, y + 36);
}

function drawMatrix(ctx, x, y, label) {
  drawRoundedRect(ctx, x, y, 72, 72);
  ctx.fillText(label, x + 28, y + 44);
}

function drawExplanation(ctx, text) {
  ctx.fillStyle = "#374151";
  ctx.font = "18px system-ui";
  ctx.fillText(text, 80, 420);

  // Reset style
  ctx.fillStyle = "#111827";
  ctx.font = "16px system-ui";
}

/* =========================================================
   Instruction Renderer
========================================================= */

const instructionRenderers = {
  draw_token: (ctx, i) => drawToken(ctx, i.x, i.y, i.label),
  draw_matrix: (ctx, i) => drawMatrix(ctx, i.x, i.y, i.label),
  explain: (ctx, i) => drawExplanation(ctx, i.text),
};

function renderInstruction(ctx, instruction) {
  const renderer = instructionRenderers[instruction.type];
  if (renderer) renderer(ctx, instruction);
}

/* =========================================================
   Whiteboard Component
========================================================= */

export default function Whiteboard() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = setupCanvas(canvas);

    let stepIndex = 0;

    function playNextStep() {
      if (stepIndex >= demoInstructions.length) return;

      renderInstruction(ctx, demoInstructions[stepIndex]);
      stepIndex++;

      setTimeout(playNextStep, 850);
    }

    playNextStep();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: "100%",
        height: "100%",
        ...CANVAS_STYLE,
      }}
    />
  );
}
