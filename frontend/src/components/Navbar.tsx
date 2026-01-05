import { Link } from 'react-router-dom'
import { Shield } from 'lucide-react'

export default function Navbar() {
  return (
    <nav className="bg-gray-900 border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2">
              <Shield className="w-8 h-8 text-primary-500" />
              <span className="text-xl font-bold text-white">AleoCred</span>
            </Link>
            
            <div className="hidden md:flex space-x-4">
              <Link
                to="/"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Home
              </Link>
              <Link
                to="/organizer"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Organizer
              </Link>
              <Link
                to="/user"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                My Credentials
              </Link>
            </div>
          </div>

          <div className="flex items-center">
            <button className="btn-primary">
              Connect Wallet
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
