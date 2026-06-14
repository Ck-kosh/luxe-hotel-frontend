
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './index.css';
import './App.css';


import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Booking from "./pages/Booking";
import HotelDetails from "./pages/HotelDetails";
import AddProduct from "./pages/AddProduct";
import RoomService from "./pages/RoomService";
import Housekeeping from "./pages/Housekeeping";
import Amenities from "./pages/Amenities";
import RequestHistory from "./pages/RequestHistory";
import ContactUs from "./pages/ContactUs";
import BookingCalendar from "./pages/BookingCalendar";
import AdminDashboard from "./pages/AdminDashboard";
import ReportsPage from "./pages/ReportsPage";
import RequestTracker from "./pages/RequestTracker";
import Login from "./pages/login";
import Signup from "./pages/Signup";


function App() {
  return (
    <BrowserRouter>
      <>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/hotel-details" element={<HotelDetails />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/room-service" element={<RoomService />} />
          <Route path="/housekeeping" element={<Housekeeping />} />
          <Route path="/amenities" element={<Amenities />} />
          <Route path="/requests" element={<RequestHistory />} />
          <Route path="/request" element={<RequestHistory />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/bookings" element={<BookingCalendar />} />
          <Route path="/admin/reports" element={<ReportsPage />} />
          <Route path="/admin/requests" element={<RequestTracker />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;
