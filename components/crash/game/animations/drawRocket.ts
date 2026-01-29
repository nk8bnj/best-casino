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

  // Color palette
  const bodyBlue = "#5B8EC9";
  const bodyHighlight = "#7BA8D9";
  const bodyDark = "#4A7AB8";
  const noseConeColor = "#F5B041";
  const noseConeHighlight = "#F8C471";
  const bottomFinColor = "#F5B041";
  const windowFrame = "#9CA3AF";
  const windowInterior = "#374151";
  const windowDark = "#1F2937";

  // Flame flicker animation
  const flicker = Math.sin(time * 0.5) * 4;
  const flicker2 = Math.sin(time * 0.7 + 1) * 3;
  const flicker3 = Math.cos(time * 0.6) * 2;

  // Wavy flame trail - outer orange flame
  ctx.fillStyle = "#FF6B35";
  ctx.beginPath();
  ctx.moveTo(-18, 0);
  // Top edge of flame with waves
  ctx.bezierCurveTo(
    -30 - flicker,
    -8 - flicker2,
    -45 - flicker,
    -5 + flicker3,
    -65 - flicker,
    -2
  );
  // Flame tip
  ctx.quadraticCurveTo(-75 - flicker * 1.2, 0, -65 - flicker, 2);
  // Bottom edge of flame with waves
  ctx.bezierCurveTo(
    -45 - flicker,
    5 - flicker3,
    -30 - flicker,
    8 + flicker2,
    -18,
    0
  );
  ctx.fill();

  // Middle yellow flame
  const midFlameGradient = ctx.createLinearGradient(-18, 0, -55 - flicker, 0);
  midFlameGradient.addColorStop(0, "#FFD93D");
  midFlameGradient.addColorStop(0.7, "#FFA500");
  midFlameGradient.addColorStop(1, "#FF6B35");
  ctx.fillStyle = midFlameGradient;
  ctx.beginPath();
  ctx.moveTo(-16, 0);
  ctx.bezierCurveTo(
    -25 - flicker * 0.8,
    -5 - flicker2 * 0.7,
    -38 - flicker * 0.8,
    -3 + flicker3 * 0.5,
    -52 - flicker * 0.8,
    0
  );
  ctx.bezierCurveTo(
    -38 - flicker * 0.8,
    3 - flicker3 * 0.5,
    -25 - flicker * 0.8,
    5 + flicker2 * 0.7,
    -16,
    0
  );
  ctx.fill();

  // Inner bright yellow flame
  const innerFlameGradient = ctx.createLinearGradient(-16, 0, -35, 0);
  innerFlameGradient.addColorStop(0, "#FFFACD");
  innerFlameGradient.addColorStop(0.5, "#FFD93D");
  innerFlameGradient.addColorStop(1, "transparent");
  ctx.fillStyle = innerFlameGradient;
  ctx.beginPath();
  ctx.moveTo(-14, 0);
  ctx.quadraticCurveTo(-22 - flicker * 0.4, -3, -32 - flicker * 0.5, 0);
  ctx.quadraticCurveTo(-22 - flicker * 0.4, 3, -14, 0);
  ctx.fill();

  // Bottom fins (yellow, near flame base) - scaled up by 30%
  ctx.fillStyle = bottomFinColor;
  // Top-side fin (scaled ~1.3x around its centroid)
  ctx.beginPath();
  ctx.moveTo(-14.45, -5.95);
  ctx.lineTo(-24.85, -17.65);
  ctx.lineTo(-6.65, -12.45);
  ctx.lineTo(-4.05, -5.95);
  ctx.closePath();
  ctx.fill();

  // Bottom-side fin (scaled ~1.3x around its centroid)
  ctx.beginPath();
  ctx.moveTo(-14.45, 5.95);
  ctx.lineTo(-24.85, 17.65);
  ctx.lineTo(-6.65, 12.45);
  ctx.lineTo(-4.05, 5.95);
  ctx.closePath();
  ctx.fill();

  // Rocket body - elongated torpedo shape
  ctx.beginPath();
  ctx.moveTo(-18, 0);
  // Bottom curve of body
  ctx.bezierCurveTo(-18, 10, -10, 14, 15, 12);
  // Right side curve to nose
  ctx.bezierCurveTo(28, 10, 35, 5, 38, 0);
  // Top curve back
  ctx.bezierCurveTo(35, -5, 28, -10, 15, -12);
  // Back to start
  ctx.bezierCurveTo(-10, -14, -18, -10, -18, 0);
  ctx.closePath();

  // Body gradient
  const bodyGradient = ctx.createLinearGradient(0, -14, 0, 14);
  bodyGradient.addColorStop(0, bodyHighlight);
  bodyGradient.addColorStop(0.3, bodyBlue);
  bodyGradient.addColorStop(0.7, bodyBlue);
  bodyGradient.addColorStop(1, bodyDark);
  ctx.fillStyle = bodyGradient;
  ctx.fill();

  // Nose cone (prominent golden yellow)
  const noseGradient = ctx.createLinearGradient(30, -8, 30, 8);
  noseGradient.addColorStop(0, noseConeHighlight);
  noseGradient.addColorStop(0.5, noseConeColor);
  noseGradient.addColorStop(1, "#D4940A");
  ctx.fillStyle = noseGradient;
  ctx.beginPath();
  ctx.moveTo(35, -6);
  ctx.bezierCurveTo(40, -5, 48, -2, 50, 0);
  ctx.bezierCurveTo(48, 2, 40, 5, 35, 6);
  ctx.bezierCurveTo(30, 8, 30, -8, 35, -6);
  ctx.closePath();
  ctx.fill();

  // Window (larger porthole with dark interior)
  // Window base (dark interior)
  ctx.fillStyle = windowInterior;
  ctx.beginPath();
  ctx.arc(8, 0, 9, 0, Math.PI * 2);
  ctx.fill();

  // Window stripes (horizontal lines for depth)
  ctx.strokeStyle = windowDark;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(1, -3);
  ctx.lineTo(15, -3);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(2, 0);
  ctx.lineTo(14, 0);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(1, 3);
  ctx.lineTo(15, 3);
  ctx.stroke();

  // Window highlight (reflection)
  ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
  ctx.beginPath();
  ctx.ellipse(5, -3, 3, 2, -0.3, 0, Math.PI * 2);
  ctx.fill();

  // Window frame (grey border)
  ctx.strokeStyle = windowFrame;
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.arc(8, 0, 9, 0, Math.PI * 2);
  ctx.stroke();

  // Outer frame highlight
  ctx.strokeStyle = "#BDC3C7";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(8, 0, 10.5, -Math.PI * 0.7, -Math.PI * 0.3);
  ctx.stroke();

  ctx.restore();
}
