import { Link } from "react-router-dom"

function Navbar() {
    return (
        <nav className="bg-blue-500 p-4">
            <div className="container mx-auto">
                <ul className="flex space-x-4">
                    <li><Link to="/" className="text-white hover:text-gray-200">Dashboard</Link></li>
                    <li><Link to="/room-service" className="text-white hover:text-gray-200">Room Service</Link></li>
                    <li><Link to="/housekeeping" className="text-white hover:text-gray-200">Housekeeping</Link></li>
                    <li><Link to="/amenities" className="text-white hover:text-gray-200">Amenities</Link></li>
                    <li><Link to="/request" className="text-white hover:text-gray-200">Request History</Link></li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar