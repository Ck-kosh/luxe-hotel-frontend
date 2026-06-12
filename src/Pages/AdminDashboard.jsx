import Navbar from '../components/Navbar'
import StatStatCard from '../components/StatCard'

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />
      <div className="p-6">
        <h1 className="text-3xl font-bold text-[#1E2438] mb-6">Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Total Bookings" value="342" />
        </div>
      </div>
    </div>
  )
}