import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Organizer from './pages/Organizer'
import User from './pages/User'
import Navbar from './components/Navbar'
import { WalletProvider } from './context/WalletContext'

function App() {
  return (
    <WalletProvider>
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
    </WalletProvider>
  )
}

export default App
