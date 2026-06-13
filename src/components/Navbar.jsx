import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="bg-blue-500 p-4 shadow-md">
      <div className="container mx-auto">
        <ul className="flex flex-wrap items-center gap-6">
          <li>
            <Link to="/" className="text-white hover:text-gray-200 font-medium">
              Home
            </Link>
          </li>
          
          <li>
            <Link to="/hotel-details" className="text-white hover:text-gray-200 font-medium">
              Hotel Details
            </Link>
          </li>

          <li>
            <Link to="/contact-us" className="text-white hover:text-gray-200 font-medium">
              ContactUs
            </Link>
          </li>
         


          {/* Admin Dropdown */}
          <li className="relative group">
            <Link 
              to="/admin" 
              className="text-white hover:text-gray-200 font-medium flex items-center gap-1"
            >
              Admin 

            </Link>
            
            {/* Dropdown menu */}
            <ul className="absolute left-0 top-full mt-2 w-44 bg-blue-600 rounded-lg shadow-lg py-2 
                          opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                          transition-all duration-200 z-50">
              <li>
                <Link 
                  to="/admin" 
                  className="block px-4 py-2 text-white hover:bg-blue-700 hover:text-gray-100"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link 
                  to="/admin/bookings" 
                  className="block px-4 py-2 text-white hover:bg-blue-700 hover:text-gray-100"
                >
                  Bookings
                </Link>
              </li>
              <li>
                <Link 
                  to="/admin/reports" 
                  className="block px-4 py-2 text-white hover:bg-blue-700 hover:text-gray-100"
                >
                  Reports
                </Link>
              </li>
              <li>
                <Link 
                  to="/admin/requests" 
                  className="block px-4 py-2 text-white hover:bg-blue-700 hover:text-gray-100"
                >
                  Requests
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  )
}