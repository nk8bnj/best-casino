"use client";

interface VIPBadgeProps {
  level: number;
}

export function VIPBadge({ level }: VIPBadgeProps) {
  return (
    <span className="inline-flex items-center justify-center px-3 py-1 text-[14px] font-semibold rounded-full bg-linear-to-r from-[#2d74ff] to-[#4aa1ff] text-white shadow-[0_6px_18px_rgba(54,112,255,0.5)]">
      V{level}
    </span>
  );
}
