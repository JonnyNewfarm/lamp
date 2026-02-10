import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { PRODUCT } from "@/lib/product";

export async function POST() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL!;

  const session = await stripe.checkout.sessions.create({
    mode: "payment",

    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: PRODUCT.currency,
          unit_amount: PRODUCT.unitAmount,
          product_data: {
            name: PRODUCT.name,
            description: PRODUCT.description,
          },
        },
      },
    ],

    // Samle inn adresse (du må liste land; her er en “bred” liste som starter)
    shipping_address_collection: {
      allowed_countries: [
        "US","CA","GB","IE","AU","NZ",
        "DE","FR","ES","IT","NL","BE","SE","NO","DK","FI","CH",
        "PL","AT","PT","CZ","RO","HU","GR",
        "JP","KR","SG","HK","AE"
      ],
    },

    // Enkel flat-rate frakt
    shipping_options: [
      {
        shipping_rate_data: {
          display_name: "Standard shipping",
          type: "fixed_amount",
          fixed_amount: { amount: 1200, currency: PRODUCT.currency }, // €12
          delivery_estimate: {
            minimum: { unit: "business_day", value: 7 },
            maximum: { unit: "business_day", value: 18 },
          },
        },
      },
    ],

    success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/cancel`,

    // nyttig for mapping
    metadata: {
      productId: PRODUCT.id,
    },
  });

  return NextResponse.json({ id: session.id });
}
