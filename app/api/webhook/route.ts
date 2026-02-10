import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { PRODUCT } from "@/lib/product";

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature");
  if (!sig) return NextResponse.json({ error: "Missing signature" }, { status: 400 });

  const body = await req.text();

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as any;

    const shipping = session.shipping_details;
    const addr = shipping?.address;

    // idempotent: upsert på stripeSessionId
    await prisma.order.upsert({
      where: { stripeSessionId: session.id },
      update: {
        stripePaymentId: session.payment_intent ?? null,
        customerEmail: session.customer_details?.email ?? null,
        customerName: session.customer_details?.name ?? null,
        shipLine1: addr?.line1 ?? null,
        shipLine2: addr?.line2 ?? null,
        shipCity: addr?.city ?? null,
        shipState: addr?.state ?? null,
        shipPostalCode: addr?.postal_code ?? null,
        shipCountry: addr?.country ?? null,
        status: "PAID",
      },
      create: {
        stripeSessionId: session.id,
        stripePaymentId: session.payment_intent ?? null,
        customerEmail: session.customer_details?.email ?? null,
        customerName: session.customer_details?.name ?? null,

        productId: session.metadata?.productId ?? PRODUCT.id,
        productName: PRODUCT.name,
        unitAmount: PRODUCT.unitAmount,
        currency: PRODUCT.currency,

        shipLine1: addr?.line1 ?? null,
        shipLine2: addr?.line2 ?? null,
        shipCity: addr?.city ?? null,
        shipState: addr?.state ?? null,
        shipPostalCode: addr?.postal_code ?? null,
        shipCountry: addr?.country ?? null,

        supplierUrl: PRODUCT.supplierUrl,
        status: "PAID",
      },
    });
  }

  return NextResponse.json({ received: true });
}
