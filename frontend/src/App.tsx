import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { WalletProvider } from '@demox-labs/aleo-wallet-adapter-react'
import { WalletModalProvider } from '@demox-labs/aleo-wallet-adapter-reactui'
import { LeoWalletAdapter } from '@demox-labs/aleo-wallet-adapter-leo'
import { WalletAdapterNetwork } from '@demox-labs/aleo-wallet-adapter-base'
import { useMemo } from 'react'
import Home from './pages/Home'
import Organizer from './pages/Organizer'
import User from './pages/User'
import Navbar from './components/Navbar'

import '@demox-labs/aleo-wallet-adapter-reactui/styles.css'

function App() {
  const wallets = useMemo(
    () => [
      new LeoWalletAdapter({
        appName: 'AleoCred',
      }),
    ],
    []
  )

  return (
    <WalletProvider
      wallets={wallets}
      network={WalletAdapterNetwork.Testnet}
      autoConnect
    >
      <WalletModalProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <Navbar />
            <main className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/organizer" element={<Organizer />} />
                <Route path="/user" element={<User />} />
              </Routes>
            </main>
          </div>
        </Router>
      </WalletModalProvider>
    </WalletProvider>
  )
}

export default App
