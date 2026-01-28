import { Link } from 'react-router-dom'
import { Shield, Wallet, LogOut } from 'lucide-react'
import { useWallet } from '../context/WalletContext'

export default function Navbar() {
  const { connected, address, connecting, connect, disconnect } = useWallet()

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 8)}...${addr.slice(-6)}`
  }

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

          <div className="flex items-center gap-3">
            {connected && address ? (
              <>
                <div className="hidden sm:flex items-center gap-2 bg-gray-800 px-3 py-2 rounded-lg">
                  <Wallet className="w-4 h-4 text-primary-400" />
                  <span className="text-sm text-gray-300">{formatAddress(address)}</span>
                </div>
                <button 
                  onClick={disconnect}
                  className="btn-secondary flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Disconnect</span>
                </button>
              </>
            ) : (
              <button 
                onClick={connect}
                disabled={connecting}
                className="btn-primary flex items-center gap-2"
              >
                <Wallet className="w-4 h-4" />
                {connecting ? 'Connecting...' : 'Connect Wallet'}
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
