import { useState } from 'react'
import { Trophy, Star, TrendingUp, Users, Vote, FileText, Award, ChevronRight } from 'lucide-react'
import { Badge, StatCard } from '../components/ui'

interface ReputationCategory {
  name: string
  score: number
  maxScore: number
  icon: React.ReactNode
  color: string
}

const categories: ReputationCategory[] = [
  { name: 'Governance', score: 85, maxScore: 100, icon: <Vote className="w-5 h-5" />, color: 'primary' },
  { name: 'Proposals', score: 42, maxScore: 100, icon: <FileText className="w-5 h-5" />, color: 'accent-blue' },
  { name: 'Community', score: 78, maxScore: 100, icon: <Users className="w-5 h-5" />, color: 'accent-purple' },
  { name: 'Contributions', score: 63, maxScore: 100, icon: <Award className="w-5 h-5" />, color: 'accent-orange' },
]

export default function Reputation() {
  const [selectedDAO, setSelectedDAO] = useState('aleo-foundation')
  const totalScore = Math.round(categories.reduce((acc, cat) => acc + cat.score, 0) / categories.length)

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-dark-50">DAO Reputation</h1>
          <p className="text-dark-400 mt-2">Your verifiable on-chain reputation across DAOs</p>
        </div>
        <select
          value={selectedDAO}
          onChange={(e) => setSelectedDAO(e.target.value)}
          className="input w-auto"
        >
          <option value="aleo-foundation">Aleo Foundation</option>
          <option value="defi-dao">DeFi DAO</option>
          <option value="nft-collective">NFT Collective</option>
        </select>
      </div>

      {/* Overall Score Card */}
      <div className="card-highlight">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="relative">
            <div className="w-40 h-40 rounded-full bg-dark-900 flex items-center justify-center border-4 border-primary-500/30">
              <div className="text-center">
                <Trophy className="w-8 h-8 text-primary-400 mx-auto mb-2" />
                <p className="text-4xl font-bold text-dark-50">{totalScore}</p>
                <p className="text-dark-400 text-sm">Overall Score</p>
              </div>
            </div>
            <div className="absolute -top-2 -right-2 bg-primary-600 rounded-full px-3 py-1 text-sm font-semibold">
              Level 4
            </div>
          </div>
          
          <div className="flex-1 grid sm:grid-cols-2 gap-4">
            <StatCard icon={Star} label="Voting Power" value="2,450" change="+15% this month" changeType="positive" />
            <StatCard icon={TrendingUp} label="Rank" value="#127" change="Up 23 places" changeType="positive" />
          </div>
        </div>
      </div>

      {/* Score Breakdown */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <div key={category.name} className="card">
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-3 rounded-lg ${
                category.color === 'primary' ? 'bg-primary-900/30 text-primary-400' :
                category.color === 'accent-blue' ? 'bg-accent-blue/20 text-accent-blue' :
                category.color === 'accent-purple' ? 'bg-accent-purple/20 text-accent-purple' :
                'bg-accent-orange/20 text-accent-orange'
              }`}>
                {category.icon}
              </div>
              <div>
                <p className="text-dark-200 font-medium">{category.name}</p>
                <p className="text-2xl font-bold text-dark-50">{category.score}</p>
              </div>
            </div>
            <div className="h-2 bg-dark-700 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${
                  category.color === 'primary' ? 'bg-primary-500' :
                  category.color === 'accent-blue' ? 'bg-accent-blue' :
                  category.color === 'accent-purple' ? 'bg-accent-purple' :
                  'bg-accent-orange'
                }`}
                style={{ width: `${(category.score / category.maxScore) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Activity & Achievements */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="card-static">
          <h2 className="text-lg font-semibold text-dark-100 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[
              { action: 'Voted on Proposal #42', points: '+5', time: '2 hours ago', type: 'vote' },
              { action: 'Created Proposal #45', points: '+25', time: '1 day ago', type: 'proposal' },
              { action: 'Participated in Discussion', points: '+2', time: '2 days ago', type: 'community' },
              { action: 'Delegated 500 tokens', points: '+10', time: '3 days ago', type: 'governance' },
              { action: 'Completed Bounty', points: '+50', time: '1 week ago', type: 'contribution' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-dark-900 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-dark-800 rounded-lg flex items-center justify-center">
                    {activity.type === 'vote' && <Vote className="w-5 h-5 text-primary-400" />}
                    {activity.type === 'proposal' && <FileText className="w-5 h-5 text-accent-blue" />}
                    {activity.type === 'community' && <Users className="w-5 h-5 text-accent-purple" />}
                    {activity.type === 'governance' && <Trophy className="w-5 h-5 text-accent-orange" />}
                    {activity.type === 'contribution' && <Award className="w-5 h-5 text-green-400" />}
                  </div>
                  <div>
                    <p className="text-dark-200">{activity.action}</p>
                    <p className="text-dark-500 text-sm">{activity.time}</p>
                  </div>
                </div>
                <Badge variant="success">{activity.points}</Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="card-static">
          <h2 className="text-lg font-semibold text-dark-100 mb-4">Achievements</h2>
          <div className="space-y-4">
            {[
              { name: 'Early Adopter', description: 'Joined in the first month', unlocked: true },
              { name: 'Governance Pioneer', description: 'Voted on 10+ proposals', unlocked: true },
              { name: 'Proposal Author', description: 'Created 5 proposals', unlocked: true },
              { name: 'Whale Voter', description: '10,000+ voting power', unlocked: false },
              { name: 'Community Leader', description: 'Top 100 reputation', unlocked: false },
            ].map((achievement, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-3 rounded-lg border ${
                  achievement.unlocked
                    ? 'bg-primary-900/10 border-primary-700/30'
                    : 'bg-dark-900 border-dark-700 opacity-60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    achievement.unlocked ? 'bg-primary-900/30' : 'bg-dark-800'
                  }`}>
                    <Trophy className={`w-5 h-5 ${achievement.unlocked ? 'text-primary-400' : 'text-dark-500'}`} />
                  </div>
                  <div>
                    <p className={achievement.unlocked ? 'text-dark-200' : 'text-dark-400'}>{achievement.name}</p>
                    <p className="text-dark-500 text-sm">{achievement.description}</p>
                  </div>
                </div>
                {achievement.unlocked ? (
                  <Badge variant="success">Unlocked</Badge>
                ) : (
                  <ChevronRight className="w-5 h-5 text-dark-500" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
