// app/admin/orders/page.tsx
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/formatPrice";
import {
  updateOrderStatus,
  updateOrderTracking,
} from "@/lib/actions/order.actions";

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
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

          <h1 className="mt-4 text-6xl font-light tracking-[-0.07em]">
            Orders
          </h1>
        </div>

        <div className="flex gap-3">
          <Link
            href="/admin/products"
            className="border border-[#161310]/20 px-6 py-4 text-sm"
          >
            Products
          </Link>

          <Link
            href="/admin/categories"
            className="border border-[#161310]/20 px-6 py-4 text-sm"
          >
            Categories
          </Link>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="border border-[#161310]/15 p-8 text-sm text-[#161310]/50">
          No orders yet.
        </div>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => (
            <article
              key={order.id}
              className="border border-[#161310]/15 bg-[#ecebeb]"
            >
              <div className="grid gap-6 border-b border-[#161310]/15 p-6 md:grid-cols-[1fr_180px_180px]">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-[#161310]/40">
                    Order
                  </p>

                  <h2 className="mt-3 text-3xl font-light tracking-[-0.05em]">
                    {order.productName}
                  </h2>

                  <p className="mt-2 text-sm text-[#161310]/50">
                    {order.color ? `Variant: ${order.color}` : "No variant"}
                  </p>

                  <p className="mt-1 text-sm text-[#161310]/40">{order.id}</p>
                </div>

                <div>
                  <p className="text-sm text-[#161310]/45">Amount</p>
                  <p className="mt-2 text-xl">
                    {formatPrice(order.unitAmount, order.currency)}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-[#161310]/45">Status</p>
                  <StatusBadge status={order.status} />
                </div>
              </div>

              <div className="grid gap-px bg-[#161310]/15 md:grid-cols-3">
                <section className="bg-[#ecebeb] p-6">
                  <p className="mb-5 text-sm text-[#161310]/45">Customer</p>

                  <div className="space-y-2 text-sm">
                    <p>{order.customerName || "No name"}</p>
                    <p className="text-[#161310]/55">
                      {order.customerEmail || "No email"}
                    </p>
                  </div>
                </section>

                <section className="bg-[#ecebeb] p-6">
                  <p className="mb-5 text-sm text-[#161310]/45">Shipping</p>

                  <div className="space-y-1 text-sm leading-[1.7]">
                    <p>{order.shipLine1 || "No address"}</p>
                    {order.shipLine2 && <p>{order.shipLine2}</p>}

                    <p>
                      {[order.shipPostalCode, order.shipCity]
                        .filter(Boolean)
                        .join(" ")}
                    </p>

                    <p>
                      {[order.shipState, order.shipCountry]
                        .filter(Boolean)
                        .join(", ")}
                    </p>
                  </div>
                </section>

                <section className="bg-[#ecebeb] p-6">
                  <p className="mb-5 text-sm text-[#161310]/45">Supplier</p>

                  {order.supplierUrl ? (
                    <a
                      href={order.supplierUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="break-all text-sm underline"
                    >
                      Open supplier
                    </a>
                  ) : (
                    <p className="text-sm text-[#161310]/45">No supplier URL</p>
                  )}
                </section>
              </div>

              <div className="grid gap-px bg-[#161310]/15 md:grid-cols-2">
                <section className="bg-[#ecebeb] p-6">
                  <form action={updateOrderStatus.bind(null, order.id)}>
                    <label className="block">
                      <span className="mb-3 block text-sm text-[#161310]/45">
                        Update status
                      </span>

                      <select
                        name="status"
                        defaultValue={order.status}
                        className="w-full border border-[#161310]/15 bg-[#ecebeb] px-4 py-4 text-sm outline-none"
                      >
                        <option value="PAID">Paid</option>
                        <option value="ORDERED">Ordered from supplier</option>
                        <option value="SHIPPED">Shipped</option>
                        <option value="REFUNDED">Refunded</option>
                        <option value="CANCELED">Canceled</option>
                      </select>
                    </label>

                    <button className="mt-4 bg-[#161310] px-6 py-4 text-sm text-[#ecebeb]">
                      Save status
                    </button>
                  </form>
                </section>

                <section className="bg-[#ecebeb] p-6">
                  <form action={updateOrderTracking.bind(null, order.id)}>
                    <label className="block">
                      <span className="mb-3 block text-sm text-[#161310]/45">
                        Tracking number
                      </span>

                      <input
                        name="trackingNumber"
                        defaultValue={order.trackingNumber || ""}
                        placeholder="Tracking number"
                        className="w-full border border-[#161310]/15 bg-transparent px-4 py-4 text-sm outline-none"
                      />
                    </label>

                    <button className="mt-4 border border-[#161310]/20 px-6 py-4 text-sm">
                      Save tracking
                    </button>
                  </form>
                </section>
              </div>

              <div className="border-t border-[#161310]/15 p-6 text-xs leading-[1.7] text-[#161310]/40">
                <p>Stripe session: {order.stripeSessionId}</p>
                {order.stripePaymentId && (
                  <p>Stripe payment: {order.stripePaymentId}</p>
                )}
                <p>
                  Created:{" "}
                  {new Intl.DateTimeFormat("en-US", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  }).format(order.createdAt)}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}

function StatusBadge({ status }: { status: string }) {
  const label =
    status === "ORDERED"
      ? "Ordered"
      : status === "SHIPPED"
        ? "Shipped"
        : status === "REFUNDED"
          ? "Refunded"
          : status === "CANCELED"
            ? "Canceled"
            : "Paid";

  return (
    <div className="mt-2 inline-flex border border-[#161310]/15 px-4 py-2 text-sm">
      {label}
    </div>
  );
}
