import { useState } from 'react'
import { QrCode, Camera, Shield, CheckCircle, XCircle, Upload } from 'lucide-react'
import { Modal } from '../components/ui'

export default function Verify() {
  const [scanMode, setScanMode] = useState(false)
  const [verificationResult, setVerificationResult] = useState<'success' | 'failed' | null>(null)
  const [showResultModal, setShowResultModal] = useState(false)

  const handleScan = () => {
    setScanMode(true)
    // Simulate scan completion
    setTimeout(() => {
      setScanMode(false)
      setVerificationResult('success')
      setShowResultModal(true)
    }, 2000)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-dark-50">Verify Credentials</h1>
        <p className="text-dark-400 mt-2">Scan QR codes or upload proofs to verify credential authenticity</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* QR Scanner */}
        <div className="card-static">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-primary-900/30 rounded-lg">
              <Camera className="w-6 h-6 text-primary-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-dark-100">Scan QR Code</h2>
              <p className="text-sm text-dark-400">Use camera to scan credential QR</p>
            </div>
          </div>

          <div className="aspect-square bg-dark-900 rounded-xl border-2 border-dashed border-dark-600 flex flex-col items-center justify-center mb-4 overflow-hidden">
            {scanMode ? (
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="absolute inset-4 border-2 border-primary-500 rounded-lg animate-pulse" />
                <div className="w-48 h-1 bg-primary-500 animate-pulse absolute" style={{ animation: 'scan 2s ease-in-out infinite' }} />
                <p className="text-dark-400 mt-32">Scanning...</p>
              </div>
            ) : (
              <>
                <QrCode className="w-16 h-16 text-dark-600 mb-4" />
                <p className="text-dark-500 text-sm">Camera preview will appear here</p>
              </>
            )}
          </div>

          <button
            onClick={handleScan}
            disabled={scanMode}
            className="btn-primary w-full flex items-center justify-center gap-2"
          >
            <Camera className="w-4 h-4" />
            {scanMode ? 'Scanning...' : 'Start Scanner'}
          </button>
        </div>

        {/* Upload Proof */}
        <div className="card-static">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-accent-blue/20 rounded-lg">
              <Upload className="w-6 h-6 text-accent-blue" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-dark-100">Upload Proof</h2>
              <p className="text-sm text-dark-400">Verify a proof file directly</p>
            </div>
          </div>

          <div className="aspect-square bg-dark-900 rounded-xl border-2 border-dashed border-dark-600 flex flex-col items-center justify-center mb-4 cursor-pointer hover:border-dark-500 transition-colors">
            <Upload className="w-16 h-16 text-dark-600 mb-4" />
            <p className="text-dark-400 text-sm font-medium">Drop proof file here</p>
            <p className="text-dark-500 text-xs mt-1">or click to browse</p>
          </div>

          <button className="btn-secondary w-full flex items-center justify-center gap-2">
            <Upload className="w-4 h-4" />
            Select File
          </button>
        </div>
      </div>

      {/* Recent Verifications */}
      <div className="card-static">
        <h2 className="text-lg font-semibold text-dark-100 mb-4">Recent Verifications</h2>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Credential Type</th>
                <th>Issuer</th>
                <th>Verified At</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="font-medium">Event Attendance</td>
                <td>ETH Denver 2024</td>
                <td>2 minutes ago</td>
                <td><span className="badge badge-success"><CheckCircle className="w-3 h-3 mr-1" /> Valid</span></td>
              </tr>
              <tr>
                <td className="font-medium">DAO Membership</td>
                <td>Aleo Foundation</td>
                <td>15 minutes ago</td>
                <td><span className="badge badge-success"><CheckCircle className="w-3 h-3 mr-1" /> Valid</span></td>
              </tr>
              <tr>
                <td className="font-medium">Certificate</td>
                <td>Unknown Issuer</td>
                <td>1 hour ago</td>
                <td><span className="badge badge-danger"><XCircle className="w-3 h-3 mr-1" /> Invalid</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Result Modal */}
      <Modal isOpen={showResultModal} onClose={() => setShowResultModal(false)} title="Verification Result">
        <div className="text-center py-6">
          {verificationResult === 'success' ? (
            <>
              <div className="w-20 h-20 bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-10 h-10 text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold text-dark-100 mb-2">Credential Verified</h3>
              <p className="text-dark-400 mb-6">This credential is authentic and valid</p>
              <div className="bg-dark-900 rounded-lg p-4 text-left space-y-2">
                <div className="flex justify-between">
                  <span className="text-dark-400">Type</span>
                  <span className="text-dark-200">Event Attendance</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-dark-400">Issuer</span>
                  <span className="text-dark-200">ETH Denver 2024</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-dark-400">Issued</span>
                  <span className="text-dark-200">March 1, 2024</span>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="w-20 h-20 bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <XCircle className="w-10 h-10 text-red-400" />
              </div>
              <h3 className="text-xl font-semibold text-dark-100 mb-2">Verification Failed</h3>
              <p className="text-dark-400">This credential could not be verified</p>
            </>
          )}
        </div>
      </Modal>
    </div>
  )
}
