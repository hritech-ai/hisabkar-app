// app/components/StatCard.tsx
type Variant = "default" | "success" | "danger" | "warning";

interface StatCardProps {
  title: string;
  value: string | number;
  variant?: Variant;
}

const variantStyles: Record<Variant, string> = {
  default:  "bg-white border-gray-100 text-gray-900",
  success:  "bg-green-50 border-green-200 text-green-900",
  danger:   "bg-red-50  border-red-200  text-red-900",
  warning:  "bg-amber-50 border-amber-200 text-amber-900",
};

const labelStyles: Record<Variant, string> = {
  default: "text-gray-400",
  success: "text-green-600",
  danger:  "text-red-500",
  warning: "text-amber-600",
};

export default function StatCard({ title, value, variant = "default" }: StatCardProps) {
  return (
    <div className={`rounded-2xl border p-4 ${variantStyles[variant]}`}>
      <p className={`text-xs mb-1 ${labelStyles[variant]}`}>{title}</p>
      <h2 className="text-2xl font-semibold">{value}</h2>
    </div>
  );
}
