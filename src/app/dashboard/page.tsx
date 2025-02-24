"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import FacilityCard from "@/components/facilities/facility-card"
import ReservationForm from "@/components/reservations/reservation-form"
import ReservationList from "@/components/reservations/reservation-list"
import type { Facility, Reservation } from "@/lib/types"
import { BASE_URL } from "@/config/constants"

export default function Dashboard() {
  const router = useRouter()
  const [facilities, setFacilities] = useState<Facility[]>([])
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null)
  const [showReservationForm, setShowReservationForm] = useState(false)
  const [showReservations, setShowReservations] = useState(false)
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [selectedStatus, setSelectedStatus] = useState("all")

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/")
      return
    }

    fetchFacilities()
  }, [router])

  const fetchFacilities = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`${BASE_URL}/facilities`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.msg)
      setFacilities(data)
    } catch (error) {
      console.error("Error fetching facilities:", error)
    }
  }

  const fetchReservations = async (facilityId: number) => {
    try {
      const token = localStorage.getItem("token")
      const user = JSON.parse(localStorage.getItem("user") || "{}")
      const status = selectedStatus !== "all" ? `&status=${selectedStatus}` : ""
      const url = `${BASE_URL}/reservations?facilityId=${facilityId}&userId=${user.id}${status}`

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.msg)
      setReservations(data)
    } catch (error) {
      console.error("Error fetching reservations:", error)
    }
  }

  const handleReserve = (facility: Facility) => {
    setSelectedFacility(facility)
    setShowReservationForm(true)
    setShowReservations(false)
  }

  const handleViewReservations = (facility: Facility) => {
    setSelectedFacility(facility)
    setShowReservations(true)
    setShowReservationForm(false)
    fetchReservations(facility.id)
  }

  const handleStatusChange = (status: string) => {
    setSelectedStatus(status)
    if (selectedFacility) {
      fetchReservations(selectedFacility.id)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">SportReserve</h1>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showReservationForm && selectedFacility ? (
          <div className="mb-8">
            <Button variant="outline" onClick={() => setShowReservationForm(false)} className="mb-4">
              Back to Facilities
            </Button>
            <ReservationForm
              facility={selectedFacility}
              onSuccess={() => {
                setShowReservationForm(false)
                fetchFacilities()
              }}
              onCancel={() => setShowReservationForm(false)}
            />
          </div>
        ) : showReservations && selectedFacility ? (
          <div className="mb-8">
            <Button variant="outline" onClick={() => setShowReservations(false)} className="mb-4">
              Back to Facilities
            </Button>
            <ReservationList
              reservations={reservations}
              onStatusChange={handleStatusChange}
              selectedStatus={selectedStatus}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilities.map((facility) => (
              <FacilityCard
                key={facility.id}
                facility={facility}
                onReserve={handleReserve}
                onViewReservations={handleViewReservations}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

