import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Reservation } from "@/lib/types"
import { STATUS_COLORS } from "@/config/constants"

interface ReservationListProps {
  reservations: Reservation[]
  showActions?: boolean
  onApprove?: (id: number) => void
  onDeny?: (id: number) => void
  onDelete?: (id: number) => void
  onStatusChange?: (status: string) => void
  selectedStatus?: string
}

export default function ReservationList({
  reservations,
  showActions = false,
  onApprove,
  onDeny,
  onDelete,
  onStatusChange,
  selectedStatus,
}: ReservationListProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Reservations</CardTitle>
        {onStatusChange && (
          <Select value={selectedStatus} onValueChange={onStatusChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="denied">Denied</SelectItem>
            </SelectContent>
          </Select>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {reservations.map((reservation) => (
            <Card key={reservation.id} className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{reservation.purpose}</h3>
                  <p className="text-sm text-muted-foreground">
                    {new Date(reservation.startTime).toLocaleString()} -{" "}
                    {new Date(reservation.endTime).toLocaleString()}
                  </p>
                  {reservation.User && (
                    <p className="text-sm">
                      Reserved by: {reservation.User.firstName} {reservation.User.lastName}
                    </p>
                  )}
                  {reservation.Facility && <p className="text-sm">Facility: {reservation.Facility.name}</p>}
                  <span className={`inline-block px-2 py-1 rounded text-xs mt-2 ${STATUS_COLORS[reservation.status]}`}>
                    {reservation.status}
                  </span>
                </div>
                {showActions && (
                  <div className="flex gap-2">
                    {reservation.status === "pending" && onApprove && onDeny && (
                      <>
                        <Button size="sm" variant="outline" onClick={() => onApprove(reservation.id)}>
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => onDeny(reservation.id)}
                        >
                          Deny
                        </Button>
                      </>
                    )}
                    {onDelete && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600 hover:text-red-700"
                        onClick={() => onDelete(reservation.id)}
                      >
                        Delete
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </Card>
          ))}
          {reservations.length === 0 && <p className="text-center text-muted-foreground">No reservations found.</p>}
        </div>
      </CardContent>
    </Card>
  )
}

