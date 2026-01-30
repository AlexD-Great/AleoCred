import { useState } from 'react'
import { Wallet, ChevronDown, Copy, ExternalLink, LogOut, Check } from 'lucide-react'
import { useWallet } from '../context/WalletContext'

export default function WalletButton() {
  const { account, isConnected, isConnecting, connect, disconnect } = useWallet()
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleConnect = async () => {
    try {
      await connect('Leo Wallet')
    } catch (error) {
      console.error('Failed to connect:', error)
    }
  }

  const handleCopy = () => {
    if (account?.address) {
      navigator.clipboard.writeText(account.address)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  if (!isConnected || !account) {
    return (
      <button
        onClick={handleConnect}
        disabled={isConnecting}
        className="flex items-center gap-2 bg-primary-600 hover:bg-primary-500 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-glow disabled:opacity-50"
      >
        <Wallet className="w-4 h-4" />
        {isConnecting ? 'Connecting...' : 'Connect Wallet'}
      </button>
    )
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-dark-800 hover:bg-dark-700 border border-dark-600 text-dark-100 font-medium py-2.5 px-4 rounded-lg transition-all duration-200"
      >
        <div className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
        <span>{formatAddress(account.address)}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-72 bg-dark-800 border border-dark-700 rounded-xl shadow-xl z-50 animate-fade-in overflow-hidden">
            <div className="p-4 border-b border-dark-700">
              <p className="text-sm text-dark-400 mb-1">Connected Wallet</p>
              <p className="text-dark-100 font-mono text-sm break-all">{account.address}</p>
            </div>
            
            <div className="p-2">
              <button
                onClick={handleCopy}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-dark-300 hover:text-dark-100 hover:bg-dark-700 rounded-lg transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-primary-500" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied!' : 'Copy Address'}</span>
              </button>
              
              <a
                href={`https://explorer.aleo.org/address/${account.address}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center gap-3 px-3 py-2.5 text-dark-300 hover:text-dark-100 hover:bg-dark-700 rounded-lg transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>View on Explorer</span>
              </a>
              
              <div className="border-t border-dark-700 my-2" />
              
              <button
                onClick={() => {
                  disconnect()
                  setIsOpen(false)
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-red-400 hover:text-red-300 hover:bg-dark-700 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Disconnect</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
