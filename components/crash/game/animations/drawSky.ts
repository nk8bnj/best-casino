export function drawSky(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  bgHue: number
): number {
  const newBgHue = bgHue + Math.sin(time * 0.001) * 0.1;

  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, `hsl(${newBgHue - 20}, 80%, 5%)`);
  gradient.addColorStop(0.3, `hsl(${newBgHue}, 70%, 12%)`);
  gradient.addColorStop(0.6, `hsl(${newBgHue + 20}, 60%, 18%)`);
  gradient.addColorStop(1, `hsl(${newBgHue + 40}, 50%, 15%)`);

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Nebula effects
  const nebulaX = width * 0.3 + Math.sin(time * 0.0005) * width * 0.2;
  const nebulaY = height * 0.4 + Math.cos(time * 0.0007) * height * 0.1;

  const nebulae: [number, number, number, string][] = [
    [nebulaX, nebulaY, height * 0.6, `hsla(${newBgHue + 30}, 70%, 30%, 0.15)`],
    [
      width - nebulaX + 100,
      nebulaY + 100,
      height * 0.5,
      `hsla(${newBgHue - 20}, 60%, 25%, 0.12)`,
    ],
    [
      nebulaX * 0.5,
      height - nebulaY * 0.5,
      height * 0.4,
      `hsla(${newBgHue + 50}, 65%, 28%, 0.1)`,
    ],
  ];

  nebulae.forEach(([x, y, r, color]) => {
    const nebulaGradient = ctx.createRadialGradient(x, y, 0, x, y, r);
    nebulaGradient.addColorStop(0, color);
    nebulaGradient.addColorStop(0.5, color.replace(/[\d.]+\)/, "0.05)"));
    nebulaGradient.addColorStop(1, "transparent");
    ctx.fillStyle = nebulaGradient;
    ctx.fillRect(0, 0, width, height);
  });

  return newBgHue;
}
