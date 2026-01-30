import { useState } from 'react'
import { ArrowUpRight, ArrowDownLeft, Clock, CheckCircle, XCircle, ExternalLink, Filter, Search } from 'lucide-react'
import { Badge } from '../components/ui'

interface Transaction {
  id: string
  type: 'issue' | 'receive' | 'verify'
  description: string
  amount?: string
  status: 'confirmed' | 'pending' | 'failed'
  timestamp: string
  txHash: string
}

const transactions: Transaction[] = [
  { id: '1', type: 'issue', description: 'Issued credential to aleo1xyz...', amount: '-0.001 ALEO', status: 'confirmed', timestamp: '2 min ago', txHash: 'at1qnr4dkk...' },
  { id: '2', type: 'receive', description: 'Received ETH Denver credential', status: 'confirmed', timestamp: '1 hour ago', txHash: 'at1xyz789a...' },
  { id: '3', type: 'verify', description: 'Verification proof generated', status: 'confirmed', timestamp: '3 hours ago', txHash: 'at1mno456p...' },
  { id: '4', type: 'issue', description: 'Batch issue to 25 recipients', amount: '-0.025 ALEO', status: 'pending', timestamp: '4 hours ago', txHash: 'at1ghi012j...' },
  { id: '5', type: 'receive', description: 'Received DAO membership', status: 'confirmed', timestamp: '1 day ago', txHash: 'at1abc123d...' },
  { id: '6', type: 'issue', description: 'Issued credential to aleo1abc...', amount: '-0.001 ALEO', status: 'failed', timestamp: '2 days ago', txHash: 'at1def456g...' },
  { id: '7', type: 'verify', description: 'Composite proof generated', status: 'confirmed', timestamp: '3 days ago', txHash: 'at1jkl789m...' },
]

export default function Transactions() {
  const [filter, setFilter] = useState<'all' | 'issue' | 'receive' | 'verify'>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredTransactions = transactions.filter(tx => {
    if (filter !== 'all' && tx.type !== filter) return false
    if (searchQuery && !tx.description.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'issue':
        return <ArrowUpRight className="w-5 h-5 text-accent-orange" />
      case 'receive':
        return <ArrowDownLeft className="w-5 h-5 text-primary-400" />
      case 'verify':
        return <CheckCircle className="w-5 h-5 text-accent-blue" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge variant="success"><CheckCircle className="w-3 h-3 mr-1" /> Confirmed</Badge>
      case 'pending':
        return <Badge variant="warning"><Clock className="w-3 h-3 mr-1" /> Pending</Badge>
      case 'failed':
        return <Badge variant="danger"><XCircle className="w-3 h-3 mr-1" /> Failed</Badge>
      default:
        return null
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-dark-50">Transaction History</h1>
        <p className="text-dark-400 mt-2">View all your credential transactions and verifications</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-500" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input pl-10"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-dark-400" />
          <div className="flex bg-dark-800 rounded-lg p-1">
            {['all', 'issue', 'receive', 'verify'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f as typeof filter)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  filter === f
                    ? 'bg-dark-700 text-dark-100'
                    : 'text-dark-400 hover:text-dark-200'
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Transactions List */}
      <div className="card-static">
        {filteredTransactions.length === 0 ? (
          <div className="text-center py-16">
            <Clock className="w-16 h-16 text-dark-600 mx-auto mb-4" />
            <p className="text-dark-400">No transactions found</p>
          </div>
        ) : (
          <div className="divide-y divide-dark-700">
            {filteredTransactions.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    tx.type === 'issue' ? 'bg-accent-orange/20' :
                    tx.type === 'receive' ? 'bg-primary-900/30' :
                    'bg-accent-blue/20'
                  }`}>
                    {getTypeIcon(tx.type)}
                  </div>
                  <div>
                    <p className="text-dark-200 font-medium">{tx.description}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-dark-500 text-sm">{tx.timestamp}</span>
                      <span className="text-dark-600">•</span>
                      <a
                        href={`https://explorer.aleo.org/transaction/${tx.txHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-400 text-sm hover:text-primary-300 flex items-center gap-1"
                      >
                        {tx.txHash}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {tx.amount && (
                    <span className={`font-mono text-sm ${
                      tx.amount.startsWith('-') ? 'text-accent-orange' : 'text-primary-400'
                    }`}>
                      {tx.amount}
                    </span>
                  )}
                  {getStatusBadge(tx.status)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-dark-400 text-sm">Showing {filteredTransactions.length} of {transactions.length} transactions</p>
        <div className="flex gap-2">
          <button className="btn-secondary py-2 px-4 text-sm" disabled>Previous</button>
          <button className="btn-secondary py-2 px-4 text-sm">Next</button>
        </div>
      </div>
    </div>
  )
}
