import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logOut } from "../services/auth";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ total_bookings: 0, pending_requests: 0, occupancy: 0 });
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const API_URL = "http://localhost:8000";

  useEffect(() => {
    fetchStats();
    fetchBookings();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch(`${API_URL}/bookings/admin/stats`);
      const data = await res.json();
      setStats(data);
    } catch (err) {
      console.error("Stats error:", err);
    }
  };

  const fetchBookings = async () => {
    try {
      const res = await fetch(`${API_URL}/bookings/bookings`);
      const data = await res.json();
      setBookings(data);
      setLoading(false);
    } catch (err) {
      console.error("Bookings error:", err);
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logOut();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <button 
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Total Bookings</p>
          <p className="text-4xl font-bold text-blue-600 mt-2">{stats.total_bookings}</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Occupancy Rate</p>
          <p className="text-4xl font-bold text-green-600 mt-2">{stats.occupancy}%</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Pending Requests</p>
          <p className="text-4xl font-bold text-orange-600 mt-2">{stats.pending_requests}</p>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-800">Recent Bookings</h2>
        </div>
        
        {loading ? (
          <p className="p-6 text-gray-500">Loading...</p>
        ) : bookings.length === 0 ? (
          <p className="p-6 text-gray-500">No bookings yet</p>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Guest Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Room</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Check In</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Check Out</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {bookings.map((b) => (
                <tr key={b.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{b.id}</td>
                  <td className="px-6 py-4 font-medium">{b.guest_name}</td>
                  <td className="px-6 py-4">{b.room_number}</td>
                  <td className="px-6 py-4">{new Date(b.check_in).toLocaleDateString()}</td>
                  <td className="px-6 py-4">{new Date(b.check_out).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      b.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                      b.status === 'checked_in' ? 'bg-green-100 text-green-800' : 
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {b.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}