import React, { useState, useEffect } from 'react'

export default function RequestTracker() {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:8000/admin/requests')
      .then(res => res.json())
      .then(data => setRequests(data))
      .catch(err => console.error('Failed to fetch requests:', err))
      .finally(() => setLoading(false))
  }, [])

  const getStatusColor = (status) => {
    if (status === 'Pending') return 'bg-yellow-100 text-yellow-800'
    if (status === 'In Progress') return 'bg-blue-100 text-blue-800'
    return 'bg-green-100 text-green-800'
  }

  const updateStatus = async (id, newStatus) => {
    try {
      await fetch(`http://localhost:8000/admin/requests/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      })

      setRequests(reqs => 
        reqs.map(r => r.id === id ? { ...r, status: newStatus } : r)
      )
    } catch (err) {
      alert('Failed to update status')
      console.error(err)
    }
  }

  if (loading) return <p className="p-6">Loading requests...</p>

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Request Tracker</h1>

      <div className="space-y-3">
        {requests.length === 0 ? (
          <p className="text-gray-500">No requests yet</p>
        ) : (
          requests.map(req => (
            <div key={req.id} className="bg-white p-4 rounded-lg shadow border flex justify-between items-center">
              <div>
                <p className="font-semibold">{req.type} - Room {req.room}</p>
                <p className="text-sm text-gray-500">{req.time}</p>
              </div>
              
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(req.status)}`}>
                  {req.status}
                </span>
                
                {req.status !== 'Completed' && (
                  <button 
                    onClick={() => updateStatus(req.id, 'Completed')}
                    className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    Mark Complete
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}