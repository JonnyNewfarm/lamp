// components/admin/ImageUploadField.tsx
"use client";

import { UploadButton } from "@/lib/uploadthing";

type ImageUploadFieldProps = {
  label?: string;
  value: string;
  onChange: (url: string) => void;
};

export default function ImageUploadField({
  label = "Upload image",
  value,
  onChange,
}: ImageUploadFieldProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-[#161310]/55">{label}</p>

        {value && (
          <a
            href={value}
            target="_blank"
            rel="noreferrer"
            className="text-xs underline underline-offset-4"
          >
            Open image
          </a>
        )}
      </div>

      <div className="border border-[#161310]/15 p-4">
        <UploadButton
          endpoint="productImage"
          onClientUploadComplete={(res) => {
            const uploadedUrl = res?.[0]?.ufsUrl || res?.[0]?.url;

            if (uploadedUrl) {
              onChange(uploadedUrl);
            }
          }}
          onUploadError={(error: Error) => {
            alert(error.message);
          }}
          appearance={{
            button:
              "bg-[#161310] text-[#ecebeb] px-5 py-3 text-sm ut-ready:bg-[#161310] ut-uploading:opacity-50",
            allowedContent: "text-xs text-[#161310]/45",
            container: "items-start",
          }}
        />
      </div>

      {value && (
        <div className="relative h-32 w-32 overflow-hidden bg-[#f4f3f0]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="" className="h-full w-full object-cover" />
        </div>
      )}
    </div>
  );
}
