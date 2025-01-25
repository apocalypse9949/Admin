import { cn } from "@/lib/utils"

interface StatusBadgeProps {
  status: "Active" | "Publish" | "Draft" | "Inactive"
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        status === "Active" && "bg-orange-100 text-orange-800",
        status === "Publish" && "bg-orange-100 text-orange-800",
        status === "Draft" && "bg-gray-100 text-gray-800",
        status === "Inactive" && "bg-red-100 text-red-800",
        className,
      )}
    >
      {status}
    </span>
  )
}

