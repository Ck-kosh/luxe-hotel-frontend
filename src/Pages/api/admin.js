const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

export async function getAdminStats() {
  const res = await fetch(`${BASE_URL}/admin/stats`)
  if (!res.ok) throw new Error('Stats fetch failed')
  return res.json()
}

export async function getBookings() {
  const res = await fetch(`${BASE_URL}/admin/bookings`)
  return res.json()
}