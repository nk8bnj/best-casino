import { Logo } from "./Logo";

interface AuthFormHeaderProps {
  subtitle: string;
  className?: string;
}

export function AuthFormHeader({
  subtitle,
  className = "",
}: AuthFormHeaderProps) {
  return (
    <div className={`text-center space-y-4 mb-10 ${className}`}>
      <div className="flex justify-center">
        <Logo size="lg" />
      </div>
      <h1 className="text-4xl font-black text-text-primary">Blaze Casino</h1>
      <p className="text-2xl text-text-secondary font-semibold">{subtitle}</p>
    </div>
  );
}
