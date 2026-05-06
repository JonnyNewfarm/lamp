// lib/actions/order.actions.ts
"use server";

import { prisma } from "@/lib/prisma";
import { OrderStatus } from "@/prisma/generated/prisma/client";
import { revalidatePath } from "next/cache";

export async function updateOrderStatus(orderId: string, formData: FormData) {
  const status = String(formData.get("status") || "") as OrderStatus;

  if (!status) {
    throw new Error("Status is required");
  }

  await prisma.order.update({
    where: {
      id: orderId,
    },
    data: {
      status,
    },
  });

  revalidatePath("/admin/orders");
}

export async function updateOrderTracking(orderId: string, formData: FormData) {
  const trackingNumber = String(formData.get("trackingNumber") || "").trim();

  await prisma.order.update({
    where: {
      id: orderId,
    },
    data: {
      trackingNumber: trackingNumber || null,
      status: trackingNumber ? "SHIPPED" : undefined,
    },
  });

  revalidatePath("/admin/orders");
}