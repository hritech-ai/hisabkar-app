"use client";
// app/components/BottomNav.tsx
import Link from "next/link";

type NavTab = "home" | "dues" | "add" | "pro" | "profile";

const tabs: { id: NavTab; label: string; href: string; icon: string }[] = [
  { id: "home",    label: "Home",    href: "/",             icon: "🏠" },
  { id: "dues",    label: "Dues",    href: "/dues",         icon: "📋" },
  { id: "add",     label: "Add",     href: "/add-customer", icon: "➕" },
  { id: "pro",     label: "Pro",     href: "/pro",          icon: "⭐" },
  { id: "profile", label: "Profile", href: "/profile",      icon: "👤" },
];

export default function BottomNav({ active }: { active: NavTab }) {
  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm bg-white border-t border-gray-100 flex justify-around py-2 z-50">
      {tabs.map((tab) => {
        const isActive = tab.id === active;

        // Special "Add" button — pill style
        if (tab.id === "add") {
          return (
            <Link key={tab.id} href={tab.href} className="flex flex-col items-center gap-0.5">
              <span className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-xl -mt-4 border-2 border-white shadow">
                ➕
              </span>
              <span className={`text-[10px] ${isActive ? "text-green-600 font-medium" : "text-gray-400"}`}>
                {tab.label}
              </span>
            </Link>
          );
        }

        return (
          <Link key={tab.id} href={tab.href} className="flex flex-col items-center gap-0.5 px-3 py-1">
            <span className="text-lg leading-none">{tab.icon}</span>
            <span className={`text-[10px] ${isActive ? "text-green-600 font-medium" : "text-gray-400"}`}>
              {tab.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
