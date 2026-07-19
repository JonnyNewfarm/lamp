import Link from "next/link";
import { motion } from "framer-motion";

export default function NavigationLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div initial="idle" whileHover="hover" className="w-fit">
      <Link href={href} className="flex items-center justify-end gap-2">
        <svg
          aria-hidden="true"
          viewBox="0 0 52 18"
          fill="none"
          className="h-[14px] w-[42px] overflow-visible md:h-[16px] md:w-[48px]"
        >
          <motion.path
            d="M1 9H45"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="square"
            variants={{
              idle: {
                pathLength: 0,
                opacity: 0,
              },
              hover: {
                pathLength: 1,
                opacity: 1,
              },
            }}
            transition={{
              pathLength: {
                duration: 0.18,
                ease: [0.22, 1, 0.36, 1],
              },
              opacity: {
                duration: 0.06,
              },
            }}
          />

          <motion.path
            d="M45 9L38 2"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="square"
            variants={{
              idle: {
                pathLength: 0,
                opacity: 0,
              },
              hover: {
                pathLength: 1,
                opacity: 1,
              },
            }}
            transition={{
              pathLength: {
                duration: 0.14,
                delay: 0.08,
                ease: [0.22, 1, 0.36, 1],
              },
              opacity: {
                duration: 0.05,
                delay: 0.08,
              },
            }}
          />

          <motion.path
            d="M45 9L38 16"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="square"
            variants={{
              idle: {
                pathLength: 0,
                opacity: 0,
              },
              hover: {
                pathLength: 1,
                opacity: 1,
              },
            }}
            transition={{
              pathLength: {
                duration: 0.14,
                delay: 0.08,
                ease: [0.22, 1, 0.36, 1],
              },
              opacity: {
                duration: 0.05,
                delay: 0.08,
              },
            }}
          />
        </svg>

        <span>{children}</span>
      </Link>
    </motion.div>
  );
}
