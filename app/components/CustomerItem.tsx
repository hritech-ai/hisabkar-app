"use client";
// app/components/CustomerItem.tsx
import { Customer, SERVICE_ICONS, STATUS_LABELS } from "../../lib/store";

const statusBadge: Record<Customer["status"], string> = {
  paid:    "bg-green-100 text-green-800",
  pending: "bg-amber-100 text-amber-800",
  overdue: "bg-red-100  text-red-800",
};

interface CustomerItemProps {
  customer: Customer;
  showActions?: boolean;
  onMarkPaid?: (id: number) => void;
}

export default function CustomerItem({ customer, showActions, onMarkPaid }: CustomerItemProps) {
  const { id, name, phone, service, amount, status, dueDay } = customer;

  const sendReminder = () => {
    const msg = `Hi ${name}! Your ${service} payment of ₹${amount} is due on the ${dueDay}th. Pay here 👉 razorpay.me/hisabkar`;
    alert(`WhatsApp reminder sent to ${phone}:\n\n"${msg}"`);
  };

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{SERVICE_ICONS[service]}</span>
          <div>
            <p className="text-sm font-medium text-gray-900">{name}</p>
            <p className="text-xs text-gray-400">{phone} · Due {dueDay}th</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm font-semibold text-gray-900">₹{amount}</p>
          <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${statusBadge[status]}`}>
            {STATUS_LABELS[status]}
          </span>
        </div>
      </div>

      {showActions && status !== "paid" && (
        <div className="flex gap-2 mt-3">
          <button
            onClick={sendReminder}
            className="flex-1 text-xs py-1.5 rounded-lg bg-green-50 text-green-700 border border-green-200 hover:bg-green-100 transition-colors"
          >
            📲 Send Reminder
          </button>
          {onMarkPaid && (
            <button
              onClick={() => onMarkPaid(id)}
              className="flex-1 text-xs py-1.5 rounded-lg bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100 transition-colors"
            >
              ✅ Mark Paid
            </button>
          )}
        </div>
      )}
    </div>
  );
}
