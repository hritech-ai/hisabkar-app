"use client";
// app/page.tsx
import { useCustomers } from "../lib/CustomerContext";
import StatCard from "./components/StatCard";
import CustomerItem from "./components/CustomerItem";
import BottomNav from "./components/BottomNav";

export default function Home() {
  const { customers, markPaid } = useCustomers();

  const total     = customers.length;
  const paidCount = customers.filter((c) => c.status === "paid").length;
  const collected = customers.filter((c) => c.status === "paid").reduce((s, c) => s + c.amount, 0);
  const pending   = customers.filter((c) => c.status !== "paid").reduce((s, c) => s + c.amount, 0);
  const overdue   = customers.filter((c) => c.status === "overdue").reduce((s, c) => s + c.amount, 0);
  const pct       = total ? Math.round((paidCount / total) * 100) : 0;

  const recent = [...customers].slice(-3).reverse();

  return (
    <div className="pb-24 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-xs text-gray-400">April 2026</p>
          <h1 className="text-xl font-semibold text-gray-900">Namaste, Ramesh 👋</h1>
        </div>
        <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center text-sm font-medium text-green-800">
          R
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-2.5 mb-4">
        <StatCard title="Total Customers" value={total} />
        <StatCard title="Collected"        value={`₹${collected.toLocaleString("en-IN")}`} variant="success" />
        <StatCard title="Pending"          value={`₹${pending.toLocaleString("en-IN")}`}   variant="warning" />
        <StatCard title="Overdue"          value={`₹${overdue.toLocaleString("en-IN")}`}   variant="danger"  />
      </div>

      {/* Progress bar */}
      <div className="bg-white border border-gray-100 rounded-2xl p-4 mb-4">
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm font-medium text-gray-700">Monthly Collection</p>
          <p className="text-sm font-semibold text-green-600">{pct}%</p>
        </div>
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-500 rounded-full transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="text-xs text-gray-400 mt-1.5">{paidCount} of {total} customers paid</p>
      </div>

      {/* Recent activity */}
      <div className="flex justify-between items-center mb-2.5">
        <h2 className="text-sm font-semibold text-gray-700">Recent Activity</h2>
        <a href="/dues" className="text-xs text-green-600">See all →</a>
      </div>
      <div className="flex flex-col gap-2">
        {recent.map((c) => (
          <CustomerItem key={c.id} customer={c} showActions={false} onMarkPaid={markPaid} />
        ))}
      </div>

      <BottomNav active="home" />
    </div>
  );
}
