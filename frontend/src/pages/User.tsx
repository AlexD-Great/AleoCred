import { useState } from 'react'
import { useWallet } from '@demox-labs/aleo-wallet-adapter-react'
import { Award, CheckCircle, Shield as ShieldIcon } from 'lucide-react'

interface Credential {
  id: string
  eventName: string
  issuedAt: string
  issuer: string
}

export default function User() {
  const { publicKey } = useWallet()
  const [credentials] = useState<Credential[]>([
    // Mock data for demonstration
  ])
  const [selectedCredential, setSelectedCredential] = useState<string | null>(null)
  const [proofGenerated, setProofGenerated] = useState(false)

  const handleGenerateProof = async (credentialId: string) => {
    setSelectedCredential(credentialId)
    
    // TODO: Call Leo program to generate ZK proof
    console.log('Generating proof for credential:', credentialId)
    
    setTimeout(() => {
      setProofGenerated(true)
      setTimeout(() => setProofGenerated(false), 3000)
    }, 1000)
  }

  if (!publicKey) {
    return (
      <div className="max-w-4xl mx-auto text-center py-16">
        <ShieldIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Connect Your Wallet</h2>
        <p className="text-gray-400">Please connect your wallet to view your credentials</p>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">My Credentials</h1>
        <p className="text-gray-400">View and manage your private verifiable credentials</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Total Credentials"
          value={credentials.length.toString()}
          icon={<Award className="w-6 h-6" />}
        />
        <StatCard
          title="Events Attended"
          value={credentials.length.toString()}
          icon={<CheckCircle className="w-6 h-6" />}
        />
        <StatCard
          title="Proofs Generated"
          value="0"
          icon={<ShieldIcon className="w-6 h-6" />}
        />
      </div>

      {credentials.length === 0 ? (
        <div className="card text-center py-16">
          <Award className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">No Credentials Yet</h2>
          <p className="text-gray-400 mb-6">
            You haven't received any credentials yet. Attend events or complete activities to earn credentials.
          </p>
          <div className="bg-gray-700 rounded-lg p-6 max-w-md mx-auto text-left">
            <h3 className="text-white font-semibold mb-3">How to get credentials:</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                <span>Attend events and receive credentials from organizers</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                <span>Participate in DAO activities and earn reputation</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                <span>Complete professional certifications</span>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {credentials.map((credential) => (
            <div key={credential.id} className="card">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{credential.eventName}</h3>
                  <p className="text-sm text-gray-400">Issued: {credential.issuedAt}</p>
                  <p className="text-sm text-gray-400">By: {credential.issuer.slice(0, 20)}...</p>
                </div>
                <Award className="w-8 h-8 text-primary-500" />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleGenerateProof(credential.id)}
                  className="btn-primary flex-1"
                >
                  Generate Proof
                </button>
                <button className="btn-secondary">
                  View Details
                </button>
              </div>

              {selectedCredential === credential.id && proofGenerated && (
                <div className="mt-4 bg-green-900/30 border border-green-700 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-green-400">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-semibold">Proof Generated Successfully!</span>
                  </div>
                  <p className="text-sm text-gray-300 mt-2">
                    Your zero-knowledge proof has been created. Share it to verify your credential without revealing details.
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function StatCard({ title, value, icon }: { title: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-400 mb-1">{title}</p>
          <p className="text-3xl font-bold text-white">{value}</p>
        </div>
        <div className="text-primary-500">{icon}</div>
      </div>
    </div>
  )
}
