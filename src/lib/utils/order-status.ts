export function statusBadgeClass(status: OrderStatus) {
  const map: Record<OrderStatus, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    confirmed: "bg-blue-100 text-blue-800",
    preparing: "bg-purple-100 text-purple-800",
    ready: "bg-indigo-100 text-indigo-800",
    out_for_delivery: "bg-orange-100 text-orange-800",
    delivered: "bg-green-100 text-green-800",
    picked: "bg-green-100 text-green-800",
    completed: "bg-teal-100 text-teal-800",
    cancel_request: "bg-red-100 text-red-800",
    cancelled: "bg-red-100 text-red-800",
    rejected_cancel_request: "bg-gray-100 text-gray-700",
    failed: "bg-gray-100 text-gray-700",
  };
  return map[status] || "bg-gray-100 text-gray-700";
}
