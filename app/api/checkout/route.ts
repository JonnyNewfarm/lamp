// app/api/checkout/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";

type CheckoutCartItem = {
  productId: string;
  variantId: string;
  quantity: number;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      items?: CheckoutCartItem[];
    };

    const items = body.items || [];

    if (!items.length) {
      return NextResponse.json(
        { error: "Cart is empty" },
        { status: 400 },
      );
    }

    const appUrl =
      process.env.NEXT_PUBLIC_APP_URL || request.headers.get("origin");

    if (!appUrl) {
      return NextResponse.json(
        { error: "Missing app URL" },
        { status: 500 },
      );
    }

    const variantIds = items.map((item) => item.variantId);

    const variants = await prisma.productVariant.findMany({
      where: {
        id: {
          in: variantIds,
        },
        product: {
          status: "ACTIVE",
        },
      },
      include: {
        product: {
          include: {
            images: {
              orderBy: {
                order: "asc",
              },
            },
          },
        },
        images: {
          orderBy: {
            order: "asc",
          },
        },
      },
    });

    const lineItems = items.map((cartItem) => {
      const variant = variants.find((item) => item.id === cartItem.variantId);

      if (!variant) {
        throw new Error("Product variant not found");
      }

      if (variant.stock < cartItem.quantity) {
        throw new Error(`${variant.product.title} is out of stock`);
      }

      const unitAmount = variant.price || variant.product.price;
      const image = variant.images[0] || variant.product.images[0];

      return {
        quantity: cartItem.quantity,
        price_data: {
          currency: variant.product.currency,
          unit_amount: unitAmount,
          product_data: {
            name: `${variant.product.title} - ${variant.name}`,
            description: variant.color || variant.product.description,
            images: image?.url ? [image.url] : undefined,
            metadata: {
              productId: variant.product.id,
              variantId: variant.id,
            },
          },
        },
      };
    });

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      success_url: `${appUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/shop`,
      billing_address_collection: "auto",
      shipping_address_collection: {
        allowed_countries: [
          "US",
          "CA",
          "GB",
          "AU",
          "NO",
          "SE",
          "DK",
          "FI",
          "DE",
          "FR",
          "NL",
          "ES",
          "IT",
        ],
      },
      metadata: {
        cart: JSON.stringify(
          items.map((item) => ({
            productId: item.productId,
            variantId: item.variantId,
            quantity: item.quantity,
          })),
        ),
      },
    });

    return NextResponse.json({
      url: session.url,
    });
  } catch (error) {
    console.error("[CHECKOUT_ERROR]", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Something went wrong while creating checkout",
      },
      { status: 500 },
    );
  }
}