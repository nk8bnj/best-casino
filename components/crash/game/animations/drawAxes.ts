export const drawAxes = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  currentMultiplier: number,
  elapsedTime: number
) => {
  ctx.save();

  const leftWidth = 80;
  const bottomHeight = 60;
  const bgColor = "rgba(20, 20, 30, 0.1)";
  const tickColor = "rgba(255, 255, 255, 0.3)";
  const indicatorColor = "#F12C4C";

  // Left axis background
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, leftWidth, height);

  ctx.beginPath();
  ctx.moveTo(leftWidth, 0);
  ctx.lineTo(leftWidth, height);
  ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
  ctx.stroke();

  // Y-axis (multiplier)
  ctx.save();
  ctx.beginPath();
  ctx.rect(0, 0, leftWidth, height);
  ctx.clip();

  const pixelsPerX = 150;
  const centerY = height / 2;

  const deltaMTop = centerY / pixelsPerX;
  const deltaMBottom = (height - centerY) / pixelsPerX;

  const minVisibleM = Math.max(1.0, currentMultiplier - deltaMBottom - 1);
  const maxVisibleM = currentMultiplier + deltaMTop + 1;

  const stepM = 0.5;

  ctx.textAlign = "right";
  ctx.textBaseline = "middle";
  ctx.font = "bold 14px Arial";

  const startM = Math.floor(minVisibleM / stepM) * stepM;

  for (let m = startM; m <= maxVisibleM; m += stepM) {
    if (m < 1.0) continue;

    const y = centerY - (m - currentMultiplier) * pixelsPerX;

    ctx.beginPath();
    ctx.moveTo(leftWidth, y);
    ctx.lineTo(leftWidth - 10, y);
    ctx.strokeStyle = tickColor;
    ctx.lineWidth = 1;
    ctx.stroke();

    const dist = Math.abs(y - centerY);
    const alpha = Math.max(0.3, 1 - dist / (height / 2));

    ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
    ctx.fillText(`${m.toFixed(1)}x`, leftWidth - 15, y);
  }

  // Current multiplier indicator
  ctx.beginPath();
  ctx.moveTo(leftWidth, centerY);
  ctx.lineTo(leftWidth - 10, centerY - 6);
  ctx.lineTo(leftWidth - 10, centerY + 6);
  ctx.closePath();
  ctx.fillStyle = indicatorColor;
  ctx.fill();

  ctx.restore();

  // Bottom axis background (time)
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, height - bottomHeight, width, bottomHeight);

  ctx.beginPath();
  ctx.moveTo(0, height - bottomHeight);
  ctx.lineTo(width, height - bottomHeight);
  ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
  ctx.stroke();

  // X-axis (time)
  ctx.save();
  ctx.beginPath();
  ctx.rect(0, height - bottomHeight, width, bottomHeight);
  ctx.clip();

  const pixelsPerS = 100;
  const centerX = width / 2;

  const deltaSLeft = centerX / pixelsPerS;
  const deltaSRight = (width - centerX) / pixelsPerS;

  const minVisibleS = Math.max(0, elapsedTime - deltaSLeft - 1);
  const maxVisibleS = elapsedTime + deltaSRight + 1;

  const stepS = 1;

  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.font = "bold 14px Arial";

  const startS = Math.floor(minVisibleS);

  for (let s = startS; s <= maxVisibleS; s += stepS) {
    if (s < 0) continue;

    const x = centerX + (s - elapsedTime) * pixelsPerS;

    ctx.beginPath();
    ctx.moveTo(x, height - bottomHeight);
    ctx.lineTo(x, height - bottomHeight + 10);
    ctx.strokeStyle = tickColor;
    ctx.lineWidth = 1;
    ctx.stroke();

    const dist = Math.abs(x - centerX);
    const alpha = Math.max(0.3, 1 - dist / (width / 2));

    ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
    ctx.fillText(`${s}s`, x, height - bottomHeight + 15);
  }

  // Current time indicator
  ctx.beginPath();
  ctx.moveTo(centerX, height - bottomHeight);
  ctx.lineTo(centerX - 6, height - bottomHeight + 10);
  ctx.lineTo(centerX + 6, height - bottomHeight + 10);
  ctx.closePath();
  ctx.fillStyle = indicatorColor;
  ctx.fill();

  ctx.restore();

  // Corner fill
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, height - bottomHeight, leftWidth, bottomHeight);
  ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
  ctx.strokeRect(0, height - bottomHeight, leftWidth, bottomHeight);

  ctx.restore();
};
