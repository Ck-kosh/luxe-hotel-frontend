import { useEffect, useState } from "react"
import { getBookings, addBooking } from "../services/api.js"

export default function BookingCalendar() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getBookings()
      .then(data => {
        setBookings(data)
        setLoading(false)
      })
      .catch(err => {
        console.error("Failed to load:", err)
        setLoading(false)
      })
  }, [])

  if (loading) return <p className="p-6">Loading bookings...</p>

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Booking Calendar</h1>
      
      <div className="bg-white rounded-lg shadow border overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Guest</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Check In</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Check Out</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {bookings.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">No bookings yet. Add one!</td>
              </tr>
            ) : (
              bookings.map(b => (
                <tr key={b.id}>
                  <td className="px-6 py-4">{b.guest_name}</td>
                  <td className="px-6 py-4">{b.room_number}</td>
                  <td className="px-6 py-4">{b.check_in}</td>
                  <td className="px-6 py-4">{b.check_out}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Confirmed</span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}