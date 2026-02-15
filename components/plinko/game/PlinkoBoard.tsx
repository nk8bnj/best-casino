"use client";

import React, { useRef, useEffect, useCallback, useMemo } from "react";
import { usePlinkoStore } from "@/store/plinko.store";
import { usePlinkoMultipliers } from "@/hooks/plinko";

// ── colour helpers ──────────────────────────────────────────────────

function getSlotColor(index: number, total: number): string {
  const center = (total - 1) / 2;
  const dist = Math.abs(index - center) / center;
  const stops = [
    { pos: 0, r: 34, g: 197, b: 94 },
    { pos: 0.3, r: 132, g: 204, b: 22 },
    { pos: 0.5, r: 251, g: 191, b: 36 },
    { pos: 0.7, r: 255, g: 140, b: 0 },
    { pos: 1, r: 255, g: 68, b: 68 },
  ];
  let lo = stops[0],
    hi = stops[stops.length - 1];
  for (let i = 0; i < stops.length - 1; i++) {
    if (dist >= stops[i].pos && dist <= stops[i + 1].pos) {
      lo = stops[i];
      hi = stops[i + 1];
      break;
    }
  }
  const t = (dist - lo.pos) / (hi.pos - lo.pos || 1);
  const r = Math.round(lo.r + (hi.r - lo.r) * t);
  const g = Math.round(lo.g + (hi.g - lo.g) * t);
  const b = Math.round(lo.b + (hi.b - lo.b) * t);
  return `rgb(${r},${g},${b})`;
}

// ── layout helpers (pure, called each frame) ────────────────────────

interface Layout {
  topPadding: number;
  bottomPadding: number;
  rowSpacing: number;
  boardWidth: number;
  startX: number;
  slotCount: number;
  slotY: number;
  slotWidth: number;
  slotHeight: number;
  pegRadius: number;
  ballRadius: number;
  width: number;
  height: number;
}

function computeLayout(w: number, h: number, lines: number): Layout {
  const topPadding = h * 0.08;
  const bottomPadding = h * 0.14;
  const boardHeight = h - topPadding - bottomPadding;
  const rowSpacing = boardHeight / lines;
  const boardWidth = w * 0.85;
  const startX = (w - boardWidth) / 2;
  const slotCount = lines + 1;
  const slotY = h - bottomPadding + 8;
  const slotWidth = boardWidth / slotCount;
  const slotHeight = bottomPadding - 16;
  const pegRadius = Math.max(3, Math.min(5, w / 120));
  const ballRadius = Math.max(5, Math.min(7, w / 80));
  return {
    topPadding,
    bottomPadding,
    rowSpacing,
    boardWidth,
    startX,
    slotCount,
    slotY,
    slotWidth,
    slotHeight,
    pegRadius,
    ballRadius,
    width: w,
    height: h,
  };
}

/** Return the (x,y) of peg at `row`, `col` for the given layout. */
function pegXY(
  row: number,
  col: number,
  lines: number,
  L: Layout
): { x: number; y: number } {
  const pegsInRow = 3 + row;
  const rowWidth = ((pegsInRow - 1) / (L.slotCount - 1 + 1)) * L.boardWidth;
  const rowStartX = (L.width - rowWidth) / 2;
  const x =
    pegsInRow === 1
      ? L.width / 2
      : rowStartX + (col / (pegsInRow - 1)) * rowWidth;
  const y = L.topPadding + row * L.rowSpacing;
  return { x, y };
}

// ── per-ball physics state ──────────────────────────────────────────

interface BallPhysics {
  x: number;
  y: number;
  vx: number;
  vy: number;
  /** Tracks how many rows of the path[] have been consumed for kicks. */
  pathIndex: number;
  /** Row+col key of the last peg we collided with (prevents re-bounce). */
  lastPegKey: string;
  landed: boolean;
  landedTime: number;
}

// ── component ───────────────────────────────────────────────────────

export const PlinkoBoard = React.memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number>(0);
  const ballPhysicsRef = useRef<Map<string, BallPhysics>>(new Map());
  const lastFrameRef = useRef<number>(0);

  const lines = usePlinkoStore((state) => state.lines);
  const risk = usePlinkoStore((state) => state.risk);
  const activeBalls = usePlinkoStore((state) => state.activeBalls);

  const { data: multipliersData } = usePlinkoMultipliers(risk, lines);
  const multipliers = useMemo(
    () => multipliersData?.multipliers ?? [],
    [multipliersData?.multipliers]
  );

  // ── main draw --------------------------------------------------

  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, w: number, h: number, dt: number) => {
      const L = computeLayout(w, h, lines);
      const now = performance.now();

      ctx.clearRect(0, 0, w, h);

      // ── pegs ────────────────────────────────────────────────────
      for (let row = 0; row < lines; row++) {
        const pegsInRow = 3 + row;
        for (let col = 0; col < pegsInRow; col++) {
          const p = pegXY(row, col, lines, L);
          ctx.beginPath();
          ctx.arc(p.x, p.y, L.pegRadius, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(255,255,255,0.5)";
          ctx.fill();
        }
      }

      // ── multiplier slots ────────────────────────────────────────
      const highlightedSlots = new Set<number>();
      for (const [, bp] of ballPhysicsRef.current) {
        if (bp.landed && now - bp.landedTime < 800) {
          const idx = Math.round(
            ((bp.x - L.startX) / L.boardWidth) * (L.slotCount - 1)
          );
          if (idx >= 0 && idx < L.slotCount) highlightedSlots.add(idx);
        }
      }

      for (let i = 0; i < L.slotCount; i++) {
        const sx = L.startX + i * L.slotWidth;
        const color = getSlotColor(i, L.slotCount);
        const lit = highlightedSlots.has(i);

        ctx.fillStyle = color;
        ctx.globalAlpha = lit ? 1 : 0.8;
        ctx.beginPath();
        ctx.roundRect(sx + 2, L.slotY, L.slotWidth - 4, L.slotHeight, 4);
        ctx.fill();

        if (lit) {
          ctx.shadowColor = color;
          ctx.shadowBlur = 14;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
        ctx.globalAlpha = 1;

        if (multipliers[i] !== undefined) {
          ctx.fillStyle = "#fff";
          ctx.font = `bold ${Math.max(9, Math.min(12, w / 70))}px sans-serif`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(
            `${multipliers[i]}x`,
            sx + L.slotWidth / 2,
            L.slotY + L.slotHeight / 2
          );
        }
      }

      // ── pre-compute ALL peg positions ─────────────────────────────
      // Flat array so we only compute once per frame, not per ball.
      const allPegs: { x: number; y: number; row: number; col: number }[] = [];
      for (let row = 0; row < lines; row++) {
        const pegsInRow = 3 + row;
        for (let col = 0; col < pegsInRow; col++) {
          const p = pegXY(row, col, lines, L);
          allPegs.push({ x: p.x, y: p.y, row, col });
        }
      }

      // ── physics constants (scaled to layout) ────────────────────
      const GRAVITY = L.rowSpacing * 28;
      const KICK_X = L.rowSpacing * 2.8;
      const BOUNCE_RESTITUTION = 0.35;
      const hitDist = L.pegRadius + L.ballRadius;
      const frameDt = Math.min(dt, 0.05);
      const SUB_STEP = 0.003; // 3 ms sub-steps (~333 Hz)
      const steps = Math.max(1, Math.ceil(frameDt / SUB_STEP));
      const stepDt = frameDt / steps;

      // ── ball simulation & drawing ───────────────────────────────
      for (const ball of activeBalls) {
        let bp = ballPhysicsRef.current.get(ball.id);

        if (!bp) {
          bp = {
            x: w / 2,
            y: L.topPadding - L.rowSpacing * 0.6,
            vx: 0,
            vy: 0,
            pathIndex: 0,
            lastPegKey: "",
            landed: false,
            landedTime: 0,
          };
          ballPhysicsRef.current.set(ball.id, bp);
        }

        if (bp.landed) {
          if (now - bp.landedTime < 600) {
            ctx.beginPath();
            ctx.arc(bp.x, bp.y, L.ballRadius, 0, Math.PI * 2);
            ctx.fillStyle = "#f43f5e";
            ctx.shadowColor = "#f43f5e";
            ctx.shadowBlur = 10;
            ctx.fill();
            ctx.shadowBlur = 0;
          }
          continue;
        }

        // ── sub-stepped integration ─────────────────────────────
        for (let s = 0; s < steps; s++) {
          // Gravity + integrate
          bp.vy += GRAVITY * stepDt;
          bp.x += bp.vx * stepDt;
          bp.y += bp.vy * stepDt;

          // Light drag
          bp.vx *= 0.997;

          // ── collision against EVERY peg on the board ─────────
          let collided = false;
          for (let pi = 0; pi < allPegs.length; pi++) {
            const peg = allPegs[pi];
            const dx = bp.x - peg.x;
            const dy = bp.y - peg.y;
            const distSq = dx * dx + dy * dy;

            if (distSq < hitDist * hitDist) {
              const pegKey = `${peg.row}-${peg.col}`;
              // Don't re-bounce off the same peg we just hit
              if (pegKey === bp.lastPegKey) continue;

              const dist = Math.sqrt(distSq);
              const nx = dx / (dist || 1);
              const ny = dy / (dist || 1);

              // Push ball outside the peg
              bp.x = peg.x + nx * (hitDist + 0.5);
              bp.y = peg.y + ny * (hitDist + 0.5);

              // Reflect velocity along collision normal
              const vDotN = bp.vx * nx + bp.vy * ny;
              if (vDotN < 0) {
                bp.vx -= (1 + BOUNCE_RESTITUTION) * vDotN * nx;
                bp.vy -= (1 + BOUNCE_RESTITUTION) * vDotN * ny;
              }

              // Apply path-directed horizontal kick if we have path
              // entries left. Each peg hit consumes one path entry.
              if (bp.pathIndex < ball.path.length) {
                const dir = ball.path[bp.pathIndex];
                bp.vx += dir === 1 ? KICK_X : -KICK_X;
                bp.pathIndex += 1;
              }

              bp.lastPegKey = pegKey;
              collided = true;
              break; // one collision per sub-step
            }
          }

          // If no peg collision, clear lastPegKey once ball has moved
          // far enough so it can re-collide with nearby pegs later
          if (!collided && bp.lastPegKey) {
            // Check distance to last peg — if ball has cleared it, reset
            const parts = bp.lastPegKey.split("-");
            const lr = parseInt(parts[0]);
            const lc = parseInt(parts[1]);
            const lp = pegXY(lr, lc, lines, L);
            const ldx = bp.x - lp.x;
            const ldy = bp.y - lp.y;
            if (ldx * ldx + ldy * ldy > hitDist * hitDist * 2.5) {
              bp.lastPegKey = "";
            }
          }

          // ── landing in slot ───────────────────────────────────
          if (bp.y >= L.slotY - L.ballRadius) {
            // Determine actual slot from where the ball physically landed
            const actualSlot = Math.round(
              (bp.x - L.startX - L.slotWidth / 2) / L.slotWidth
            );
            const clampedSlot = Math.max(
              0,
              Math.min(L.slotCount - 1, actualSlot)
            );
            const slotCenterX =
              L.startX + clampedSlot * L.slotWidth + L.slotWidth / 2;
            bp.x = slotCenterX;

            // Update store so displayed multiplier/win match the visual slot
            if (clampedSlot !== ball.slotIndex && multipliers.length > 0) {
              const actualMultiplier =
                multipliers[clampedSlot] ?? ball.multiplier;
              const betAmount =
                ball.multiplier !== 0 ? ball.winAmount / ball.multiplier : 0;
              usePlinkoStore.getState().updateActiveBall(ball.id, {
                slotIndex: clampedSlot,
                multiplier: actualMultiplier,
                winAmount: betAmount * actualMultiplier,
              });
            }
            bp.y = L.slotY - L.ballRadius - 2;
            bp.vx = 0;
            bp.vy = 0;
            bp.landed = true;
            bp.landedTime = now;

            setTimeout(() => {
              usePlinkoStore.getState().removeActiveBall(ball.id);
              ballPhysicsRef.current.delete(ball.id);
            }, 700);
            break;
          }
        }

        // ── draw ball ───────────────────────────────────────────
        ctx.beginPath();
        ctx.arc(bp.x, bp.y, L.ballRadius, 0, Math.PI * 2);
        ctx.fillStyle = "#f43f5e";
        ctx.shadowColor = "#f43f5e";
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Prune stale physics entries
      for (const [id] of ballPhysicsRef.current) {
        if (!activeBalls.find((b) => b.id === id)) {
          ballPhysicsRef.current.delete(id);
        }
      }
    },
    [lines, multipliers, activeBalls]
  );

  // ── canvas resize ─────────────────────────────────────────────

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.scale(dpr, dpr);
        draw(ctx, rect.width, rect.height, 0);
      }
    };

    resize();
    const obs = new ResizeObserver(resize);
    obs.observe(container);
    return () => obs.disconnect();
  }, [draw]);

  // ── animation loop ────────────────────────────────────────────

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let running = true;
    lastFrameRef.current = performance.now();

    const tick = () => {
      if (!running) return;
      const now = performance.now();
      const dt = (now - lastFrameRef.current) / 1000; // seconds
      lastFrameRef.current = now;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        const rect = container.getBoundingClientRect();
        draw(ctx, rect.width, rect.height, dt);
      }
      animFrameRef.current = requestAnimationFrame(tick);
    };

    if (activeBalls.length > 0) {
      tick();
    } else {
      // Static render (no balls)
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const rect = container.getBoundingClientRect();
        draw(ctx, rect.width, rect.height, 0);
      }
    }

    return () => {
      running = false;
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [activeBalls, draw]);

  return (
    <div
      ref={containerRef}
      className="w-full aspect-[5/4] rounded-2xl bg-background-card overflow-hidden"
    >
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
});

PlinkoBoard.displayName = "PlinkoBoard";
