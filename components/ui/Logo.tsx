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
  const iconSizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  const textSizeClasses = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-3xl",
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {showText && (
        <span
          className={`text-text-primary font-bold ${textSizeClasses[size]}`}
        >
          Blaze
        </span>
      )}
      <div className={iconSizeClasses[size]}>
        <LogoIcon className="w-full h-full" />
      </div>
      {showText && (
        <span
          className={`text-text-primary font-bold ${textSizeClasses[size]}`}
        >
          Casino
        </span>
      )}
    </div>
  );
}
