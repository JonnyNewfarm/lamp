import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { PRODUCT, type SupportedCurrency } from "@/lib/product";

type ColorKey = "green" | "red" | "white";

function isSupportedCurrency(x: any): x is SupportedCurrency {
  return x === "usd" || x === "eur" || x === "gbp" || x === "nok";
}

export async function POST(req: Request) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL!;
  const body = await req.json().catch(() => ({}));

  const color = (body?.color ?? "green") as ColorKey;
  const safeColor: ColorKey = color === "red" || color === "white" ? color : "green";

  const currency: SupportedCurrency = isSupportedCurrency(body?.currency)
    ? body.currency
    : "usd";

  const unitAmount = PRODUCT.prices[currency];

  const session = await stripe.checkout.sessions.create({
    mode: "payment",

    line_items: [
      {
        quantity: 1,
        price_data: {
          currency,
          unit_amount: unitAmount,
          product_data: {
            name: PRODUCT.name,
            description: PRODUCT.description,
            metadata: {
              productId: PRODUCT.id,
              color: safeColor,
            },
          },
        },
      },
    ],

    shipping_address_collection: {
      allowed_countries: [
        "US","CA","GB","IE","AU","NZ",
        "DE","FR","ES","IT","NL","BE","SE","NO","DK","FI","CH",
        "PL","AT","PT","CZ","RO","HU","GR",
        "JP","KR","SG","HK","AE"
      ],
    },

    shipping_options: [
      {
        shipping_rate_data: {
          display_name: "Free shipping",
          type: "fixed_amount",
          fixed_amount: { amount: 0, currency }, 
          delivery_estimate: {
            minimum: { unit: "business_day", value: 7 },
            maximum: { unit: "business_day", value: 18 },
          },
        },
      },
    ],

    success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/cancel`,

    metadata: { productId: PRODUCT.id, color: safeColor, currency },
    payment_intent_data: {
      metadata: { productId: PRODUCT.id, color: safeColor, currency },
    },
  });

  if (!session.url) {
    return NextResponse.json({ error: "Missing session url" }, { status: 500 });
  }

  return NextResponse.json({ url: session.url, currency, unitAmount });
}