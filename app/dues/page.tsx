"use client";
// app/dues/page.tsx
import { useState } from "react";
import { useCustomers } from "../../lib/CustomerContext";
import { Customer } from "../../lib/store";
import CustomerItem from "../components/CustomerItem";
import BottomNav from "../components/BottomNav";

type Filter = "all" | "pending" | "overdue";

const filters: { id: Filter; label: string }[] = [
  { id: "all",     label: "All"     },
  { id: "pending", label: "Pending" },
  { id: "overdue", label: "Overdue" },
];

export default function DuesPage() {
  const { customers, markPaid } = useCustomers();
  const [active, setActive] = useState<Filter>("all");

  const filtered: Customer[] =
    active === "all" ? customers.filter((c) => c.status !== "paid") : customers.filter((c) => c.status === active);

  const total = filtered.reduce((s, c) => s + c.amount, 0);

  return (
    <div className="pb-24">
      {/* Header */}
      <div className="p-4 border-b border-gray-100 bg-white">
        <h1 className="text-lg font-semibold text-gray-900">Dues & Payments</h1>
        {filtered.length > 0 && (
          <p className="text-xs text-gray-400 mt-0.5">
            {filtered.length} customer{filtered.length > 1 ? "s" : ""} · ₹{total.toLocaleString("en-IN")} outstanding
          </p>
        )}
      </div>

      {/* Filter tabs */}
      <div className="px-4 pt-3 pb-1 flex gap-2">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setActive(f.id)}
            className={`flex-1 text-xs py-1.5 rounded-lg border transition-colors ${
              active === f.id
                ? "bg-green-600 text-white border-green-600"
                : "bg-white text-gray-500 border-gray-200"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="px-4 pt-3 flex flex-col gap-2.5">
        {filtered.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-3xl mb-2">🎉</p>
            <p className="text-sm text-gray-500">No {active === "all" ? "outstanding" : active} payments!</p>
          </div>
        ) : (
          filtered.map((c) => (
            <CustomerItem key={c.id} customer={c} showActions onMarkPaid={markPaid} />
          ))
        )}
      </div>

      <BottomNav active="dues" />
    </div>
  );
}
