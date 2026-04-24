"use client";
// app/add-customer/page.tsx
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCustomers } from "../../lib/CustomerContext";
import { ServiceType, SERVICE_ICONS } from "../../lib/store";
import BottomNav from "../components/BottomNav";

const services: ServiceType[] = ["Milk", "Newspaper", "Tutor", "Other"];
const dueDays  = [1, 5, 10, 15, 20, 25];

export default function AddCustomerPage() {
  const router = useRouter();
  const { addCustomer } = useCustomers();

  const [name,    setName]    = useState("");
  const [phone,   setPhone]   = useState("");
  const [service, setService] = useState<ServiceType>("Milk");
  const [amount,  setAmount]  = useState("");
  const [dueDay,  setDueDay]  = useState(1);
  const [saved,   setSaved]   = useState(false);
  const [errors,  setErrors]  = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim())          e.name   = "Name is required";
    if (!/^\d{10}$/.test(phone)) e.phone = "Enter a valid 10-digit number";
    if (!amount || Number(amount) <= 0) e.amount = "Enter a valid amount";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    addCustomer({ name: name.trim(), phone, service, amount: Number(amount), dueDay });
    setSaved(true);
    setName(""); setPhone(""); setAmount(""); setDueDay(1);
    setTimeout(() => { setSaved(false); router.push("/"); }, 1500);
  };

  return (
    <div className="pb-24">
      {/* Header */}
      <div className="p-4 border-b border-gray-100 bg-white">
        <h1 className="text-lg font-semibold text-gray-900">Add Customer</h1>
      </div>

      <div className="p-4 flex flex-col gap-4">
        {/* Name */}
        <div>
          <label className="text-xs text-gray-500 mb-1 block">Customer Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Suresh Kumar"
            className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:border-green-400"
          />
          {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
        </div>

        {/* Phone */}
        <div>
          <label className="text-xs text-gray-500 mb-1 block">Phone Number</label>
          <div className="flex gap-2">
            <span className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-500 bg-gray-50">+91</span>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="9876543210"
              maxLength={10}
              className="flex-1 border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:border-green-400"
            />
          </div>
          {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
        </div>

        {/* Service type */}
        <div>
          <label className="text-xs text-gray-500 mb-1.5 block">Service Type</label>
          <div className="grid grid-cols-4 gap-2">
            {services.map((s) => (
              <button
                key={s}
                onClick={() => setService(s)}
                className={`flex flex-col items-center gap-1 py-2.5 rounded-xl border text-xs transition-colors ${
                  service === s
                    ? "bg-green-50 border-green-300 text-green-800"
                    : "bg-white border-gray-200 text-gray-500"
                }`}
              >
                <span className="text-xl">{SERVICE_ICONS[s]}</span>
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Amount */}
        <div>
          <label className="text-xs text-gray-500 mb-1 block">Monthly Amount</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">₹</span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="500"
              className="w-full border border-gray-200 rounded-xl pl-7 pr-3 py-2.5 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:border-green-400"
            />
          </div>
          {errors.amount && <p className="text-xs text-red-500 mt-1">{errors.amount}</p>}
        </div>

        {/* Due day */}
        <div>
          <label className="text-xs text-gray-500 mb-1.5 block">Due Date (day of month)</label>
          <div className="flex gap-2 flex-wrap">
            {dueDays.map((d) => (
              <button
                key={d}
                onClick={() => setDueDay(d)}
                className={`w-12 py-2 rounded-xl text-sm border transition-colors ${
                  dueDay === d
                    ? "bg-green-600 text-white border-green-600"
                    : "bg-white text-gray-500 border-gray-200"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Success toast */}
        {saved && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-3">
            <p className="text-sm font-medium text-green-800">✅ Customer saved!</p>
            <p className="text-xs text-green-600">Reminder will go out on the {dueDay}th each month.</p>
          </div>
        )}

        {/* Submit */}
        <button
          onClick={handleSave}
          disabled={saved}
          className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-300 text-white py-3 rounded-xl text-sm font-semibold transition-colors"
        >
          {saved ? "Saving..." : "Save Customer"}
        </button>
      </div>

      <BottomNav active="add" />
    </div>
  );
}
