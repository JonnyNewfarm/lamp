"use client";

type ProductPlugSelectorProps = {
  plugTypes: string[];
  selectedPlugType?: string;
  isAvailable: (plugType: string) => boolean;
  onChange: (plugType: string) => void;
};

export default function ProductPlugSelector({
  plugTypes,
  selectedPlugType,
  isAvailable,
  onChange,
}: ProductPlugSelectorProps) {
  if (plugTypes.length === 0) {
    return null;
  }

  return (
    <div
      className="
        mt-8
        border-t
        border-[#1a1817]/15
        pt-8
      "
    >
      <div className="mb-5 flex items-center justify-between">
        <p className="text-sm text-[#1a1817]/45">Plug type</p>

        {selectedPlugType && <p className="text-sm">{selectedPlugType} Plug</p>}
      </div>

      <div className="flex flex-wrap gap-3">
        {plugTypes.map((plugType) => {
          const active = selectedPlugType === plugType;

          const available = isAvailable(plugType);

          return (
            <button
              key={plugType}
              type="button"
              onClick={() => onChange(plugType)}
              disabled={!available}
              className={`
                cursor-pointer
                border
                px-4
                py-3
                text-sm
                transition
                disabled:cursor-not-allowed
                disabled:opacity-35
                ${
                  active
                    ? "border-[#1a1817]"
                    : "border-[#1a1817]/15 hover:border-[#1a1817]/40"
                }
              `}
            >
              {plugType} Plug
            </button>
          );
        })}
      </div>
    </div>
  );
}
