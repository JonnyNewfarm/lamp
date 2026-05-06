// app/api/uploadthing/core.ts
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const uploadRouter = {
  productImage: f({
    image: {
      maxFileSize: "8MB",
      maxFileCount: 10,
    },
  })
    .middleware(async () => {
      return {
        uploadedBy: "admin",
      };
    })
    .onUploadComplete(async ({ file }) => {
      return {
        url: file.ufsUrl,
        name: file.name,
        key: file.key,
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof uploadRouter;