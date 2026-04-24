// app/dashboard/page.tsx
// The dashboard is now the home page (/).
// This file redirects so any old links still work.
import { redirect } from "next/navigation";

export default function DashboardPage() {
  redirect("/");
}
