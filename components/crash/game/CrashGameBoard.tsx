"use client";

import { useCrashGameCanvas } from "./useCrashGameCanvas";

export const CrashGameBoard = () => {
  const canvasRef = useCrashGameCanvas();

  return (
    <div className="relative w-full h-full">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};
