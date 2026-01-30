import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Organizer from './pages/Organizer'
import User from './pages/User'
import Verify from './pages/Verify'
import BatchIssue from './pages/BatchIssue'
import Analytics from './pages/Analytics'
import Settings from './pages/Settings'
import Reputation from './pages/Reputation'
import Transactions from './pages/Transactions'
import Credentials from './pages/Credentials'
import Navbar from './components/Navbar'
import { WalletProvider } from './context/WalletContext'

function App() {
  return (
    <WalletProvider>
      <Router>
        <div className="min-h-screen">
          <Navbar />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/organizer" element={<Organizer />} />
              <Route path="/user" element={<User />} />
              <Route path="/verify" element={<Verify />} />
              <Route path="/batch-issue" element={<BatchIssue />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/reputation" element={<Reputation />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/credentials" element={<Credentials />} />
            </Routes>
          </main>
        </div>
      </Router>
    </WalletProvider>
  )
}

export default App
