export enum OrderStatusEnum {
  PENDING = "pending",
  CONFIRMED = "confirmed",
  PREPARING = "preparing",
  READY = "ready",
  OUT_FOR_DELIVERY = "out_for_delivery",
  DELIVERED = "delivered",
  PICKED = "picked",
  COMPLETED = "completed",
  CANCEL_REQUEST = "cancel_request",
  CANCELLED = "cancelled",
  REJECTED_CANCEL_REQUEST = "rejected_cancel_request",
  FAILED = "failed",
}

export enum PaymentStatusEnum {
  PENDING = "pending",
  PENDING_CONFIRMATION = "pending_confirmation",
  PAID = "paid",
  FAILED = "failed",
  CANCELLED = "cancelled",
  MANUAL_REVIEW = "manual_review",
  TIMEOUT = "timeout",
}
