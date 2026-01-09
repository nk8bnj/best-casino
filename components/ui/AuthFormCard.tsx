import type { ReactNode } from "react";

interface AuthFormCardProps {
  children: ReactNode;
  className?: string;
}

export function AuthFormCard({ children, className = "" }: AuthFormCardProps) {
  return (
    <div className={`w-full max-w-[440px] ${className}`}>
      <div className="bg-background-card/95 backdrop-blur-sm rounded-3xl shadow-card p-10">
        {children}
      </div>
    </div>
  );
}
