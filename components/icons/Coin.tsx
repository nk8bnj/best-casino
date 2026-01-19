export function CoinIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="10" fill="url(#coinGradient)" />
      <circle
        cx="12"
        cy="12"
        r="7"
        stroke="#B8860B"
        strokeWidth="1"
        fill="none"
      />
      <text
        x="12"
        y="16"
        textAnchor="middle"
        fill="#B8860B"
        fontSize="10"
        fontWeight="bold"
      >
        $
      </text>
      <defs>
        <linearGradient
          id="coinGradient"
          x1="2"
          y1="2"
          x2="22"
          y2="22"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFD700" />
          <stop offset="0.5" stopColor="#FFA500" />
          <stop offset="1" stopColor="#FFD700" />
        </linearGradient>
      </defs>
    </svg>
  );
}
