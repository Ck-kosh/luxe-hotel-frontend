const BASE_URL = "http://localhost:8000";

export const getBookings = async () => {
  const res = await fetch(`${BASE_URL}/admin/bookings`);
  return res.json();
};

export const addBooking = async (booking) => {
  const res = await fetch(`${BASE_URL}/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(booking)
  });
  return res.json();
};

export const updateBooking = async (id, data) => {
  const res = await fetch(`${BASE_URL}/bookings/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
};

export const deleteBooking = async (id) => {
  await fetch(`${BASE_URL}/bookings/${id}`, { method: "DELETE" });
};

export const getAdminStats = async () => {
  const res = await fetch(`${BASE_URL}/admin/stats`);
  return res.json();
};

export const getRequests = async () => {
  const res = await fetch(`${BASE_URL}/requests`);
  return res.json();
};

export const getReports = async () => {
  const res = await fetch(`${BASE_URL}/reports`);
  return res.json();
};

export default { getBookings, addBooking, updateBooking, deleteBooking, getAdminStats, getRequests, getReports }
