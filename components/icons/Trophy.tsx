export function TrophyIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 15C15.866 15 19 12.5376 19 9.5V4H5V9.5C5 12.5376 8.13401 15 12 15Z"
        fill="url(#trophyGradient)"
      />
      <path
        d="M5 4H3C2.44772 4 2 4.44772 2 5V7C2 8.65685 3.34315 10 5 10V4Z"
        fill="url(#trophyGradient)"
      />
      <path
        d="M19 4H21C21.5523 4 22 4.44772 22 5V7C22 8.65685 20.6569 10 19 10V4Z"
        fill="url(#trophyGradient)"
      />
      <path d="M10 15V17H14V15" fill="#B8860B" />
      <path
        d="M8 17H16V19C16 19.5523 15.5523 20 15 20H9C8.44772 20 8 19.5523 8 19V17Z"
        fill="url(#trophyGradient)"
      />
      <defs>
        <linearGradient
          id="trophyGradient"
          x1="2"
          y1="4"
          x2="22"
          y2="20"
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
