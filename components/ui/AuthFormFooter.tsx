import Link from "next/link";

interface AuthFormFooterProps {
  linkText: string;
  linkLabel: string;
  linkHref: string;
  className?: string;
}

export function AuthFormFooter({
  linkText,
  linkLabel,
  linkHref,
  className = "",
}: AuthFormFooterProps) {
  return (
    <>
      <div className={`pb-4 border-b border-gray-700 ${className}`}>
        <p className="text-center text-sm text-text-secondary mt-8">
          {linkText}{" "}
          <Link
            href={linkHref}
            className="text-accent-blue underline font-medium"
          >
            {linkLabel}
          </Link>
        </p>
      </div>
      <p className="text-xs text-text-muted text-center mt-4">
        Your account data is stored locally in your browser
      </p>
    </>
  );
}
