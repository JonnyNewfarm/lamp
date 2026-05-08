import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

type CartMetadataItem = {
  productId: string;
  variantId: string;
  quantity: number;
};

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

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

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as any;

      if (session.payment_status !== "paid") {
        return NextResponse.json({ received: true });
      }

      await handleCartCheckout(session);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("[STRIPE_WEBHOOK_ERROR]", error);

    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 },
    );
  }
}

async function handleCartCheckout(session: any) {
  const rawCart = session.metadata?.cart;

  if (!rawCart) {
    throw new Error("Missing cart metadata");
  }

  const existingOrder = await prisma.order.findFirst({
    where: {
      stripeSessionId: {
        startsWith: session.id,
      },
    },
    select: {
      id: true,
    },
  });

  if (existingOrder) {
    return;
  }

  const cart = JSON.parse(rawCart) as CartMetadataItem[];

  if (!cart.length) {
    throw new Error("Cart metadata is empty");
  }

  const variantIds = cart.map((item) => item.variantId);

  const variants = await prisma.productVariant.findMany({
    where: {
      id: {
        in: variantIds,
      },
    },
    include: {
      product: true,
    },
  });

  const shipping =
    session.shipping_details ??
    session.collected_information?.shipping_details ??
    null;

  const addr = shipping?.address ?? session.customer_details?.address ?? null;

  for (const cartItem of cart) {
    const variant = variants.find((item) => item.id === cartItem.variantId);

    if (!variant) continue;

    const unitAmount = variant.price ?? variant.product.price;

    await prisma.order.create({
      data: {
        stripeSessionId:
          cart.length === 1
            ? session.id
            : `${session.id}_${variant.id}`,

        stripePaymentId:
          typeof session.payment_intent === "string"
            ? session.payment_intent
            : session.payment_intent?.id ?? null,

        customerEmail: session.customer_details?.email ?? null,
        customerName: session.customer_details?.name ?? null,

        productId: variant.product.id,
        productName: variant.product.title,
        unitAmount,
        currency: variant.product.currency,

        shipLine1: addr?.line1 ?? null,
        shipLine2: addr?.line2 ?? null,
        shipCity: addr?.city ?? null,
        shipState: addr?.state ?? null,
        shipPostalCode: addr?.postal_code ?? null,
        shipCountry: addr?.country ?? null,

        supplierUrl: variant.product.supplierUrl ?? null,
        status: "PAID",
color: [
  variant.color || variant.name,
  variant.plugType ? `${variant.plugType} Plug` : null,
]
  .filter(Boolean)
  .join(" / "),      },
    });

    await prisma.productVariant.update({
      where: {
        id: variant.id,
      },
      data: {
        stock: {
          decrement: cartItem.quantity,
        },
      },
    });
  }
}