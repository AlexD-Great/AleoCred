import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown, BarChart3, Settings, Wallet } from 'lucide-react'
import WalletButton from './WalletButton'

const navItems = [
  { label: 'Dashboard', path: '/' },
  { label: 'My Credentials', path: '/user' },
  { label: 'Issue', path: '/organizer', children: [
    { label: 'Single Issue', path: '/organizer' },
    { label: 'Batch Issue', path: '/batch-issue' },
  ]},
  { label: 'Verify', path: '/verify' },
  { label: 'Reputation', path: '/reputation' },
  { label: 'Professional', path: '/credentials' },
]

export default function Navbar() {
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  const isActive = (path: string) => location.pathname === path

  return (
    <nav className="bg-dark-900/80 backdrop-blur-md border-b border-dark-800 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-glow">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L20 6V12C20 17 16 21 12 22C8 21 4 17 4 12V6L12 2Z" />
                  <path d="M9 12L11 14L15 10" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold text-dark-50">Aleo</span>
              <span className="text-xl font-bold text-primary-400">Cred</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              item.children ? (
                <div key={item.label} className="relative">
                  <button
                    onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                    className={`nav-link flex items-center gap-1 ${isActive(item.path) ? 'nav-link-active' : ''}`}
                  >
                    {item.label}
                    <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === item.label ? 'rotate-180' : ''}`} />
                  </button>
                  {openDropdown === item.label && (
                    <>
                      <div className="fixed inset-0 z-30" onClick={() => setOpenDropdown(null)} />
                      <div className="absolute top-full left-0 mt-1 w-48 bg-dark-800 border border-dark-700 rounded-lg shadow-xl z-40 py-1 animate-fade-in">
                        {item.children.map((child) => (
                          <Link
                            key={child.path}
                            to={child.path}
                            onClick={() => setOpenDropdown(null)}
                            className="block px-4 py-2 text-sm text-dark-300 hover:text-dark-100 hover:bg-dark-700"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-link ${isActive(item.path) ? 'nav-link-active' : ''}`}
                >
                  {item.label}
                </Link>
              )
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* Wallet Balance Indicator */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-dark-800 rounded-lg border border-dark-700">
              <Wallet className="w-4 h-4 text-primary-400" />
              <span className="text-sm font-medium text-dark-200">1,234.56 ALEO</span>
            </div>

            {/* Quick Actions */}
            <div className="hidden md:flex items-center gap-1">
              <Link to="/analytics" className="btn-icon">
                <BarChart3 className="w-5 h-5" />
              </Link>
              <Link to="/settings" className="btn-icon">
                <Settings className="w-5 h-5" />
              </Link>
            </div>

            {/* Wallet Button */}
            <WalletButton />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden btn-icon"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-dark-900 border-t border-dark-800 animate-fade-in">
          <div className="px-4 py-4 space-y-1">
            {navItems.map((item) => (
              item.children ? (
                <div key={item.label}>
                  <button
                    onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                    className="w-full flex items-center justify-between px-3 py-2 text-dark-300 hover:text-dark-100 rounded-lg"
                  >
                    {item.label}
                    <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === item.label ? 'rotate-180' : ''}`} />
                  </button>
                  {openDropdown === item.label && (
                    <div className="ml-4 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.path}
                          to={child.path}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block px-3 py-2 text-sm text-dark-400 hover:text-dark-200 rounded-lg"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-lg ${
                    isActive(item.path) ? 'bg-primary-900/20 text-primary-400' : 'text-dark-300 hover:text-dark-100'
                  }`}
                >
                  {item.label}
                </Link>
              )
            ))}
            <div className="border-t border-dark-800 pt-4 mt-4 flex gap-2">
              <Link to="/analytics" className="btn-secondary flex-1 flex items-center justify-center gap-2">
                <BarChart3 className="w-4 h-4" /> Analytics
              </Link>
              <Link to="/settings" className="btn-secondary flex-1 flex items-center justify-center gap-2">
                <Settings className="w-4 h-4" /> Settings
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
