"use client";

interface LeaderboardSkeletonProps {
  count?: number;
}

function SkeletonRow() {
  return (
    <div className="flex items-center gap-4 p-4 mb-4 rounded-sm bg-[#2E2745] animate-pulse">
      {/* Rank skeleton */}
      <div className="flex-shrink-0 w-7 h-7 bg-[#3D3456] rounded-full" />

      {/* Name and games skeleton */}
      <div className="flex-1 min-w-0">
        <div className="h-4 w-24 bg-[#3D3456] rounded mb-2" />
        <div className="h-3 w-16 bg-[#3D3456] rounded" />
      </div>

      {/* Stats skeleton */}
      <div className="flex flex-col items-end gap-1">
        <div className="h-4 w-16 bg-[#3D3456] rounded" />
        <div className="h-3 w-12 bg-[#3D3456] rounded" />
      </div>
    </div>
  );
}

export function LeaderboardSkeleton({ count = 5 }: LeaderboardSkeletonProps) {
  return (
    <div className="space-y-2">
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonRow key={index} />
      ))}
    </div>
  );
}
