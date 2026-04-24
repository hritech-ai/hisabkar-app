"use client";
// lib/CustomerContext.tsx
// Wrap the app in this provider so all pages share one customer list.
// In production: replace useState seed with a useEffect that fetches from Supabase.

import { createContext, useContext, useState, ReactNode } from "react";
import { Customer, seedCustomers } from "./store";

interface CustomerContextValue {
  customers: Customer[];
  addCustomer: (c: Omit<Customer, "id" | "status">) => void;
  markPaid: (id: number) => void;
}

const CustomerContext = createContext<CustomerContextValue | null>(null);

export function CustomerProvider({ children }: { children: ReactNode }) {
  const [customers, setCustomers] = useState<Customer[]>(seedCustomers);

  const addCustomer = (data: Omit<Customer, "id" | "status">) => {
    setCustomers((prev) => [
      ...prev,
      { ...data, id: Date.now(), status: "pending" },
    ]);
  };

  const markPaid = (id: number) => {
    setCustomers((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: "paid" } : c))
    );
  };

  return (
    <CustomerContext.Provider value={{ customers, addCustomer, markPaid }}>
      {children}
    </CustomerContext.Provider>
  );
}

export function useCustomers() {
  const ctx = useContext(CustomerContext);
  if (!ctx) throw new Error("useCustomers must be used inside CustomerProvider");
  return ctx;
}
