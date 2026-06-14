import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 shadow">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Luxe Hotel</Link>
        
        <ul className="flex gap-6 items-center">
          <li>
            <Link to="/" className="hover:text-gray-200">Home</Link>
          </li>
           <li>
            <Link to="/hotel-details" className="hover:text-gray-200">Hotel Details</Link>
          </li>
          {/* <li>
            <Link to="/book" className="hover:text-gray-200">Book Room</Link>
          </li> */}
          <li>
            <Link to="/contact-us" className="hover:text-gray-200">Contact Us</Link>
          </li>
          
          <li className="relative group">
            <Link 
              to="/admin" 
              className="hover:text-gray-200 font-medium flex items-center gap-1"
            >
              Admin
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Link>
            

            <ul className="absolute left-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <li>
                <Link to="/admin" className="block px-4 py-2 hover:bg-gray-100 rounded-t-lg">Dashboard</Link>
              </li>
              <li>
                <Link to="/admin/bookings" className="block px-4 py-2 hover:bg-gray-100">Bookings</Link>
              </li>
              <li>
                <Link to="/admin/reports" className="block px-4 py-2 hover:bg-gray-100">Reports</Link>
              </li>
              <li>
                <Link to="/admin/requests" className="block px-4 py-2 hover:bg-gray-100 rounded-b-lg">Requests</Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  )
}