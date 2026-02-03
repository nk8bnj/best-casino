export const drawAxes = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  currentMultiplier: number,
  elapsedTime: number
) => {
  ctx.save();

  // Layout tweaks to better match the reference design
  const leftWidth = 100;
  const bottomHeight = 70;
  const bgColor = "rgba(10, 12, 20, 0.14)";
  const tickColor = "rgba(255, 255, 255, 0.25)";
  const indicatorColor = "#F9B233"; // warmer indicator color to match gold accent

  // Left axis background
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, leftWidth, height);

  // Separator line
  ctx.beginPath();
  ctx.moveTo(leftWidth, 0);
  ctx.lineTo(leftWidth, height);
  ctx.strokeStyle = "rgba(255, 255, 255, 0.06)";
  ctx.lineWidth = 1;
  ctx.stroke();

  // Y-axis (multiplier) - show denser marks with softer fade
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

  // Use 0.2 increments to match the pictured multipliers (2.4, 2.2, 2.0, ...)
  const stepM = 0.2;

  ctx.textAlign = "right";
  ctx.textBaseline = "middle";
  ctx.font = "600 15px Satoshi, Arial";

  const startM = Math.floor(minVisibleM / stepM) * stepM;

  for (let m = startM; m <= maxVisibleM; m += stepM) {
    if (m < 1.0) continue;

    const y = centerY - (m - currentMultiplier) * pixelsPerX;

    // longer faint tick for better visual alignment with grid
    ctx.beginPath();
    ctx.moveTo(leftWidth, y);
    ctx.lineTo(leftWidth - 14, y);
    ctx.strokeStyle = tickColor;
    ctx.lineWidth = 1;
    ctx.stroke();

    // fade labels by distance from center
    const dist = Math.abs(y - centerY);
    const alpha = Math.max(0.28, 1 - dist / (height / 2));

    ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
    ctx.fillText(`${m.toFixed(1)}x`, leftWidth - 18, y);
  }

  // Current multiplier indicator (triangle) — smaller and gold
  ctx.beginPath();
  ctx.moveTo(leftWidth, centerY);
  ctx.lineTo(leftWidth - 12, centerY - 7);
  ctx.lineTo(leftWidth - 12, centerY + 7);
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
  ctx.strokeStyle = "rgba(255, 255, 255, 0.06)";
  ctx.lineWidth = 1;
  ctx.stroke();

  // X-axis (time) - use custom major ticks to match the pictured markers
  ctx.save();
  ctx.beginPath();
  ctx.rect(0, height - bottomHeight, width, bottomHeight);
  ctx.clip();

  const pixelsPerS = 110;
  const centerX = width / 2;

  const deltaSLeft = centerX / pixelsPerS;
  const deltaSRight = (width - centerX) / pixelsPerS;

  const minVisibleS = Math.max(0, elapsedTime - deltaSLeft - 1);
  const maxVisibleS = elapsedTime + deltaSRight + 1;

  // Major ticks that match the example screenshot
  const majorTicks = [1, 3, 6, 9, 12, 15, 18, 20, 23];

  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.font = "600 13px Satoshi, Arial";

  for (const s of majorTicks) {
    if (s < minVisibleS || s > maxVisibleS) continue;

    const x = centerX + (s - elapsedTime) * pixelsPerS;

    // short upward tick into the chart area
    ctx.beginPath();
    ctx.moveTo(x, height - bottomHeight);
    ctx.lineTo(x, height - bottomHeight - 8);
    ctx.strokeStyle = "rgba(255,255,255,0.18)";
    ctx.lineWidth = 1;
    ctx.stroke();

    // fade by distance from center for visual depth
    const dist = Math.abs(x - centerX);
    const alpha = Math.max(0.26, 1 - dist / (width / 2));

    ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
    ctx.fillText(`${s} sec`, x, height - bottomHeight + 12);
  }

  // Current time indicator (triangle) — gold accent
  ctx.beginPath();
  ctx.moveTo(centerX, height - bottomHeight);
  ctx.lineTo(centerX - 7, height - bottomHeight + 12);
  ctx.lineTo(centerX + 7, height - bottomHeight + 12);
  ctx.closePath();
  ctx.fillStyle = indicatorColor;
  ctx.fill();

  ctx.restore();

  // Corner fill (bottom-left) to continue the left axis background into the time area
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, height - bottomHeight, leftWidth, bottomHeight);
  ctx.strokeStyle = "rgba(255, 255, 255, 0.06)";
  ctx.strokeRect(0, height - bottomHeight, leftWidth, bottomHeight);

  ctx.restore();
};
