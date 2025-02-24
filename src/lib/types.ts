export interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  role: "user" | "admin"
  createdAt: string
  updatedAt: string
  UnitId: number
}

export interface Facility {
  id: number
  name: string
  sport: string
  location: string
  availability: boolean
  image: string
}

export interface Unit {
  id: number
  name: string
  blacklisted: boolean
  type: "department" | "faculty" | "hostel" | "management"
}

export interface Reservation {
  id: number
  purpose: string
  startTime: string
  endTime: string
  status: "pending" | "approved" | "denied"
  createdAt: string
  updatedAt: string
  UserId: number
  FacilityId: number
  UnitId: number
  User?: User
  Facility?: Facility
  Unit?: Unit
}

export interface AuthResponse {
  accessToken: string
  facilities?: Facility[]
  pendingReservations?: Reservation[]
  user: User
}

