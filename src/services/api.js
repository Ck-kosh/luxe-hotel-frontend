const API_URL = "http://localhost:8000";

const request = async (url, options = {}) => {
  const res = await fetch(`${API_URL}${url}`, {
    headers: { "Content-Type": "application/json" },
    ...options
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return await res.json();
};

const API = {
  get: (url) => request(url),
  post: (url, data) => request(url, { method: "POST", body: JSON.stringify(data) }),
  patch: (url, data) => request(url, { method: "PATCH", body: JSON.stringify(data) }),

  createBooking: (data) => request("/bookings/bookings", { method: "POST", body: JSON.stringify(data) }),
  getAllBookings: () => request("/bookings/bookings"),
  getAdminStats: () => request("/bookings/admin/stats"),

  createServiceRequest: (data) => request("/service-requests/", { method: "POST", body: JSON.stringify(data) }),
  getAllServiceRequests: () => request("/service-requests/"),
};

export default API;