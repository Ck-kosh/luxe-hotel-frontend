import Navbar from '../components/Navbar'

export default function BookingCalendar() {
  const bookings = [
    { room: '101', guest: 'Jane Doe', dates: 'Apr 10-12' },
    { room: '205', guest: 'John Smith', dates: 'Apr 11-15' }
  ]
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />
      <div className="p-6">
        <h1 className="text-3xl font-bold text-[#1E293B] mb-6">Booking Calendar</h1>
        <div className="bg-white rounded-xl shadow p-6">
          {bookings.map(b => (
            <div key={b.room} className="border-l-4 border-[#F59E0B] p-4 mb-3 bg-amber-50">
              <p className="font-bold">Room {b.room} - {b.guest}</p>
              <p className="text-sm text-gray-600">{b.dates}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}