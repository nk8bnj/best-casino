import type { ReactNode } from "react";

interface PageWrapperProps {
  children: ReactNode;
  className?: string;
  spacing?: "none" | "sm" | "md" | "lg" | "xl";
}

const spacingClasses = {
  none: "",
  sm: "py-4",
  md: "py-8",
  lg: "py-12",
  xl: "py-16 md:py-24",
};

export function PageWrapper({
  children,
  className = "",
  spacing = "lg",
}: PageWrapperProps) {
  return (
    <main
      className={`min-h-screen flex items-center justify-center ${spacingClasses[spacing]} ${className}`}
    >
      {children}
    </main>
  );
}
