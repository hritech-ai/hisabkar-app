// lib/store.ts
// Central in-memory store — replace with Supabase calls later

export type Status = "paid" | "pending" | "overdue";
export type ServiceType = "Milk" | "Newspaper" | "Tutor" | "Other";

export interface Customer {
  id: number;
  name: string;
  phone: string;
  service: ServiceType;
  amount: number;
  status: Status;
  dueDay: number;
}

export const SERVICE_ICONS: Record<ServiceType, string> = {
  Milk: "🥛",
  Newspaper: "📰",
  Tutor: "📚",
  Other: "🔧",
};

export const STATUS_LABELS: Record<Status, string> = {
  paid: "Paid",
  pending: "Pending",
  overdue: "Overdue",
};

// Seed data — swap for DB fetch in production
export const seedCustomers: Customer[] = [
  { id: 1, name: "Amit Kumar",   phone: "9876543210", service: "Milk",      amount: 500,  status: "paid",    dueDay: 5  },
  { id: 2, name: "Rohit Singh",  phone: "9812345678", service: "Newspaper", amount: 300,  status: "pending", dueDay: 1  },
  { id: 3, name: "Suresh Yadav", phone: "9898989898", service: "Milk",      amount: 800,  status: "overdue", dueDay: 1  },
  { id: 4, name: "Priya Verma",  phone: "9123456789", service: "Tutor",     amount: 1500, status: "paid",    dueDay: 10 },
  { id: 5, name: "Deepak Joshi", phone: "9234567890", service: "Newspaper", amount: 250,  status: "pending", dueDay: 5  },
];
