import React from 'react'

export default function ReportsPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Reports</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border">
          <h2 className="text-xl font-semibold mb-2">Booking Report</h2>
          <p className="text-gray-600 mb-4">Export booking data for selected dates</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Download CSV
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border">
          <h2 className="text-xl font-semibold mb-2">Occupancy Report</h2>
          <p className="text-gray-600 mb-4">View room occupancy trends</p>
          <button className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">
            View Details
          </button>
        </div>
      </div>
    </div>
  )
}