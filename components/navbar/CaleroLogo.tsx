type CaleroLogoProps = {
  className?: string;
};

export default function CaleroLogo({ className = "" }: CaleroLogoProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Ledning */}
      <path
        d="M32 5V18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Lite feste */}
      <path
        d="M27 18H37V23H27V18Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* Lampeskjerm */}
      <path
        d="M14 39C16.5 29 23 23 32 23C41 23 47.5 29 50 39H14Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* Lyspære */}
      <path
        d="M25 39C25.8 46 28.2 49 32 49C35.8 49 38.2 46 39 39"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
