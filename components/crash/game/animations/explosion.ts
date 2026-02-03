import type { Particle } from "@/types/crash.types";

export function createExplosionManager() {
  const particles: Particle[] = [];

  const createExplosion = (x: number, y: number) => {
    for (let i = 0; i < 50; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 8 + 2;
      particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 60,
        color: [
          "rgb(255, 100, 0)",
          "rgb(255, 200, 0)",
          "rgb(255, 50, 0)",
          "rgb(200, 0, 0)",
        ][Math.floor(Math.random() * 4)],
      });
    }
  };

  const drawExplosion = (ctx: CanvasRenderingContext2D) => {
    particles.forEach((particle, index) => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.vy += 0.2; // Gravity
      particle.life--;

      if (particle.life <= 0) {
        particles.splice(index, 1);
        return;
      }

      const alpha = particle.life / 60;
      ctx.fillStyle = particle.color
        .replace(")", `, ${alpha})`)
        .replace("rgb", "rgba");
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, 3, 0, Math.PI * 2);
      ctx.fill();
    });
  };

  const clearExplosion = () => {
    particles.length = 0;
  };

  return { createExplosion, drawExplosion, clearExplosion };
}
