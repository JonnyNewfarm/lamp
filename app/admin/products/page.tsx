// app/admin/products/page.tsx
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteProduct } from "@/lib/actions/product.actions";
import { formatPrice } from "@/lib/formatPrice";
import { logoutAdmin } from "@/lib/actions/admin.actions";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    include: {
      category: true,
      variants: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="min-h-screen bg-[#ecebeb] px-6 py-24 text-[#161310] md:px-12">
      <div className="mb-12 flex items-end justify-between gap-8 border-b border-[#161310]/15 pb-8">
        <div>
          <p className="text-xs uppercase tracking-[0.34em] text-[#161310]/45">
            Admin
          </p>
          <form action={logoutAdmin}>
            <button className="border border-[#161310]/20 px-6 py-4 text-sm">
              Logout
            </button>
          </form>

          <h1 className="mt-4 text-6xl font-light tracking-[-0.07em]">
            Products
          </h1>
        </div>

        <div className="flex gap-3">
          <Link
            href="/admin/categories"
            className="border border-[#161310]/20 px-6 py-4 text-sm"
          >
            Categories
          </Link>

          <Link
            href="/admin/products/new"
            className="bg-[#161310] px-6 py-4 text-sm text-[#ecebeb]"
          >
            New product
          </Link>
        </div>
      </div>

      <div className="grid gap-px border border-[#161310]/15 bg-[#161310]/15">
        {products.length === 0 ? (
          <div className="bg-[#ecebeb] p-8 text-sm text-[#161310]/50">
            No products yet.
          </div>
        ) : (
          products.map((product) => (
            <article
              key={product.id}
              className="grid gap-6 bg-[#ecebeb] p-6 md:grid-cols-[1fr_160px_140px_160px_190px]"
            >
              <div>
                <h2 className="text-2xl tracking-[-0.04em]">{product.title}</h2>

                <p className="mt-2 text-sm text-[#161310]/50">
                  /{product.slug}
                </p>

                <p className="mt-1 text-sm text-[#161310]/50">
                  {product.category.name} · {product.variants.length} variants
                </p>
                <p className="mt-4">supplier:</p>
                <p className="text-[6px]">{product.supplierUrl}</p>
              </div>

              <div>
                <p className="text-sm text-[#161310]/45">Price</p>
                <p className="mt-2">
                  {formatPrice(product.price, product.currency)}
                </p>
              </div>

              <div>
                <p className="text-sm text-[#161310]/45">Status</p>
                <p className="mt-2">{product.status}</p>
              </div>

              <div>
                <p className="text-sm text-[#161310]/45">Featured</p>
                <p className="mt-2">{product.featured ? "Yes" : "No"}</p>
              </div>

              <div className="flex items-center gap-3 md:justify-end">
                <Link
                  href={`/admin/products/${product.id}/edit`}
                  className="border border-[#161310]/20 px-4 py-3 text-sm"
                >
                  Edit
                </Link>

                <form action={deleteProduct.bind(null, product.id)}>
                  <button className="border border-[#161310]/20 px-4 py-3 text-sm">
                    Delete
                  </button>
                </form>
              </div>
            </article>
          ))
        )}
      </div>
    </main>
  );
}
