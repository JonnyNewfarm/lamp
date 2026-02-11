"use client";

import { useTransition } from "react";
import { setOrderStatus } from "./actions";

export default function UpdateOrderStatusForm({
  orderId,
  adminKey,
  currentStatus,
}: {
  orderId: string;
  adminKey: string;
  currentStatus: string;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <form
      action={(fd) => startTransition(() => setOrderStatus(fd))}
      className=" p-4"
    >
      <div className="text-sm font-medium">Update status</div>

      <input type="hidden" name="orderId" value={orderId} />
      <input type="hidden" name="adminKey" value={adminKey} />

      <select
        name="status"
        defaultValue={currentStatus}
        className="mt-3 w-full border border-black bg-transparent px-3 py-2 text-sm"
      >
        <option value="PAID">PAID</option>
        <option value="ORDERED">ORDERED</option>
        <option value="SHIPPED">SHIPPED</option>
        <option value="REFUNDED">REFUNDED</option>
        <option value="CANCELED">CANCELED</option>
      </select>

      <button
        type="submit"
        disabled={pending}
        className="mt-3 w-full border border-black px-3 py-2 text-sm hover:bg-black hover:text-white transition disabled:opacity-50"
      >
        {pending ? "Saving…" : "Save"}
      </button>
    </form>
  );
}
