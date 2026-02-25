import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import UpdateOrderStatusForm from "./update-orders-status-form";
import UpdateTrackingForm from "./update-tracking-form";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string }>;
}) {
  const { key } = await searchParams;

  if (!key || key !== process.env.ADMIN_KEY) {
    redirect("/?admin=denied");
  }

  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
  });

  console.log("Order scalar fields:", Object.keys(prisma.order.fields ?? {}));

  return (
    <main className="min-h-screen  bg-[#ecebeb] text-[#161310]">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <h1 className="text-3xl font-semibold">Orders</h1>
        <p className="mt-2 text-[#3a3734]">
          {orders.length} orders (latest first)
        </p>

        <div className="mt-8 space-y-4 ">
          {orders.map((o) => (
            <div key={o.id} className="border border-black p-5">
              <div className="flex p-20 flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="text-sm text-[#3a3734]">
                    {new Date(o.createdAt).toLocaleString()}
                  </div>
                  <div className="mt-2 text-xl font-medium">
                    {o.productName}
                  </div>
                  <div className="mt-1 text-sm text-[#3a3734]">
                    {o.currency.toUpperCase()} {(o.unitAmount / 100).toFixed(2)}
                  </div>

                  <div className="mt-3 text-sm">
                    <div>
                      <span className="text-[#3a3734]">Status:</span>{" "}
                      <span className="font-medium">{o.status}</span>
                    </div>
                    <div className="mt-1">
                      <span className="text-[#3a3734]">Color:</span>{" "}
                      <span className="font-medium uppercase">
                        {o.color ?? "-"}
                      </span>
                    </div>
                    <div className="mt-1">
                      <span className="text-[#3a3734]">Email:</span>{" "}
                      {o.customerEmail ?? "-"}
                    </div>
                    <div className="mt-1">
                      <span className="text-[#3a3734]">Name:</span>{" "}
                      {o.customerName ?? "-"}
                    </div>
                  </div>

                  <div className="mt-3 text-sm">
                    <div className="text-[#3a3734]">Shipping</div>
                    <div>
                      {o.shipLine1 ?? ""} {o.shipLine2 ?? ""}
                    </div>
                    <div>
                      {o.shipPostalCode ?? ""} {o.shipCity ?? ""}{" "}
                      {o.shipState ? `(${o.shipState})` : ""}
                    </div>
                    <div>{o.shipCountry ?? ""}</div>
                  </div>

                  {o.supplierUrl && (
                    <div className="mt-3 text-sm">
                      <span className="text-[#3a3734]">Supplier:</span>{" "}
                      <a
                        className="underline"
                        href={o.supplierUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        AliExpress link
                      </a>
                    </div>
                  )}

                  <div className="mt-3 text-sm">
                    <span className="text-[#3a3734]">Tracking:</span>{" "}
                    {o.trackingNumber ?? "-"}
                  </div>
                </div>

                <div className="w-full sm:w-[320px] space-y-3">
                  <UpdateOrderStatusForm
                    orderId={o.id}
                    adminKey={key}
                    currentStatus={o.status}
                  />{" "}
                  <UpdateTrackingForm
                    orderId={o.id}
                    adminKey={key}
                    currentTracking={o.trackingNumber ?? ""}
                  />
                </div>
              </div>
            </div>
          ))}
          {orders.length === 0 && (
            <div className="border border-black p-6">No orders yet.</div>
          )}
        </div>
      </div>
    </main>
  );
}
