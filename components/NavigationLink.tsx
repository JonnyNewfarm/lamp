"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

type NavigationLinkProps = {
  href: string;
  children: ReactNode;
};

export default function NavigationLink({
  href,
  children,
}: NavigationLinkProps) {
  const pathname = usePathname();

  const isActive =
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={`
        group
        relative
        inline-flex
        overflow-hidden
        pb-[5px]
        transition-opacity
        duration-300

        ${isActive ? "opacity-100" : "opacity-60 hover:opacity-100"}
      `}
    >
      <span>{children}</span>

      {!isActive && (
        <span
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            bottom-0
            left-0
            h-[1px]
            w-full
            origin-right
            scale-x-0
            bg-current
            transition-transform
            duration-500
            ease-[cubic-bezier(0.76,0,0.24,1)]

            group-hover:origin-left
            group-hover:scale-x-100
          "
        />
      )}
    </Link>
  );
}
