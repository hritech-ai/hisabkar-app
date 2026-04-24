"use client";
// app/pro/page.tsx
import { useCustomers } from "../../lib/CustomerContext";
import BottomNav from "../components/BottomNav";

const FREE_LIMIT = 50;

export default function ProPage() {
  const { customers } = useCustomers();
  const used = customers.length;
  const pct  = Math.min(Math.round((used / FREE_LIMIT) * 100), 100);

  return (
    <div className="pb-24">
      <div className="p-4 border-b border-gray-100 bg-white">
        <h1 className="text-lg font-semibold text-gray-900">HisabKar Pro</h1>
      </div>

      <div className="p-4 flex flex-col gap-4">
        {/* Usage card */}
        <div className="bg-green-50 border border-green-200 rounded-2xl p-4 text-center">
          <p className="text-3xl mb-2">🚀</p>
          <h2 className="text-base font-semibold text-green-900">You are on Free Plan</h2>
          <p className="text-xs text-green-700 mt-0.5">{used}/{FREE_LIMIT} customers used</p>
          <div className="mt-3 h-2 bg-green-200 rounded-full overflow-hidden">
            <div className="h-full bg-green-600 rounded-full transition-all" style={{ width: `${pct}%` }} />
          </div>
          {pct >= 80 && (
            <p className="text-xs text-red-600 mt-2 font-medium">⚠️ Almost at limit — upgrade soon!</p>
          )}
        </div>

        {/* Pro plan card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-4">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-base font-semibold text-gray-900">Pro Plan</p>
              <p className="text-xs text-gray-400">For growing vendors</p>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-green-700">₹49</p>
              <p className="text-xs text-gray-400">per month</p>
            </div>
          </div>

          <ul className="flex flex-col gap-2 mb-4">
            {[
              "Unlimited customers",
              "Auto WhatsApp reminders each month",
              "Razorpay payment link generation",
              "Monthly collection report (PDF)",
              "Mark paid via webhook — automatic",
              "Priority support",
            ].map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                <span className="text-green-500">✓</span> {f}
              </li>
            ))}
          </ul>

          <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl text-sm font-semibold transition-colors">
            Upgrade to Pro — ₹49/mo
          </button>
          <p className="text-center text-xs text-gray-400 mt-2">Cancel anytime · No hidden charges</p>
        </div>
      </div>

      <BottomNav active="pro" />
    </div>
  );
}
