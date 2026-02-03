"use client";

import { useEffect, useRef } from "react";
import { useCrashStore, type LastCashout } from "@/store/crash.store";
import { CrashGameStatus } from "@/types/crash.types";
import {
  drawSky,
  drawRocket,
  drawAxes,
  createStarsManager,
  createCometsManager,
  createExplosionManager,
} from "./animations";

export const useCrashGameCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const timeRef = useRef(0);
  const bgHueRef = useRef(260);
  const rocketScaleRef = useRef(2.5);
  const rocketTiltRef = useRef(0);
  const crashedRef = useRef(false);
  const multiplierRef = useRef(1.0);
  const stateRef = useRef<CrashGameStatus>(CrashGameStatus.WAITING);
  const lastCashoutRef = useRef<LastCashout | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const endTimeRef = useRef<number | null>(null);

  const gameState = useCrashStore((state) => state.gameState);
  const lastCashout = useCrashStore((state) => state.lastCashout);
  const multiplier = gameState?.multiplier || 1.0;
  const state = gameState?.state || CrashGameStatus.WAITING;

  useEffect(() => {
    multiplierRef.current = multiplier;
    stateRef.current = state;
    lastCashoutRef.current = lastCashout;

    if (state === CrashGameStatus.RUNNING && !startTimeRef.current) {
      startTimeRef.current = Date.now();
      endTimeRef.current = null;
    } else if (state === CrashGameStatus.CRASHED && !endTimeRef.current) {
      endTimeRef.current = Date.now();
    } else if (state === CrashGameStatus.WAITING) {
      startTimeRef.current = null;
      endTimeRef.current = null;
    }
  }, [multiplier, state, lastCashout]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const starsManager = createStarsManager(canvas.width, canvas.height);
    const cometsManager = createCometsManager(canvas.width, canvas.height);
    const explosionManager = createExplosionManager();

    const doResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      starsManager.initStars(canvas.width, canvas.height);
    };
    const onResize = () => requestAnimationFrame(doResize);

    const drawGame = () => {
      const rocketX = canvas.width / 2;
      const rocketY = canvas.height / 2;
      const currentState = stateRef.current;
      const currentMultiplier = multiplierRef.current;
      const cashout = lastCashoutRef.current;

      const elapsedTime = startTimeRef.current
        ? ((endTimeRef.current || Date.now()) - startTimeRef.current) / 1000
        : 0;

      drawAxes(
        ctx,
        canvas.width,
        canvas.height,
        currentMultiplier,
        elapsedTime
      );

      if (currentState === CrashGameStatus.WAITING) {
        rocketScaleRef.current = 2.5;
        rocketTiltRef.current = 0;
        crashedRef.current = false;
        explosionManager.clearExplosion();
        // Don't draw the rocket on the waiting/start screen.
        // Show only the default multiplier and the waiting text.
        const displayMultiplier = 1.0;

        ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
        ctx.font = "bold 96px Arial";
        ctx.textAlign = "center";
        ctx.shadowColor = "transparent";
        ctx.fillText(
          `${displayMultiplier.toFixed(2)}x`,
          canvas.width / 2,
          canvas.height / 2 - 10
        );

        ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        ctx.font = "bold 28px Arial";
        ctx.fillText(
          "Waiting for bets...",
          canvas.width / 2,
          canvas.height / 2 + 50
        );
        return;
      }

      if (currentState === CrashGameStatus.RUNNING) {
        rocketScaleRef.current = 2.5 + (currentMultiplier - 1) * 0.2;
        rocketTiltRef.current = Math.sin(timeRef.current * 0.15) * 0.03;
      }

      if (currentState === CrashGameStatus.CRASHED && !crashedRef.current) {
        crashedRef.current = true;
        if (!cashout) {
          explosionManager.createExplosion(rocketX, rocketY);
        }
      }

      if (currentState === CrashGameStatus.CRASHED) {
        if (cashout) {
          // Win state
          ctx.fillStyle = "#4ade80";
          ctx.font = "bold 64px Arial";
          ctx.textAlign = "center";
          ctx.shadowColor = "rgba(74, 222, 128, 0.8)";
          ctx.shadowBlur = 30;
          ctx.fillText("YOU WON!", canvas.width / 2, canvas.height / 2);
          ctx.shadowBlur = 0;

          ctx.fillStyle = "#ffffff";
          ctx.font = "bold 48px Arial";
          ctx.fillText(
            `$${Number(cashout.winAmount).toFixed(2)}`,
            canvas.width / 2,
            canvas.height / 2 + 60
          );
        } else {
          // Crash state
          explosionManager.drawExplosion(ctx);

          ctx.fillStyle = "rgba(255, 50, 50, 0.9)";
          ctx.font = "bold 64px Arial";
          ctx.textAlign = "center";
          ctx.shadowColor = "rgba(255, 50, 50, 0.8)";
          ctx.shadowBlur = 30;
          ctx.fillText("CRASHED!", canvas.width / 2, canvas.height / 2);
          ctx.shadowBlur = 0;

          ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
          ctx.font = "bold 48px Arial";
          ctx.fillText(
            `${currentMultiplier.toFixed(2)}x`,
            canvas.width / 2,
            canvas.height / 2 + 60
          );
        }
      } else {
        drawRocket(
          ctx,
          rocketX,
          rocketY,
          -Math.PI / 4 + rocketTiltRef.current,
          timeRef.current,
          rocketScaleRef.current
        );
      }

      // Display multiplier
      const pulse = Math.sin(timeRef.current * 0.08) * 0.1;
      const displayMultiplier = cashout
        ? cashout.multiplier
        : currentMultiplier;

      ctx.fillStyle =
        currentState === CrashGameStatus.RUNNING
          ? `rgba(0, 255, 0, ${0.9 - pulse})`
          : "rgba(255, 255, 255, 0.5)";

      ctx.font = `bold ${72 + pulse * 50}px Arial`;
      ctx.textAlign = "center";
      ctx.shadowColor =
        currentState === CrashGameStatus.RUNNING
          ? "rgba(0, 255, 0, 0.8)"
          : "transparent";
      ctx.shadowBlur = 30;
      ctx.fillText(`${displayMultiplier.toFixed(2)}x`, canvas.width / 2, 100);
      ctx.shadowBlur = 0;
    };

    const animate = () => {
      timeRef.current++;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      bgHueRef.current = drawSky(
        ctx,
        canvas.width,
        canvas.height,
        timeRef.current,
        bgHueRef.current
      );

      starsManager.drawStars(
        ctx,
        timeRef.current,
        canvas.width,
        canvas.height,
        stateRef.current === CrashGameStatus.RUNNING
      );

      cometsManager.drawComets(
        ctx,
        canvas.width,
        canvas.height,
        stateRef.current === CrashGameStatus.RUNNING
      );

      drawGame();

      animationRef.current = requestAnimationFrame(animate);
    };

    doResize();
    window.addEventListener("resize", onResize);
    animate();

    return () => {
      window.removeEventListener("resize", onResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return canvasRef;
};
