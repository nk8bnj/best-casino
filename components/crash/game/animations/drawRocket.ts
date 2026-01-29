export function drawRocket(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  angle: number,
  time: number,
  scale: number
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.scale(scale, scale);

  // Flame effect
  const flicker = Math.sin(time * 0.5) * 5;
  const flameGradient = ctx.createLinearGradient(0, 0, -55 - flicker, 0);
  flameGradient.addColorStop(0, "#ffd700");
  flameGradient.addColorStop(0.4, "#ff8c00");
  flameGradient.addColorStop(1, "transparent");
  ctx.fillStyle = flameGradient;
  ctx.beginPath();
  ctx.moveTo(-12, 0);
  ctx.quadraticCurveTo(-35 - flicker, -7, -55 - flicker, 0);
  ctx.quadraticCurveTo(-35 - flicker, 7, -12, 0);
  ctx.fill();

  // Inner flame
  const innerFlameGradient = ctx.createLinearGradient(0, 0, -30, 0);
  innerFlameGradient.addColorStop(0, "#fff7c0");
  innerFlameGradient.addColorStop(1, "transparent");
  ctx.fillStyle = innerFlameGradient;
  ctx.beginPath();
  ctx.moveTo(-12, 0);
  ctx.quadraticCurveTo(-22, -3, -30 - flicker * 0.5, 0);
  ctx.quadraticCurveTo(-22, 3, -12, 0);
  ctx.fill();

  // Fins
  ctx.fillStyle = "#63b3ed";
  ctx.beginPath();
  ctx.moveTo(-12, -6);
  ctx.lineTo(-20, -18);
  ctx.lineTo(-4, -6);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(-12, 6);
  ctx.lineTo(-20, 18);
  ctx.lineTo(-4, 6);
  ctx.fill();

  // Body
  const bodyGradient = ctx.createLinearGradient(0, -12, 0, 12);
  bodyGradient.addColorStop(0, "#90cdf4");
  bodyGradient.addColorStop(0.5, "#4299e1");
  bodyGradient.addColorStop(1, "#2b6cb0");
  ctx.fillStyle = bodyGradient;
  ctx.beginPath();
  ctx.ellipse(0, 0, 25, 11, 0, 0, Math.PI * 2);
  ctx.fill();

  // Nose cone
  ctx.fillStyle = "#f6ad55";
  ctx.beginPath();
  ctx.moveTo(25, 0);
  ctx.quadraticCurveTo(38, -2, 42, 0);
  ctx.quadraticCurveTo(38, 2, 25, 0);
  ctx.fill();

  // Stripe
  ctx.fillStyle = "#fbd38d";
  ctx.fillRect(-15, -12, 5, 24);

  // Window
  const windowGradient = ctx.createRadialGradient(6, -1, 0, 6, 0, 8);
  windowGradient.addColorStop(0, "#e2e8f0");
  windowGradient.addColorStop(0.5, "#718096");
  windowGradient.addColorStop(1, "#2d3748");
  ctx.fillStyle = windowGradient;
  ctx.beginPath();
  ctx.arc(6, 0, 7, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#a0aec0";
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.restore();
}
