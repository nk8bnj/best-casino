export function drawSky(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  bgHue: number
): number {
  const newBgHue = bgHue + Math.sin(time * 0.001) * 0.1;
  // Draw photo background if available (public/assets/sky-bg.jpg)
  // We lazily load the image once and cache it for subsequent frames.
  // If not yet loaded, fall back to the original procedural gradient.
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore - add module-level cache via (globalThis as any)
  if (!(globalThis as any).__skyBgImage) {
    const img = new Image();
    img.src = "/assets/sky-bg.jpg";
    img.crossOrigin = "anonymous";
    img.onload = () => {
      (globalThis as any).__skyBgImageLoaded = true;
    };
    (globalThis as any).__skyBgImage = img;
    (globalThis as any).__skyBgImageLoaded = false;
  }

  // draw image if loaded
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const cachedImg: HTMLImageElement | undefined = (globalThis as any)
    .__skyBgImage;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const cachedLoaded: boolean = !!(globalThis as any).__skyBgImageLoaded;

  if (cachedImg && cachedLoaded && cachedImg.width && cachedImg.height) {
    const iw = cachedImg.width;
    const ih = cachedImg.height;
    const scale = Math.max(width / iw, height / ih);
    const dw = iw * scale;
    const dh = ih * scale;
    const dx = (width - dw) / 2;
    const dy = (height - dh) / 2;
    ctx.drawImage(cachedImg, dx, dy, dw, dh);
  } else {
    // Procedural gradient fallback while the image loads
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, "#050014"); // very dark top
    gradient.addColorStop(0.25, "#2b0b4a"); // deep purple
    gradient.addColorStop(0.5, "#3a176d"); // indigo
    gradient.addColorStop(0.75, "#6b2fb0"); // soft violet
    gradient.addColorStop(0.92, "rgba(64,200,195,0.08)"); // subtle teal glow
    gradient.addColorStop(1, "#0b0630"); // dark base

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // subtle radial highlight (upper-right) to emulate the sample's glow
    const glowX = width * 0.85;
    const glowY = height * 0.12;
    const glowR = Math.max(width, height) * 0.6;
    const glow = ctx.createRadialGradient(glowX, glowY, 0, glowX, glowY, glowR);
    glow.addColorStop(0, "rgba(80,220,210,0.14)");
    glow.addColorStop(0.25, "rgba(80,160,200,0.06)");
    glow.addColorStop(1, "transparent");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, width, height);
  }

  // Nebula effects
  const nebulaX = width * 0.3 + Math.sin(time * 0.0005) * width * 0.2;
  const nebulaY = height * 0.4 + Math.cos(time * 0.0007) * height * 0.1;

  // Nebula blobs with teal + magenta tones for richer color variation
  const nebulae: [number, number, number, string][] = [
    [nebulaX, nebulaY, height * 0.6, "rgba(140,80,200,0.16)"], // soft magenta
    [
      width - nebulaX + 100,
      nebulaY + 100,
      height * 0.5,
      "rgba(60,190,180,0.12)",
    ], // teal
    [
      nebulaX * 0.5,
      height - nebulaY * 0.5,
      height * 0.4,
      "rgba(120,70,180,0.10)",
    ], // purple
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
