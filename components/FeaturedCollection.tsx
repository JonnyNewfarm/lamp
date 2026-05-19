import { prisma } from "@/lib/prisma";
import NewProductsScroll from "@/components/NewProductsScroll";

export default async function NewProducts() {
  const products = await prisma.product.findMany({
    where: {
      status: "ACTIVE",
    },
    include: {
      category: true,
      images: {
        where: {
          variantId: null,
        },
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
    take: 6,
  });

  if (products.length === 0) {
    return null;
  }

  const productItems = products.map((product) => {
    const image =
      product.images[0]?.url ??
      product.variants[0]?.images[0]?.url ??
      "/images/placeholder.jpg";

    return {
      id: product.id,
      title: product.title,
      slug: product.slug,
      category: product.category?.name ?? "Product",
      image,
    };
  });

  return (
    <section id="new-products" className=" bg-[#ecebeb] text-[#161310]">
      <NewProductsScroll products={productItems} />
    </section>
  );
}
