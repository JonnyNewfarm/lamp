import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const SITE_URL = "https://calero.studio";
const BRAND = "Calero Studio";
const DEFAULT_CURRENCY = "USD";

const PRODUCT_PATH = "/products";

function escapeXml(value: string | number | null | undefined) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function stripHtml(value: string | null | undefined) {
  return String(value ?? "")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function formatGooglePrice(priceInCents: number, currency: string) {
  return `${(priceInCents / 100).toFixed(2)} ${currency.toUpperCase()}`;
}

function getProductImage(product: {
  images: { url: string; order: number }[];
}) {
  return product.images.sort((a, b) => a.order - b.order)[0]?.url ?? "";
}

function getVariantImage(
  variant: {
    images: { url: string; order: number }[];
  },
  product: {
    images: { url: string; order: number }[];
  },
) {
  return (
    variant.images.sort((a, b) => a.order - b.order)[0]?.url ??
    getProductImage(product)
  );
}

export async function GET() {
  const products = await prisma.product.findMany({
    where: {
      status: "ACTIVE",
    },
    include: {
      category: true,
      images: {
        orderBy: {
          order: "asc",
        },
      },
      variants: {
        include: {
          images: {
            orderBy: {
              order: "asc",
            },
          },
        },
        orderBy: {
          createdAt: "asc",
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const items = products.flatMap((product) => {
    const productUrl = `${SITE_URL}${PRODUCT_PATH}/${product.slug}`;
    const currency = product.currency || DEFAULT_CURRENCY;

    const description =
      stripHtml(product.description) ||
      stripHtml(product.specs) ||
      product.title;

    const productImage = getProductImage(product);

    if (product.variants.length > 0) {
      return product.variants.map((variant) => {
        const price = variant.price ?? product.price;
        const availability = variant.stock > 0 ? "in_stock" : "out_of_stock";
        const imageUrl = getVariantImage(variant, product);

        const title =
          variant.name && variant.name !== product.title
            ? `${product.title} - ${variant.name}`
            : product.title;

        return `
          <item>
            <g:id>${escapeXml(variant.sku || `calero-${product.id}-${variant.id}`)}</g:id>
            <g:item_group_id>${escapeXml(`calero-${product.id}`)}</g:item_group_id>
            <g:title>${escapeXml(title)}</g:title>
            <g:description>${escapeXml(description)}</g:description>
            <g:link>${escapeXml(productUrl)}</g:link>
            <g:image_link>${escapeXml(imageUrl)}</g:image_link>
            <g:availability>${escapeXml(availability)}</g:availability>
            <g:price>${escapeXml(formatGooglePrice(price, currency))}</g:price>
            <g:condition>new</g:condition>
            <g:brand>${escapeXml(BRAND)}</g:brand>
            <g:product_type>${escapeXml(product.category.name)}</g:product_type>
            <g:google_product_category>Home &amp; Garden &gt; Lighting</g:google_product_category>
            <g:identifier_exists>no</g:identifier_exists>
            ${
              variant.color
                ? `<g:color>${escapeXml(variant.color)}</g:color>`
                : ""
            }
          </item>
        `;
      });
    }

    const availability = "in_stock";

    return [
      `
        <item>
          <g:id>${escapeXml(`calero-${product.id}`)}</g:id>
          <g:title>${escapeXml(product.title)}</g:title>
          <g:description>${escapeXml(description)}</g:description>
          <g:link>${escapeXml(productUrl)}</g:link>
          <g:image_link>${escapeXml(productImage)}</g:image_link>
          <g:availability>${escapeXml(availability)}</g:availability>
          <g:price>${escapeXml(formatGooglePrice(product.price, currency))}</g:price>
          <g:condition>new</g:condition>
          <g:brand>${escapeXml(BRAND)}</g:brand>
          <g:product_type>${escapeXml(product.category.name)}</g:product_type>
          <g:google_product_category>Home &amp; Garden &gt; Lighting</g:google_product_category>
          <g:identifier_exists>no</g:identifier_exists>
        </item>
      `,
    ];
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>${escapeXml(BRAND)}</title>
    <link>${escapeXml(SITE_URL)}</link>
    <description>${escapeXml(`${BRAND} product feed`)}</description>
    ${items.join("")}
  </channel>
</rss>`;

  return new NextResponse(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}