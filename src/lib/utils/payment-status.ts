export function statusBadgeClassForPayment(status: PaymentStatus): string {
  const map: Record<PaymentStatus, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    pending_confirmation: "bg-orange-100 text-orange-800",
    paid: "bg-green-100 text-green-800",
    failed: "bg-red-100 text-red-800",
    cancelled: "bg-gray-100 text-gray-700",
    manual_review: "bg-purple-100 text-purple-800",
    timeout: "bg-gray-200 text-gray-600",
  };

  return map[status] || "bg-gray-100 text-gray-700";
}
