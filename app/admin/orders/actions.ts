"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const assertAdmin = (key: string) => {
  if (!process.env.ADMIN_KEY || key !== process.env.ADMIN_KEY) {
    throw new Error("Unauthorized");
  }
};

export async function setOrderStatus(formData: FormData) {
  const adminKey = String(formData.get("adminKey") ?? "");
  const orderId = String(formData.get("orderId") ?? "");
  const status = String(formData.get("status") ?? "");

  assertAdmin(adminKey);

  await prisma.order.update({
    where: { id: orderId },
    data: { status: status as any },
  });

  revalidatePath("/admin/orders");
}

export async function setTrackingNumber(formData: FormData) {
  const adminKey = String(formData.get("adminKey") ?? "");
  const orderId = String(formData.get("orderId") ?? "");
  const trackingNumber = String(formData.get("trackingNumber") ?? "");

  assertAdmin(adminKey);

  await prisma.order.update({
    where: { id: orderId },
    data: { trackingNumber: trackingNumber || null },
  });

  revalidatePath("/admin/orders");
}
