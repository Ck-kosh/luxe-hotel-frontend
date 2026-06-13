import React, { useState } from 'react'

export default function BookingCalendar() {
  const [bookings] = useState([
    { id: 1, guest: 'John Doe', room: 'Deluxe 201', checkIn: '2026-04-15', checkOut: '2026-04-18' },
    { id: 2, guest: 'Sarah Kim', room: 'Suite 305', checkIn: '2026-04-16', checkOut: '2026-04-20' },
  ])

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Booking Calendar</h1>

      <div className="bg-white rounded-lg shadow border overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Guest</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Room</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Check In</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Check Out</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {bookings.map(b => (
              <tr key={b.id}>
                <td className="px-6 py-4">{b.guest}</td>
                <td className="px-6 py-4">{b.room}</td>
                <td className="px-6 py-4">{b.checkIn}</td>
                <td className="px-6 py-4">{b.checkOut}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Confirmed</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}