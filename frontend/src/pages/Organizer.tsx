import { useState } from 'react'
import { PlusCircle, Users, Calendar, Shield as ShieldIcon, Send, Copy, CheckCircle, Trash2, Eye } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useWallet } from '../context/WalletContext'
import { generateEventId, PROGRAM_ID } from '../lib/aleo'
import { Badge, Modal, StatCard } from '../components/ui'

interface Event {
  id: string
  name: string
  issued: number
  status: 'active' | 'inactive'
  createdAt: string
}

export default function Organizer() {
  const { account, isConnected, requestTransaction } = useWallet()
  const [eventName, setEventName] = useState('')
  const [eventId, setEventId] = useState('')
  const [recipientAddress, setRecipientAddress] = useState('')
  const [loading, setLoading] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [lastTxId, setLastTxId] = useState('')
  const [events, setEvents] = useState<Event[]>([
    { id: 'evt_eth_denver_2024', name: 'ETH Denver 2024', issued: 342, status: 'active', createdAt: '2024-02-15' },
    { id: 'evt_aleo_summit', name: 'Aleo Developer Summit', issued: 156, status: 'active', createdAt: '2024-03-01' },
    { id: 'evt_zk_workshop', name: 'ZK Workshop Series', issued: 89, status: 'inactive', createdAt: '2024-01-20' },
  ])

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isConnected || !account) {
      alert('Please connect your wallet first')
      return
    }

    setLoading(true)
    try {
      const generatedId = generateEventId(eventName)
      
      console.log('Registering event on', PROGRAM_ID)
      console.log('Event:', eventName, 'ID:', generatedId)
      
      const txId = await requestTransaction(PROGRAM_ID, 'register_event', [generatedId])
      
      setEvents([{ id: generatedId, name: eventName, issued: 0, status: 'active', createdAt: new Date().toISOString().split('T')[0] }, ...events])
      setEventName('')
      setLastTxId(txId)
      setShowSuccessModal(true)
    } catch (error: any) {
      console.error('Error creating event:', error)
      alert(error.message || 'Failed to create event')
    } finally {
      setLoading(false)
    }
  }

  const handleIssueCredential = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isConnected || !account) {
      alert('Please connect your wallet first')
      return
    }

    if (!eventId) {
      alert('Please select an event first')
      return
    }

    setLoading(true)
    try {
      console.log('Issuing credential on', PROGRAM_ID)
      
      const txId = await requestTransaction(PROGRAM_ID, 'issue_credential', [recipientAddress, eventId])
      
      setRecipientAddress('')
      setLastTxId(txId)
      setShowSuccessModal(true)
    } catch (error: any) {
      console.error('Error issuing credential:', error)
      alert(error.message || 'Failed to issue credential')
    } finally {
      setLoading(false)
    }
  }

  if (!isConnected || !account) {
    return (
      <div className="max-w-4xl mx-auto text-center py-20 animate-fade-in">
        <div className="w-20 h-20 bg-dark-800 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <ShieldIcon className="w-10 h-10 text-dark-500" />
        </div>
        <h2 className="text-2xl font-bold text-dark-100 mb-3">Connect Your Wallet</h2>
        <p className="text-dark-400 mb-8 max-w-md mx-auto">Connect your wallet to access the organizer dashboard and start issuing credentials</p>
      </div>
    )
  }

  const totalIssued = events.reduce((acc, e) => acc + e.issued, 0)
  const activeEvents = events.filter(e => e.status === 'active').length

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-dark-50">Organizer Dashboard</h1>
          <p className="text-dark-400 mt-1">Create events and issue credentials to attendees</p>
        </div>
        <Link to="/batch-issue" className="btn-secondary flex items-center gap-2">
          <Users className="w-4 h-4" />
          Batch Issue
        </Link>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-3 gap-6">
        <StatCard icon={Calendar} label="Total Events" value={events.length.toString()} />
        <StatCard icon={Users} label="Credentials Issued" value={totalIssued.toString()} change="+12 this week" changeType="positive" />
        <StatCard icon={CheckCircle} label="Active Events" value={activeEvents.toString()} />
      </div>

      {/* Forms Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Create Event */}
        <div className="card-static">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-primary-900/30 rounded-xl">
              <Calendar className="w-6 h-6 text-primary-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-dark-100">Create Event</h2>
              <p className="text-sm text-dark-400">Register a new event on-chain</p>
            </div>
          </div>
          
          <form onSubmit={handleCreateEvent} className="space-y-4">
            <div>
              <label className="label">Event Name</label>
              <input
                type="text"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                placeholder="e.g., ETH Denver 2026"
                className="input"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading || !eventName}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              <PlusCircle className="w-5 h-5" />
              {loading ? 'Creating...' : 'Create Event'}
            </button>
          </form>
        </div>

        {/* Issue Credential */}
        <div className="card-static">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-accent-blue/20 rounded-xl">
              <Send className="w-6 h-6 text-accent-blue" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-dark-100">Issue Credential</h2>
              <p className="text-sm text-dark-400">Send credential to a recipient</p>
            </div>
          </div>
          
          <form onSubmit={handleIssueCredential} className="space-y-4">
            <div>
              <label className="label">Select Event</label>
              <select
                value={eventId}
                onChange={(e) => setEventId(e.target.value)}
                className="input"
                required
              >
                <option value="">Choose an event...</option>
                {events.filter(e => e.status === 'active').map((event) => (
                  <option key={event.id} value={event.id}>{event.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="label">Recipient Address</label>
              <input
                type="text"
                value={recipientAddress}
                onChange={(e) => setRecipientAddress(e.target.value)}
                placeholder="aleo1..."
                className="input font-mono text-sm"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading || !eventId || !recipientAddress}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              {loading ? 'Issuing...' : 'Issue Credential'}
            </button>
          </form>
        </div>
      </div>

      {/* Events Table */}
      <div className="card-static">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-dark-100">Your Events</h2>
          <Badge variant="neutral">{events.length} events</Badge>
        </div>

        {events.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="w-12 h-12 text-dark-600 mx-auto mb-3" />
            <p className="text-dark-400">No events created yet</p>
          </div>
        ) : (
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Event Name</th>
                  <th>Event ID</th>
                  <th>Created</th>
                  <th>Issued</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => (
                  <tr key={event.id}>
                    <td className="font-medium text-dark-100">{event.name}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <code className="text-xs text-dark-400 bg-dark-800 px-2 py-1 rounded">{event.id.slice(0, 16)}...</code>
                        <button className="text-dark-500 hover:text-dark-300">
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                    <td className="text-dark-400">{event.createdAt}</td>
                    <td>
                      <span className="text-primary-400 font-semibold">{event.issued}</span>
                    </td>
                    <td>
                      {event.status === 'active' ? (
                        <Badge variant="success">Active</Badge>
                      ) : (
                        <Badge variant="neutral">Inactive</Badge>
                      )}
                    </td>
                    <td>
                      <div className="flex items-center gap-1">
                        <button className="btn-icon p-1.5">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="btn-icon p-1.5" disabled>
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Success Modal */}
      <Modal isOpen={showSuccessModal} onClose={() => setShowSuccessModal(false)} title="Transaction Submitted">
        <div className="text-center py-4">
          <div className="w-16 h-16 bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-primary-400" />
          </div>
          <h3 className="text-lg font-semibold text-dark-100 mb-2">Success!</h3>
          <p className="text-dark-400 mb-4">Your transaction has been submitted to the network.</p>
          {lastTxId && (
            <div className="bg-dark-900 rounded-lg p-3 mb-4">
              <p className="text-xs text-dark-500 mb-1">Transaction ID</p>
              <code className="text-sm text-primary-400 break-all">{lastTxId}</code>
            </div>
          )}
          <button onClick={() => setShowSuccessModal(false)} className="btn-primary w-full">
            Done
          </button>
        </div>
      </Modal>
    </div>
  )
}

