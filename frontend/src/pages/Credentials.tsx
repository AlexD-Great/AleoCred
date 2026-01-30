import { useState } from 'react'
import { GraduationCap, Briefcase, Award, FileCheck, Calendar, Building, QrCode, RefreshCw, Trash2, Eye } from 'lucide-react'
import { Badge, Modal } from '../components/ui'

interface Credential {
  id: string
  type: 'degree' | 'certification' | 'employment' | 'achievement'
  title: string
  issuer: string
  issuedAt: string
  expiresAt?: string
  status: 'active' | 'expired' | 'revoked'
  verified: boolean
}

const credentials: Credential[] = [
  { id: '1', type: 'degree', title: 'Bachelor of Computer Science', issuer: 'Stanford University', issuedAt: 'May 2022', status: 'active', verified: true },
  { id: '2', type: 'certification', title: 'AWS Solutions Architect', issuer: 'Amazon Web Services', issuedAt: 'Jan 2024', expiresAt: 'Jan 2027', status: 'active', verified: true },
  { id: '3', type: 'employment', title: 'Senior Developer', issuer: 'Tech Corp Inc.', issuedAt: 'Mar 2023', status: 'active', verified: true },
  { id: '4', type: 'certification', title: 'Certified Blockchain Developer', issuer: 'Blockchain Council', issuedAt: 'Jun 2023', expiresAt: 'Jun 2024', status: 'expired', verified: true },
  { id: '5', type: 'achievement', title: 'Hackathon Winner', issuer: 'ETH Global', issuedAt: 'Nov 2023', status: 'active', verified: true },
]

export default function Credentials() {
  const [selectedCredential, setSelectedCredential] = useState<Credential | null>(null)
  const [showQRModal, setShowQRModal] = useState(false)
  const [filter, setFilter] = useState<'all' | 'degree' | 'certification' | 'employment' | 'achievement'>('all')

  const filteredCredentials = credentials.filter(c => filter === 'all' || c.type === filter)

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'degree':
        return <GraduationCap className="w-6 h-6" />
      case 'certification':
        return <Award className="w-6 h-6" />
      case 'employment':
        return <Briefcase className="w-6 h-6" />
      case 'achievement':
        return <FileCheck className="w-6 h-6" />
      default:
        return null
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'degree':
        return 'bg-accent-purple/20 text-accent-purple'
      case 'certification':
        return 'bg-accent-blue/20 text-accent-blue'
      case 'employment':
        return 'bg-primary-900/30 text-primary-400'
      case 'achievement':
        return 'bg-accent-orange/20 text-accent-orange'
      default:
        return 'bg-dark-700 text-dark-400'
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-dark-50">Professional Credentials</h1>
          <p className="text-dark-400 mt-2">Manage your degrees, certifications, and professional achievements</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <FileCheck className="w-4 h-4" />
          Request Credential
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {[
          { key: 'all', label: 'All', count: credentials.length },
          { key: 'degree', label: 'Degrees', count: credentials.filter(c => c.type === 'degree').length },
          { key: 'certification', label: 'Certifications', count: credentials.filter(c => c.type === 'certification').length },
          { key: 'employment', label: 'Employment', count: credentials.filter(c => c.type === 'employment').length },
          { key: 'achievement', label: 'Achievements', count: credentials.filter(c => c.type === 'achievement').length },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key as typeof filter)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              filter === tab.key
                ? 'bg-primary-600 text-white'
                : 'bg-dark-800 text-dark-400 hover:text-dark-200 hover:bg-dark-700'
            }`}
          >
            {tab.label}
            <span className={`px-2 py-0.5 rounded-full text-xs ${
              filter === tab.key ? 'bg-primary-500' : 'bg-dark-700'
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Credentials Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredCredentials.map((credential) => (
          <div
            key={credential.id}
            className={`card group ${credential.status === 'expired' ? 'opacity-75' : ''}`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-xl ${getTypeColor(credential.type)}`}>
                {getTypeIcon(credential.type)}
              </div>
              <div className="flex items-center gap-2">
                {credential.status === 'active' ? (
                  <Badge variant="success">Active</Badge>
                ) : credential.status === 'expired' ? (
                  <Badge variant="warning">Expired</Badge>
                ) : (
                  <Badge variant="danger">Revoked</Badge>
                )}
                {credential.verified && (
                  <Badge variant="primary">Verified</Badge>
                )}
              </div>
            </div>

            <h3 className="text-lg font-semibold text-dark-100 mb-1">{credential.title}</h3>
            
            <div className="flex items-center gap-2 text-dark-400 mb-4">
              <Building className="w-4 h-4" />
              <span>{credential.issuer}</span>
            </div>

            <div className="flex items-center gap-4 text-sm text-dark-500 mb-4">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>Issued: {credential.issuedAt}</span>
              </div>
              {credential.expiresAt && (
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>Expires: {credential.expiresAt}</span>
                </div>
              )}
            </div>

            <div className="flex gap-2 pt-4 border-t border-dark-700">
              <button
                onClick={() => {
                  setSelectedCredential(credential)
                  setShowQRModal(true)
                }}
                className="btn-secondary flex-1 flex items-center justify-center gap-2 py-2"
              >
                <QrCode className="w-4 h-4" />
                Share
              </button>
              <button className="btn-ghost flex items-center justify-center gap-2 py-2">
                <Eye className="w-4 h-4" />
                View
              </button>
              {credential.status === 'expired' && (
                <button className="btn-primary flex items-center justify-center gap-2 py-2">
                  <RefreshCw className="w-4 h-4" />
                  Renew
                </button>
              )}
              <button className="btn-icon" disabled>
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredCredentials.length === 0 && (
        <div className="text-center py-16">
          <FileCheck className="w-16 h-16 text-dark-600 mx-auto mb-4" />
          <p className="text-dark-400">No credentials found in this category</p>
        </div>
      )}

      {/* QR Code Modal */}
      <Modal isOpen={showQRModal} onClose={() => setShowQRModal(false)} title="Share Credential">
        <div className="text-center">
          <div className="bg-white p-6 rounded-xl inline-block mb-6">
            <div className="w-48 h-48 bg-dark-200 rounded-lg flex items-center justify-center">
              <QrCode className="w-32 h-32 text-dark-800" />
            </div>
          </div>
          
          {selectedCredential && (
            <div className="text-left bg-dark-900 rounded-lg p-4 space-y-2 mb-6">
              <div className="flex justify-between">
                <span className="text-dark-400">Credential</span>
                <span className="text-dark-200">{selectedCredential.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-dark-400">Issuer</span>
                <span className="text-dark-200">{selectedCredential.issuer}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-dark-400">Status</span>
                <Badge variant={selectedCredential.status === 'active' ? 'success' : 'warning'}>
                  {selectedCredential.status}
                </Badge>
              </div>
            </div>
          )}

          <p className="text-dark-400 text-sm mb-4">
            Scan this QR code to verify the credential without revealing underlying details
          </p>
          
          <div className="flex gap-3">
            <button className="btn-secondary flex-1">Copy Link</button>
            <button className="btn-primary flex-1">Download QR</button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
