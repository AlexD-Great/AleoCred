import { BarChart3, TrendingUp, Users, Award, Calendar, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { StatCard } from '../components/ui'

export default function Analytics() {
  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-dark-50">Analytics Dashboard</h1>
        <p className="text-dark-400 mt-2">Track credential issuance and verification metrics</p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Award}
          label="Total Credentials"
          value="1,284"
          change="+12% from last month"
          changeType="positive"
        />
        <StatCard
          icon={Users}
          label="Unique Holders"
          value="847"
          change="+8% from last month"
          changeType="positive"
        />
        <StatCard
          icon={TrendingUp}
          label="Verifications"
          value="3,621"
          change="+24% from last month"
          changeType="positive"
        />
        <StatCard
          icon={Calendar}
          label="Active Events"
          value="12"
          change="-2 from last month"
          changeType="negative"
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Chart Placeholder */}
        <div className="lg:col-span-2 card-static">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-dark-100">Credential Issuance Over Time</h2>
            <select className="input w-auto text-sm py-2">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
            </select>
          </div>
          
          {/* Chart Placeholder */}
          <div className="h-80 bg-dark-900 rounded-xl flex items-center justify-center border border-dark-700">
            <div className="text-center">
              <BarChart3 className="w-16 h-16 text-dark-600 mx-auto mb-4" />
              <p className="text-dark-400">Chart visualization</p>
              <p className="text-dark-500 text-sm mt-1">Interactive charts will render here</p>
            </div>
          </div>
        </div>

        {/* Top Events */}
        <div className="card-static">
          <h2 className="text-lg font-semibold text-dark-100 mb-4">Top Events</h2>
          <div className="space-y-4">
            {[
              { name: 'ETH Denver 2024', issued: 342, trend: 'up' },
              { name: 'Aleo Summit', issued: 256, trend: 'up' },
              { name: 'ZK Workshop', issued: 189, trend: 'down' },
              { name: 'DeFi Conference', issued: 167, trend: 'up' },
              { name: 'Hackathon Finals', issued: 145, trend: 'up' },
            ].map((event, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-dark-900 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary-900/30 rounded-lg flex items-center justify-center text-primary-400 font-bold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-dark-200 font-medium">{event.name}</p>
                    <p className="text-dark-500 text-sm">{event.issued} issued</p>
                  </div>
                </div>
                {event.trend === 'up' ? (
                  <ArrowUpRight className="w-5 h-5 text-green-400" />
                ) : (
                  <ArrowDownRight className="w-5 h-5 text-red-400" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Activity Table */}
      <div className="card-static">
        <h2 className="text-lg font-semibold text-dark-100 mb-4">Recent Activity</h2>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Action</th>
                <th>Event</th>
                <th>User</th>
                <th>Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { action: 'Credential Issued', event: 'ETH Denver 2024', user: 'aleo1qnr...8wq9', time: '2 min ago', status: 'success' },
                { action: 'Verification', event: 'Aleo Summit', user: 'aleo1xyz...def4', time: '5 min ago', status: 'success' },
                { action: 'Batch Issue', event: 'ZK Workshop', user: 'Organizer', time: '12 min ago', status: 'success' },
                { action: 'Credential Issued', event: 'DeFi Conference', user: 'aleo1mno...stu0', time: '18 min ago', status: 'success' },
                { action: 'Verification Failed', event: 'Unknown', user: 'aleo1abc...xyz9', time: '25 min ago', status: 'failed' },
              ].map((activity, index) => (
                <tr key={index}>
                  <td className="font-medium">{activity.action}</td>
                  <td>{activity.event}</td>
                  <td className="font-mono text-sm text-dark-400">{activity.user}</td>
                  <td className="text-dark-400">{activity.time}</td>
                  <td>
                    <span className={`badge ${activity.status === 'success' ? 'badge-success' : 'badge-danger'}`}>
                      {activity.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
