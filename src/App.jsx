import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AdminDashboard from './pages/AdminDashboard'
import BookingCalendar from './pages/BookingCalendar'
import ReportsPage from './pages/ReportsPage'
import RequestTracker from './pages/RequestTracker'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/calendar" element={<BookingCalendar />} />
        <Route path="/admin/reports" element={<ReportsPage />} />
        <Route path="/admin/requests" element={<RequestTracker />} />
      </Routes>
    </BrowserRouter>
  )
}