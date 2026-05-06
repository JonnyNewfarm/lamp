// app/admin/categories/page.tsx
import { prisma } from "@/lib/prisma";
import { createCategory, deleteCategory } from "@/lib/actions/category.actions";

export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
    include: {
      _count: {
        select: {
          products: true,
        },
      },
    },
  });

  return (
    <main className="min-h-screen bg-[#ecebeb] px-6 py-24 text-[#161310] md:px-12">
      <div className="mb-12 border-b border-[#161310]/15 pb-8">
        <p className="text-xs uppercase tracking-[0.34em] text-[#161310]/45">
          Admin
        </p>

        <h1 className="mt-4 text-6xl font-light tracking-[-0.07em]">
          Categories
        </h1>
      </div>

      <div className="grid gap-12 md:grid-cols-[420px_1fr]">
        <form
          action={createCategory}
          className="border border-[#161310]/15 p-6"
        >
          <h2 className="mb-6 text-2xl font-light tracking-[-0.04em]">
            New category
          </h2>

          <label className="block">
            <span className="mb-3 block text-sm text-[#161310]/55">
              Category name
            </span>

            <input
              name="name"
              required
              placeholder="Table Lamps"
              className="w-full border border-[#161310]/15 bg-transparent px-4 py-4 outline-none"
            />
          </label>

          <button className="mt-6 bg-[#161310] px-6 py-4 text-sm text-[#ecebeb]">
            Create category
          </button>
        </form>

        <div className="grid gap-px border border-[#161310]/15 bg-[#161310]/15">
          {categories.length === 0 ? (
            <div className="bg-[#ecebeb] p-6 text-sm text-[#161310]/50">
              No categories yet.
            </div>
          ) : (
            categories.map((category) => (
              <article
                key={category.id}
                className="flex items-center justify-between bg-[#ecebeb] p-6"
              >
                <div>
                  <h2 className="text-2xl tracking-[-0.04em]">
                    {category.name}
                  </h2>

                  <p className="mt-2 text-sm text-[#161310]/45">
                    /{category.slug} · {category._count.products} products
                  </p>
                </div>

                <form action={deleteCategory.bind(null, category.id)}>
                  <button
                    disabled={category._count.products > 0}
                    className="border border-[#161310]/20 px-4 py-3 text-sm disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    Delete
                  </button>
                </form>
              </article>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
