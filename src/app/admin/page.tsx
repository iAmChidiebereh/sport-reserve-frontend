"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ReservationList from "@/components/reservations/reservation-list"
import type { Reservation } from "@/lib/types"
import { BASE_URL } from "@/config/constants"

export default function AdminDashboard() {
  const router = useRouter()
  const [pendingReservations, setPendingReservations] = useState<Reservation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token")
    const user = JSON.parse(localStorage.getItem("user") || "{}")

    if (!token || user.role !== "admin") {
      router.push("/")
      return
    }

    fetchPendingReservations()
  }, [router])

  const fetchPendingReservations = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`${BASE_URL}/reservations?status=pending`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.msg)
      setPendingReservations(data)
    } catch (error) {
      console.error("Error fetching reservations:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async (id: number) => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`${BASE_URL}/reservations/status/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: "approved" }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.msg)
      }

      fetchPendingReservations()
    } catch (error) {
      console.error("Error approving reservation:", error)
    }
  }

  const handleDeny = async (id: number) => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`${BASE_URL}/reservations/status/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: "denied" }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.msg)
      }

      fetchPendingReservations()
    } catch (error) {
      console.error("Error denying reservation:", error)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    router.push("/")
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">SportReserve Admin</h1>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="pending" className="w-full">
          <TabsList>
            <TabsTrigger value="pending">Pending Reservations</TabsTrigger>
          </TabsList>
          <TabsContent value="pending">
            <ReservationList
              reservations={pendingReservations}
              showActions
              onApprove={handleApprove}
              onDeny={handleDeny}
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

