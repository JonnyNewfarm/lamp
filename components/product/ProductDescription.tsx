"use client";

import { useMemo, useState } from "react";

import { formatDescription } from "./product.utils";

type ProductDescriptionProps = {
  description: string;
};

export default function ProductDescription({
  description,
}: ProductDescriptionProps) {
  const [open, setOpen] = useState(false);

  const paragraphs = useMemo(() => {
    return formatDescription(description);
  }, [description]);

  const hasDescription = paragraphs.length > 0;

  const shouldCollapse = description.length > 220 || paragraphs.length > 1;

  if (!hasDescription) {
    return (
      <div
        className="
          mt-10
          max-w-md
          border-t
          border-[#1a1817]/15
          pt-8
        "
      >
        <p className="text-sm text-[#1a1817]/45">Description</p>

        <p
          className="
            mt-4
            text-sm
            leading-[1.8]
            text-[#1a1817]/45
          "
        >
          No product description available yet.
        </p>
      </div>
    );
  }

  return (
    <div
      className="
        mt-10
        max-w-md
        border-t
        border-[#1a1817]/15
        pt-8
      "
    >
      <div className="mb-4 flex items-center justify-between gap-4">
        <p className="text-sm text-[#1a1817]/90">Description</p>
      </div>

      <div
        className={`
          relative
          overflow-hidden
          transition-[max-height]
          duration-500
          ease-in-out
          ${shouldCollapse && !open ? "max-h-28" : "max-h-[900px]"}
        `}
      >
        <div className="space-y-3">
          {paragraphs.map((paragraph, index) => (
            <p
              key={`${paragraph.slice(0, 20)}-${index}`}
              className="
                  whitespace-pre-line
                  text-sm
                  leading-[1.75]
                  text-[#1a1817]/60
                  md:text-base
                  md:leading-[1.85]
                "
            >
              {paragraph}
            </p>
          ))}
        </div>

        {shouldCollapse && !open && (
          <div
            className="
              pointer-events-none
              absolute
              bottom-0
              left-0
              h-10
              w-full
              bg-gradient-to-t
              from-[#eeeeec]
              to-transparent
            "
          />
        )}
      </div>

      {shouldCollapse && (
        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          aria-expanded={open}
          className="
            mt-4
            inline-flex
            cursor-pointer
            items-center
            gap-3
            text-sm
            text-[#1a1817]
            transition
            hover:opacity-60
          "
        >
          <span className="font-semibold">
            {open ? "Hide description" : "View full description"}
          </span>

          <span className="h-px w-8 bg-[#1a1817]/40" />
        </button>
      )}
    </div>
  );
}
