import React from 'react'

export default function AdminDashboard() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow border">
          <p className="text-gray-500 text-sm">Total Bookings</p>
          <p className="text-2xl font-bold">1,248</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border">
          <p className="text-gray-500 text-sm">Occupancy</p>
          <p className="text-2xl font-bold">87%</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border">
          <p className="text-gray-500 text-sm">Pending Requests</p>
          <p className="text-2xl font-bold">23</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow border">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          View All Requests
        </button>
      </div>
    </div>
  );
}