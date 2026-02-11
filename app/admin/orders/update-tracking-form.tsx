"use client";

import { useState, useTransition } from "react";
import { setTrackingNumber } from "./actions";

export default function UpdateTrackingForm({
  orderId,
  adminKey,
  currentTracking,
}: {
  orderId: string;
  adminKey: string;
  currentTracking: string;
}) {
  const [pending, startTransition] = useTransition();
  const [value, setValue] = useState(currentTracking);

  return (
    <form
      action={(fd) => startTransition(() => setTrackingNumber(fd))}
      className=" p-4"
    >
      <div className="text-sm font-medium">Tracking</div>
      <input type="hidden" name="orderId" value={orderId} />
      <input type="hidden" name="adminKey" value={adminKey} />

      <input
        name="trackingNumber"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="e.g. LP123456789CN"
        className="mt-3 w-full border border-black bg-transparent px-3 py-2 text-sm"
      />

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
