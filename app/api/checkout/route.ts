// app/api/checkout/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";

type CheckoutCartItem = {
  productId: string;
  variantId: string;
  quantity: number;
};

function getAppUrl(request: Request) {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    request.headers.get("origin") ||
    "http://localhost:3000"
  );
}

function getStripeImageUrl(imageUrl: string | null | undefined, appUrl: string) {
  if (!imageUrl) return undefined;

  try {
    // Already absolute URL
    if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
      const url = new URL(imageUrl);

      // Stripe should not receive localhost image URLs
      if (url.hostname === "localhost" || url.hostname === "127.0.0.1") {
        return undefined;
      }

      return url.toString();
    }

    // Relative URL like /images/lamp.png
    if (imageUrl.startsWith("/")) {
      const baseUrl = new URL(appUrl);

      // Do not send localhost images to Stripe
      if (baseUrl.hostname === "localhost" || baseUrl.hostname === "127.0.0.1") {
        return undefined;
      }

      return new URL(imageUrl, baseUrl.origin).toString();
    }

    return undefined;
  } catch {
    return undefined;
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      items?: CheckoutCartItem[];
    };

    const items = body.items || [];

    if (!items.length) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const appUrl = getAppUrl(request);

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
              where: {
                variantId: null,
              },
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
      const stripeImageUrl = getStripeImageUrl(image?.url, appUrl);

      return {
        quantity: cartItem.quantity,
        price_data: {
          currency: variant.product.currency,
          unit_amount: unitAmount,
          product_data: {
            name: `${variant.product.title} - ${variant.name}`,
            description: variant.color || variant.product.description,
            ...(stripeImageUrl
              ? {
                  images: [stripeImageUrl],
                }
              : {}),
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