export const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/v1"

export const UNIT_TYPES = ["department", "faculty", "hostel", "management"] as const

export const RESERVATION_STATUS = {
  PENDING: "pending",
  APPROVED: "approved",
  DENIED: "denied",
} as const

export const STATUS_COLORS = {
  [RESERVATION_STATUS.PENDING]: "bg-yellow-100 text-yellow-800",
  [RESERVATION_STATUS.APPROVED]: "bg-green-100 text-green-800",
  [RESERVATION_STATUS.DENIED]: "bg-red-100 text-red-800",
} as const

