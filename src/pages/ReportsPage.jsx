import { useEffect, useState } from "react"
import API from "../services/api.js"

export default function Reports() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    API.getAllBookings().then(setBookings)
    .finally(() => setLoading(false))
  }, [])

  const total = bookings.length
  const thisMonth = bookings.filter(b => b.check_in.startsWith('2026-06')).length
  if (loading) return <p className="p-6">Loading reports...</p>
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Reports</h1>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow border p-6">
          <p className="text-gray-500 text-sm">Total Bookings</p>
          <p className="text-3xl font-bold">{total}</p>
        </div>
        <div className="bg-white rounded-lg shadow border p-6">
          <p className="text-gray-500 text-sm">This Month</p>
          <p className="text-3xl font-bold">{thisMonth}</p>
        </div>
        
      </div>
    </div>
  )
}