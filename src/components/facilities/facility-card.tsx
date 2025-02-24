import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Facility } from "@/lib/types"

interface FacilityCardProps {
  facility: Facility
  onReserve: (facility: Facility) => void
  onViewReservations: (facility: Facility) => void
}

export default function FacilityCard({ facility, onReserve, onViewReservations }: FacilityCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-48">
        <Image src={facility.image || "/placeholder.svg"} alt={facility.name} fill className="object-cover" />
      </div>
      <CardHeader>
        <CardTitle className="text-lg">{facility.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">Sport: {facility.sport}</p>
        <p className="text-sm text-muted-foreground">Location: {facility.location}</p>
        <p className={`text-sm mt-2 ${facility.availability ? "text-green-600" : "text-red-600"}`}>
          {facility.availability ? "Available" : "Not Available"}
        </p>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="outline" className="flex-1" onClick={() => onViewReservations(facility)}>
          View Reservations
        </Button>
        <Button className="flex-1" onClick={() => onReserve(facility)} disabled={!facility.availability}>
          Reserve
        </Button>
      </CardFooter>
    </Card>
  )
}

