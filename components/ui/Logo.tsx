import { LogoIcon } from "@/components/icons/LogoIcon";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

export function Logo({
  size = "md",
  showText = false,
  className = "",
}: LogoProps) {
  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-14 h-14",
    lg: "w-16 h-16",
  };

  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      <div
        className={`${sizeClasses[size]} bg-gradient-primary rounded-sm p-3 shadow-glow-primary flex items-center justify-center relative`}
      >
        <LogoIcon className="w-full h-full text-white" />
      </div>
      {showText && (
        <span className="text-text-primary font-bold text-xl">
          Blaze Casino
        </span>
      )}
    </div>
  );
}
