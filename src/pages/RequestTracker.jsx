import React, { useState } from 'react'

export default function RequestTracker() {
  const [requests] = useState([
    { id: 1, type: 'Room Service', room: '203', status: 'Pending', time: '10:30 AM' },
    { id: 2, type: 'Housekeeping', room: '305', status: 'In Progress', time: '09:15 AM' },
    { id: 3, type: 'Maintenance', room: '112', status: 'Completed', time: '08:00 AM' },
  ])

  const getStatusColor = (status) => {
    if (status === 'Pending') return 'bg-yellow-100 text-yellow-800'
    if (status === 'In Progress') return 'bg-blue-100 text-blue-800'
    return 'bg-green-100 text-green-800'
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Request Tracker</h1>

      <div className="space-y-3">
        {requests.map(req => (
          <div key={req.id} className="bg-white p-4 rounded-lg shadow border flex justify-between items-center">
            <div>
              <p className="font-semibold">{req.type} - Room {req.room}</p>
              <p className="text-sm text-gray-500">{req.time}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(req.status)}`}>
              {req.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}