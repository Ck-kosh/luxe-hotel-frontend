import Navbar from '../components/Navbar'
import DataTable from '../components/DataTable'
import RevenueChart from '../components/RevenueChart'

export default function ReportsPage() {
  const data = [
    { date: '2026-04-10', revenue: 'Ksh 45,000', bookings: 12 },
    { date: '2026-04-11', revenue: 'Ksh 52,000', bookings: 15 }
  ]
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />
      <div className="p-6">
        <h1 className="text-3xl font-bold text-[#1E293B] mb-6">Reports</h1>
        <RevenueChart />
        <div className="mt-8">
          <DataTable columns={['Date', 'Revenue', 'Bookings']} data={data} />
        </div>
      </div>
    </div>
  )
}