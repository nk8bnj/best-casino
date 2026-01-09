interface FormErrorProps {
  message: string;
  className?: string;
}

export function FormError({ message, className = "" }: FormErrorProps) {
  if (!message) return null;

  return <p className={`text-sm text-error mt-2 ${className}`}>{message}</p>;
}
