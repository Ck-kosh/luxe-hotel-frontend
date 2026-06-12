import { Link } from 'react link-router-dom'

export default function Navbar() {
  const links = [
    { name: 'Dashboard', path: '/admin' },
    { name: 'Calendar', path: '/admin/calendar' },
    { name: 'Reports', path: '/admin/reports' },
    { name: 'Requests', path: '/admin/requests' }
  ]
  
  return (
    <nav className="bg-[#0D9488] text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="font-bold text-xl">GuestEase Admin</span>
          </div>
          <div className="hidden md:flex space-x-6 items-center">
            {links.map(link => (
              <Link key={link.path} to={link.path} 
                className="hover:text-[#F59E8B] transition font-medium">
                {link.name}
              </Link>
            ))}
            <button className="bg-[#F59E0B] px-4 py-2 rounded-lg hover:opacity-90">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  ) 
}