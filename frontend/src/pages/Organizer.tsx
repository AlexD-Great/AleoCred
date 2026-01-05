import { useState } from 'react'
import { PlusCircle, Users, Calendar } from 'lucide-react'

export default function Organizer() {
  const publicKey = null // Wallet integration placeholder
  const [eventName, setEventName] = useState('')
  const [eventId, setEventId] = useState('')
  const [recipientAddress, setRecipientAddress] = useState('')
  const [loading, setLoading] = useState(false)
  const [events, setEvents] = useState<Array<{ id: string; name: string; issued: number }>>([])

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!publicKey) {
      alert('Please connect your wallet first')
      return
    }

    setLoading(true)
    try {
      // Generate event ID from name
      const generatedId = `${Date.now()}field`
      
      // TODO: Call Leo program to register event
      console.log('Registering event:', eventName, generatedId)
      
      setEvents([...events, { id: generatedId, name: eventName, issued: 0 }])
      setEventName('')
      alert('Event created successfully!')
    } catch (error) {
      console.error('Error creating event:', error)
      alert('Failed to create event')
    } finally {
      setLoading(false)
    }
  }

  const handleIssueCredential = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!publicKey) {
      alert('Please connect your wallet first')
      return
    }

    setLoading(true)
    try {
      const timestamp = Math.floor(Date.now() / 1000)
      
      // TODO: Call Leo program to issue credential
      console.log('Issuing credential:', {
        recipient: recipientAddress,
        eventId,
        timestamp
      })
      
      setRecipientAddress('')
      alert('Credential issued successfully!')
    } catch (error) {
      console.error('Error issuing credential:', error)
      alert('Failed to issue credential')
    } finally {
      setLoading(false)
    }
  }

  if (!publicKey) {
    return (
      <div className="max-w-4xl mx-auto text-center py-16">
        <Shield className="w-16 h-16 text-gray-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Connect Your Wallet</h2>
        <p className="text-gray-400">Please connect your wallet to access the organizer dashboard</p>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Organizer Dashboard</h1>
        <p className="text-gray-400">Create events and issue credentials to attendees</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="card">
          <div className="flex items-center gap-2 mb-6">
            <Calendar className="w-6 h-6 text-primary-500" />
            <h2 className="text-xl font-bold text-white">Create Event</h2>
          </div>
          
          <form onSubmit={handleCreateEvent} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Event Name
              </label>
              <input
                type="text"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                placeholder="e.g., ETHDenver 2026"
                className="input"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              <PlusCircle className="w-5 h-5" />
              {loading ? 'Creating...' : 'Create Event'}
            </button>
          </form>
        </div>

        <div className="card">
          <div className="flex items-center gap-2 mb-6">
            <Users className="w-6 h-6 text-primary-500" />
            <h2 className="text-xl font-bold text-white">Issue Credential</h2>
          </div>
          
          <form onSubmit={handleIssueCredential} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Event ID
              </label>
              <input
                type="text"
                value={eventId}
                onChange={(e) => setEventId(e.target.value)}
                placeholder="Event ID from created events"
                className="input"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Recipient Address
              </label>
              <input
                type="text"
                value={recipientAddress}
                onChange={(e) => setRecipientAddress(e.target.value)}
                placeholder="aleo1..."
                className="input"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full"
            >
              {loading ? 'Issuing...' : 'Issue Credential'}
            </button>
          </form>
        </div>
      </div>

      <div className="mt-8 card">
        <h2 className="text-xl font-bold text-white mb-4">Your Events</h2>
        {events.length === 0 ? (
          <p className="text-gray-400 text-center py-8">No events created yet</p>
        ) : (
          <div className="space-y-3">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-gray-700 rounded-lg p-4 flex justify-between items-center"
              >
                <div>
                  <h3 className="text-white font-semibold">{event.name}</h3>
                  <p className="text-sm text-gray-400">ID: {event.id}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary-400">{event.issued}</p>
                  <p className="text-xs text-gray-400">Credentials Issued</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function Shield({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  )
}
