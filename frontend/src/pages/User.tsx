import { useState } from 'react'
import { Award, CheckCircle, Shield as ShieldIcon, QrCode, Clock, Calendar, Building, Eye, RefreshCw, Trash2, Link as LinkIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useWallet } from '../context/WalletContext'
import { PROGRAM_ID } from '../lib/aleo'
import { Badge, Modal, StatCard } from '../components/ui'

interface Credential {
  id: string
  eventName: string
  issuedAt: string
  issuer: string
  issuerName: string
  status: 'active' | 'expired'
  type: 'event' | 'certification' | 'achievement'
}

const sampleCredentials: Credential[] = [
  { id: 'cred_001', eventName: 'ETH Denver 2024', issuedAt: 'Feb 28, 2024', issuer: 'aleo1ethdenver...xyz', issuerName: 'ETH Denver', status: 'active', type: 'event' },
  { id: 'cred_002', eventName: 'Aleo Developer Summit', issuedAt: 'Mar 15, 2024', issuer: 'aleo1aleosummit...abc', issuerName: 'Aleo Foundation', status: 'active', type: 'event' },
  { id: 'cred_003', eventName: 'ZK Bootcamp Certificate', issuedAt: 'Jan 10, 2024', issuer: 'aleo1zkbootcamp...def', issuerName: 'ZK Academy', status: 'active', type: 'certification' },
  { id: 'cred_004', eventName: 'Hackathon Winner', issuedAt: 'Dec 1, 2023', issuer: 'aleo1hackathon...ghi', issuerName: 'ETH Global', status: 'expired', type: 'achievement' },
]

export default function User() {
  const { account, isConnected } = useWallet()
  const [credentials] = useState<Credential[]>(sampleCredentials)
  const [selectedCredential, setSelectedCredential] = useState<Credential | null>(null)
  const [showQRModal, setShowQRModal] = useState(false)
  const [proofGenerated, setProofGenerated] = useState(false)
  const [generatingProof, setGeneratingProof] = useState<string | null>(null)

  const handleGenerateProof = async (credential: Credential) => {
    if (!isConnected || !account) {
      alert('Please connect your wallet first')
      return
    }

    setGeneratingProof(credential.id)
    
    try {
      console.log('Generating ZK proof on', PROGRAM_ID)
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setSelectedCredential(credential)
      setProofGenerated(true)
      setShowQRModal(true)
    } catch (error: any) {
      console.error('Error generating proof:', error)
      alert(error.message || 'Failed to generate proof')
    } finally {
      setGeneratingProof(null)
    }
  }

  if (!isConnected || !account) {
    return (
      <div className="max-w-4xl mx-auto text-center py-20 animate-fade-in">
        <div className="w-20 h-20 bg-dark-800 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <ShieldIcon className="w-10 h-10 text-dark-500" />
        </div>
        <h2 className="text-2xl font-bold text-dark-100 mb-3">Connect Your Wallet</h2>
        <p className="text-dark-400 mb-8 max-w-md mx-auto">Connect your wallet to view and manage your private verifiable credentials</p>
      </div>
    )
  }

  const activeCredentials = credentials.filter(c => c.status === 'active').length

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-dark-50">My Credentials</h1>
          <p className="text-dark-400 mt-1">View and manage your private verifiable credentials</p>
        </div>
        <div className="flex gap-3">
          <Link to="/transactions" className="btn-secondary flex items-center gap-2">
            <Clock className="w-4 h-4" />
            History
          </Link>
          <Link to="/credentials" className="btn-primary flex items-center gap-2">
            <Award className="w-4 h-4" />
            Professional
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-3 gap-6">
        <StatCard icon={Award} label="Total Credentials" value={credentials.length.toString()} />
        <StatCard icon={CheckCircle} label="Active Credentials" value={activeCredentials.toString()} change="All verified" changeType="positive" />
        <StatCard icon={ShieldIcon} label="Proofs Generated" value="12" change="+3 this week" changeType="positive" />
      </div>

      {/* Credentials Grid */}
      {credentials.length === 0 ? (
        <div className="card-static text-center py-16">
          <Award className="w-16 h-16 text-dark-600 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-dark-100 mb-2">No Credentials Yet</h2>
          <p className="text-dark-400 mb-6 max-w-md mx-auto">
            You haven't received any credentials yet. Attend events or complete activities to earn credentials.
          </p>
          <div className="bg-dark-900 rounded-xl p-6 max-w-md mx-auto text-left">
            <h3 className="text-dark-200 font-semibold mb-4">How to get credentials:</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3 text-dark-300">
                <CheckCircle className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" />
                <span>Attend events and receive credentials from organizers</span>
              </li>
              <li className="flex items-start gap-3 text-dark-300">
                <CheckCircle className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" />
                <span>Participate in DAO activities and earn reputation</span>
              </li>
              <li className="flex items-start gap-3 text-dark-300">
                <CheckCircle className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" />
                <span>Complete professional certifications</span>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {credentials.map((credential) => (
            <div key={credential.id} className={`card group ${credential.status === 'expired' ? 'opacity-75' : ''}`}>
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl ${
                  credential.type === 'event' ? 'bg-primary-900/30 text-primary-400' :
                  credential.type === 'certification' ? 'bg-accent-blue/20 text-accent-blue' :
                  'bg-accent-orange/20 text-accent-orange'
                }`}>
                  {credential.type === 'event' ? <Calendar className="w-6 h-6" /> :
                   credential.type === 'certification' ? <Award className="w-6 h-6" /> :
                   <Award className="w-6 h-6" />}
                </div>
                <div className="flex items-center gap-2">
                  {credential.status === 'active' ? (
                    <Badge variant="success">Active</Badge>
                  ) : (
                    <Badge variant="warning">Expired</Badge>
                  )}
                </div>
              </div>

              <h3 className="text-lg font-semibold text-dark-100 mb-1">{credential.eventName}</h3>
              
              <div className="flex items-center gap-2 text-dark-400 mb-4">
                <Building className="w-4 h-4" />
                <span className="text-sm">{credential.issuerName}</span>
              </div>

              <div className="flex items-center gap-4 text-sm text-dark-500 mb-4">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{credential.issuedAt}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t border-dark-700">
                <button
                  onClick={() => handleGenerateProof(credential)}
                  disabled={generatingProof === credential.id || credential.status === 'expired'}
                  className="btn-primary flex-1 flex items-center justify-center gap-2 py-2"
                >
                  {generatingProof === credential.id ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <QrCode className="w-4 h-4" />
                      Generate Proof
                    </>
                  )}
                </button>
                <button className="btn-ghost flex items-center justify-center gap-2 py-2">
                  <Eye className="w-4 h-4" />
                </button>
                {credential.status === 'expired' && (
                  <button className="btn-secondary flex items-center justify-center gap-2 py-2 px-3">
                    <RefreshCw className="w-4 h-4" />
                  </button>
                )}
                <button className="btn-icon" disabled>
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Composite Proof CTA */}
      <div className="card-highlight">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-dark-100 mb-1">Generate Composite Proof</h3>
            <p className="text-dark-400 text-sm">Combine multiple credentials into a single zero-knowledge proof</p>
          </div>
          <button className="btn-secondary flex items-center gap-2">
            <LinkIcon className="w-4 h-4" />
            Create Composite Proof
          </button>
        </div>
      </div>

      {/* QR Modal */}
      <Modal isOpen={showQRModal} onClose={() => { setShowQRModal(false); setProofGenerated(false); }} title="Zero-Knowledge Proof">
        <div className="text-center">
          {proofGenerated && selectedCredential && (
            <>
              <div className="w-16 h-16 bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-primary-400" />
              </div>
              <h3 className="text-lg font-semibold text-dark-100 mb-2">Proof Generated!</h3>
              <p className="text-dark-400 text-sm mb-6">Share this QR code to verify your credential without revealing details</p>
              
              <div className="bg-white p-6 rounded-xl inline-block mb-6">
                <div className="w-48 h-48 bg-dark-200 rounded-lg flex items-center justify-center">
                  <QrCode className="w-32 h-32 text-dark-800" />
                </div>
              </div>

              <div className="bg-dark-900 rounded-lg p-4 text-left space-y-2 mb-6">
                <div className="flex justify-between">
                  <span className="text-dark-400">Credential</span>
                  <span className="text-dark-200">{selectedCredential.eventName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-dark-400">Issuer</span>
                  <span className="text-dark-200">{selectedCredential.issuerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-dark-400">Proof Type</span>
                  <span className="text-dark-200">Ownership Verification</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="btn-secondary flex-1">Copy Link</button>
                <button className="btn-primary flex-1">Download QR</button>
              </div>
            </>
          )}
        </div>
      </Modal>
    </div>
  )
}
