"use client";

import type { ReactNode } from "react";

type NavigationButtonProps = {
  children: ReactNode;
  onClick: () => void;
};

export default function NavigationButton({
  children,
  onClick,
}: NavigationButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        group
        relative
        inline-flex
        w-fit
        cursor-pointer
        items-center
        justify-end
        overflow-hidden
        pb-[2px]
        uppercase
        md:opacity-60
        transition-opacity
        duration-300
        hover:opacity-100
      "
    >
      <span>{children}</span>

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
    </button>
  );
}
