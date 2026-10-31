import Image from "next/image";

type CaleroLogoProps = {
  className?: string;
};

export default function CaleroLogo({ className = "" }: CaleroLogoProps) {
  return (
    <Image
      src="/logo-calero-3.png"
      alt="Calero Studio"
      width={80}
      height={80}
      unoptimized
      priority
      className={`block object-contain mix-blend-multiply ${className}`}
    />
  );
}
