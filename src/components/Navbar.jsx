import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="bg-blue-500 p-4">
            <div className="container mx-auto">
                <ul className="flex flex-wrap gap-4">
                    <li><Link to="/" className="text-white hover:text-gray-200">Home</Link></li>
                    {/* <li><Link to="/dashboard" className="text-white hover:text-gray-200">Dashboard</Link></li> */}
                    {/* <li><Link to="/booking" className="text-white hover:text-gray-200">Booking</Link></li> */}
                    <li><Link to="/hotel-details" className="text-white hover:text-gray-200">Hotel Details</Link></li>
                    {/* <li><Link to="/room-service" className="text-white hover:text-gray-200">Room Service</Link></li>
                    <li><Link to="/housekeeping" className="text-white hover:text-gray-200">Housekeeping</Link></li>
                    <li><Link to="/amenities" className="text-white hover:text-gray-200">Amenities</Link></li>  */}
                    <li><Link to="/contact-us" className="text-white hover:text-gray-200">ContactUs</Link></li>
                    {/* <li><Link to="/add-product" className="text-white hover:text-gray-200">Add Product</Link></li> */}
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
