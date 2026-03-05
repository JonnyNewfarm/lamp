import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { PRODUCT, type SupportedCurrency } from "@/lib/product";

function isSupportedCurrency(x: any): x is SupportedCurrency {
  return x === "usd" || x === "eur" || x === "gbp" || x === "nok";
}

export const runtime = "nodejs";

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

    const color = session.metadata?.color ?? "green";

    const shipping =
      session.shipping_details ??
      session.collected_information?.shipping_details ??
      null;

    const addr =
      shipping?.address ??
      session.customer_details?.address ??
      null;

    const metaCurrency = session.metadata?.currency;
    const sessionCurrency = session.currency;

    const currency: SupportedCurrency = isSupportedCurrency(sessionCurrency)
      ? sessionCurrency
      : isSupportedCurrency(metaCurrency)
        ? metaCurrency
        : "usd";

    const unitAmount: number =
      typeof session.amount_total === "number"
        ? session.amount_total
        : PRODUCT.prices[currency]; 

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
        color,

        unitAmount,
        currency,
      },
      create: {
        stripeSessionId: session.id,
        stripePaymentId: session.payment_intent ?? null,
        customerEmail: session.customer_details?.email ?? null,
        customerName: session.customer_details?.name ?? null,

        productId: session.metadata?.productId ?? PRODUCT.id,
        productName: PRODUCT.name,
        unitAmount,
        currency,

        shipLine1: addr?.line1 ?? null,
        shipLine2: addr?.line2 ?? null,
        shipCity: addr?.city ?? null,
        shipState: addr?.state ?? null,
        shipPostalCode: addr?.postal_code ?? null,
        shipCountry: addr?.country ?? null,

        supplierUrl: PRODUCT.supplierUrl,
        status: "PAID",
        color,
      },
    });
  }

  return NextResponse.json({ received: true });
}