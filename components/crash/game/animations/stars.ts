export function createStarsManager(
  initialWidth: number,
  initialHeight: number
) {
  const baseStars: Array<{
    x: number;
    y: number;
    size: number;
    phase: number;
    speed: number;
    color: string;
  }> = [];
  const baseSparkles: Array<{
    x: number;
    y: number;
    size: number;
    phase: number;
    speed: number;
    color: string;
  }> = [];

  let scrollX = 0;
  let scrollY = 0;
  let width = initialWidth;
  let height = initialHeight;

  const initStars = (w?: number, h?: number) => {
    if (w !== undefined) width = w;
    if (h !== undefined) height = h;

    baseStars.length = 0;
    baseSparkles.length = 0;

    for (let i = 0; i < 150; i++) {
      baseStars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.5 + 0.5,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.02 + 0.01,
        color: Math.random() > 0.7 ? "#5ff" : "#fff",
      });
    }

    for (let i = 0; i < 25; i++) {
      baseSparkles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 8 + 3,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.03 + 0.02,
        color: Math.random() > 0.5 ? "#ffd700" : "#fff",
      });
    }
  };

  const drawStar4 = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number,
    color: string,
    rot: number = 0
  ) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot);
    ctx.fillStyle = color;
    ctx.beginPath();

    for (let i = 0; i < 4; i++) {
      const angle = (i * Math.PI) / 2;
      ctx.moveTo(0, 0);
      ctx.lineTo(
        Math.cos(angle - 0.15) * size * 0.3,
        Math.sin(angle - 0.15) * size * 0.3
      );
      ctx.lineTo(Math.cos(angle) * size, Math.sin(angle) * size);
      ctx.lineTo(
        Math.cos(angle + 0.15) * size * 0.3,
        Math.sin(angle + 0.15) * size * 0.3
      );
    }

    ctx.fill();
    ctx.restore();
  };

  const drawStars = (
    ctx: CanvasRenderingContext2D,
    time: number,
    canvasWidth: number,
    canvasHeight: number,
    isRunning: boolean
  ) => {
    const speedX = isRunning ? 4 : 0.5;
    const speedY = isRunning ? 2 : 0.25;

    scrollX += speedX;
    scrollY += speedY;

    const normalizedScrollX = scrollX % canvasWidth;
    const normalizedScrollY = scrollY % canvasHeight;

    for (let gridX = -1; gridX <= 1; gridX++) {
      for (let gridY = -1; gridY <= 1; gridY++) {
        baseStars.forEach((star) => {
          const x = star.x + gridX * canvasWidth - normalizedScrollX;
          const y = star.y + gridY * canvasHeight + normalizedScrollY;

          if (
            x >= -20 &&
            x <= canvasWidth + 20 &&
            y >= -20 &&
            y <= canvasHeight + 20
          ) {
            const pulse = 0.5 + Math.sin(time * star.speed + star.phase) * 0.5;

            ctx.globalAlpha = pulse * 0.8;
            ctx.fillStyle = star.color;
            ctx.beginPath();
            ctx.arc(x, y, star.size * pulse, 0, Math.PI * 2);
            ctx.fill();
          }
        });

        baseSparkles.forEach((sparkle) => {
          const x = sparkle.x + gridX * canvasWidth - normalizedScrollX * 1.5;
          const y = sparkle.y + gridY * canvasHeight + normalizedScrollY * 1.5;

          if (
            x >= -20 &&
            x <= canvasWidth + 20 &&
            y >= -20 &&
            y <= canvasHeight + 20
          ) {
            const pulse =
              0.6 + Math.sin(time * sparkle.speed + sparkle.phase) * 0.4;
            drawStar4(
              ctx,
              x,
              y,
              sparkle.size * pulse,
              sparkle.color,
              time * 0.02 + sparkle.phase
            );
          }
        });
      }
    }

    ctx.globalAlpha = 1;
  };

  return { initStars, drawStars };
}
