"use client";
// app/profile/page.tsx
import { useCustomers } from "../../lib/CustomerContext";
import BottomNav from "../components/BottomNav";
import Link from "next/link";

export default function ProfilePage() {
  const { customers } = useCustomers();
  const collected = customers
    .filter((c) => c.status === "paid")
    .reduce((s, c) => s + c.amount, 0);

  return (
    <div className="pb-24">
      <div className="p-4 border-b border-gray-100 bg-white">
        <h1 className="text-lg font-semibold text-gray-900">Profile</h1>
      </div>

      <div className="p-4 flex flex-col gap-3">
        {/* Vendor card */}
        <div className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center text-xl font-semibold text-green-800">
            R
          </div>
          <div>
            <p className="text-base font-semibold text-gray-900">Ramesh Sharma</p>
            <p className="text-xs text-gray-400">+91 98765 43210</p>
            <span className="mt-1 inline-block text-[10px] bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
              Free Plan
            </span>
          </div>
        </div>

        {/* This month stats */}
        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4">
          <p className="text-xs text-gray-400 mb-2">This month</p>
          <div className="flex justify-between">
            <div className="text-center">
              <p className="text-lg font-semibold text-gray-900">{customers.length}</p>
              <p className="text-xs text-gray-400">Customers</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-green-700">₹{collected.toLocaleString("en-IN")}</p>
              <p className="text-xs text-gray-400">Collected</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-gray-900">
                {customers.filter((c) => c.status !== "paid").length}
              </p>
              <p className="text-xs text-gray-400">Pending</p>
            </div>
          </div>
        </div>

        {/* Settings list */}
        <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
          {[
            { label: "Upgrade to Pro", href: "/pro",     right: "→", accent: true  },
            { label: "Payment Settings (Razorpay)", href: "#", right: "→" },
            { label: "WhatsApp Reminders",           href: "#", right: <Toggle on /> },
            { label: "Notification Preferences",     href: "#", right: "→" },
            { label: "Help & Support",               href: "#", right: "→" },
          ].map((item, i, arr) => (
            <Link
              key={item.label}
              href={item.href}
              className={`flex justify-between items-center px-4 py-3.5 text-sm ${
                i < arr.length - 1 ? "border-b border-gray-50" : ""
              } ${item.accent ? "text-green-700 font-medium" : "text-gray-700"} hover:bg-gray-50`}
            >
              <span>{item.label}</span>
              <span className="text-gray-400 text-xs">{item.right}</span>
            </Link>
          ))}
        </div>
      </div>

      <BottomNav active="profile" />
    </div>
  );
}

function Toggle({ on }: { on: boolean }) {
  return (
    <div className={`w-9 h-5 rounded-full relative ${on ? "bg-green-500" : "bg-gray-200"}`}>
      <div className={`w-3.5 h-3.5 bg-white rounded-full absolute top-0.5 transition-all ${on ? "right-0.5" : "left-0.5"}`} />
    </div>
  );
}
