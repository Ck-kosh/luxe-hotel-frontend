import Navbar from '../components/Navbar'
import DataTable from '../components/DataTable'

export default function RequestTracker() {
  const requests = [
    { id: 1, room: '101', request: 'Extra towels', status: 'Pending' },
    { id: 2, room: '205', request: 'Room service', status: 'Completed' }
  ]
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />
      <div className="p-6">
        <h1 className="text-3xl font-bold text-[#1E293B] mb-6">Service Requests</h1>
        <DataTable columns={['ID', 'Room', 'Request', 'Status']} data={requests} />
      </div>
    </div>
  )
}