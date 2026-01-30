import { useState } from 'react'
import { Upload, FileSpreadsheet, Users, CheckCircle, AlertCircle, Trash2, Send } from 'lucide-react'
import { Modal, Badge } from '../components/ui'

interface Recipient {
  address: string
  name: string
  email: string
  status: 'pending' | 'valid' | 'invalid'
}

const sampleRecipients: Recipient[] = [
  { address: 'aleo1qnr4dkkvkgfqph...8wq9', name: 'Alice Johnson', email: 'alice@example.com', status: 'valid' },
  { address: 'aleo1xyz789abc123...def4', name: 'Bob Smith', email: 'bob@example.com', status: 'valid' },
  { address: 'aleo1mno456pqr789...stu0', name: 'Carol White', email: 'carol@example.com', status: 'valid' },
  { address: 'invalid_address', name: 'Dave Brown', email: 'dave@example.com', status: 'invalid' },
  { address: 'aleo1ghi012jkl345...vwx6', name: 'Eve Davis', email: 'eve@example.com', status: 'valid' },
]

export default function BatchIssue() {
  const [recipients, setRecipients] = useState<Recipient[]>([])
  const [selectedEvent, setSelectedEvent] = useState('')
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleFileUpload = () => {
    // Simulate CSV upload
    setRecipients(sampleRecipients)
  }

  const handleRemoveRecipient = (index: number) => {
    setRecipients(recipients.filter((_, i) => i !== index))
  }

  const validCount = recipients.filter(r => r.status === 'valid').length
  const invalidCount = recipients.filter(r => r.status === 'invalid').length

  const handleBatchIssue = () => {
    setIsProcessing(true)
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false)
      setShowConfirmModal(false)
      setRecipients([])
    }, 2000)
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-dark-50">Batch Issue Credentials</h1>
        <p className="text-dark-400 mt-2">Issue credentials to multiple recipients at once via CSV upload</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Upload Section */}
        <div className="lg:col-span-1 space-y-6">
          <div className="card-static">
            <h2 className="text-lg font-semibold text-dark-100 mb-4">Upload Recipients</h2>
            
            <div
              onClick={handleFileUpload}
              className="border-2 border-dashed border-dark-600 rounded-xl p-8 text-center cursor-pointer hover:border-primary-500/50 hover:bg-dark-800/50 transition-all"
            >
              <Upload className="w-12 h-12 text-dark-500 mx-auto mb-4" />
              <p className="text-dark-300 font-medium">Drop CSV file here</p>
              <p className="text-dark-500 text-sm mt-1">or click to browse</p>
            </div>

            <div className="mt-4 p-3 bg-dark-900 rounded-lg">
              <p className="text-sm text-dark-400 mb-2">Expected CSV format:</p>
              <code className="text-xs text-primary-400 font-mono">address,name,email</code>
            </div>
          </div>

          <div className="card-static">
            <h2 className="text-lg font-semibold text-dark-100 mb-4">Select Event</h2>
            <select
              value={selectedEvent}
              onChange={(e) => setSelectedEvent(e.target.value)}
              className="input"
            >
              <option value="">Choose an event...</option>
              <option value="eth-denver">ETH Denver 2024</option>
              <option value="aleo-summit">Aleo Developer Summit</option>
              <option value="zk-workshop">ZK Workshop Series</option>
            </select>
          </div>

          {recipients.length > 0 && (
            <div className="card-static">
              <h2 className="text-lg font-semibold text-dark-100 mb-4">Summary</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-dark-400">Total Recipients</span>
                  <span className="text-dark-100 font-semibold">{recipients.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-dark-400">Valid Addresses</span>
                  <span className="text-primary-400 font-semibold">{validCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-dark-400">Invalid Addresses</span>
                  <span className="text-red-400 font-semibold">{invalidCount}</span>
                </div>
                <div className="divider" />
                <div className="flex items-center justify-between">
                  <span className="text-dark-400">Est. Fee</span>
                  <span className="text-dark-100 font-semibold">{(validCount * 0.001).toFixed(4)} ALEO</span>
                </div>
              </div>

              <button
                onClick={() => setShowConfirmModal(true)}
                disabled={validCount === 0 || !selectedEvent}
                className="btn-primary w-full mt-6 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Issue {validCount} Credentials
              </button>
            </div>
          )}
        </div>

        {/* Recipients Table */}
        <div className="lg:col-span-2">
          <div className="card-static">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-dark-100">Recipients Preview</h2>
              {recipients.length > 0 && (
                <button
                  onClick={() => setRecipients([])}
                  className="btn-ghost text-sm text-red-400 hover:text-red-300"
                >
                  Clear All
                </button>
              )}
            </div>

            {recipients.length === 0 ? (
              <div className="text-center py-16">
                <FileSpreadsheet className="w-16 h-16 text-dark-600 mx-auto mb-4" />
                <p className="text-dark-400">Upload a CSV file to preview recipients</p>
              </div>
            ) : (
              <div className="table-container">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Wallet Address</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Status</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {recipients.map((recipient, index) => (
                      <tr key={index}>
                        <td className="font-mono text-sm">{recipient.address}</td>
                        <td>{recipient.name}</td>
                        <td className="text-dark-400">{recipient.email}</td>
                        <td>
                          {recipient.status === 'valid' ? (
                            <Badge variant="success">
                              <CheckCircle className="w-3 h-3 mr-1" /> Valid
                            </Badge>
                          ) : (
                            <Badge variant="danger">
                              <AlertCircle className="w-3 h-3 mr-1" /> Invalid
                            </Badge>
                          )}
                        </td>
                        <td>
                          <button
                            onClick={() => handleRemoveRecipient(index)}
                            className="btn-icon p-1.5"
                          >
                            <Trash2 className="w-4 h-4 text-dark-400 hover:text-red-400" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal isOpen={showConfirmModal} onClose={() => setShowConfirmModal(false)} title="Confirm Batch Issue">
        <div className="space-y-6">
          <div className="bg-dark-900 rounded-lg p-4 space-y-3">
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-primary-400" />
              <div>
                <p className="text-dark-400 text-sm">Recipients</p>
                <p className="text-dark-100 font-semibold">{validCount} addresses</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <FileSpreadsheet className="w-5 h-5 text-primary-400" />
              <div>
                <p className="text-dark-400 text-sm">Event</p>
                <p className="text-dark-100 font-semibold">{selectedEvent || 'Not selected'}</p>
              </div>
            </div>
          </div>

          <p className="text-dark-400 text-sm">
            This action will issue {validCount} credentials. Each recipient will receive a private credential record in their wallet.
          </p>

          <div className="flex gap-3">
            <button
              onClick={() => setShowConfirmModal(false)}
              className="btn-secondary flex-1"
            >
              Cancel
            </button>
            <button
              onClick={handleBatchIssue}
              disabled={isProcessing}
              className="btn-primary flex-1 flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Confirm Issue
                </>
              )}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
