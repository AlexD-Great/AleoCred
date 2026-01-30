import { Link } from 'react-router-dom'
import { Shield, Lock, CheckCircle, Zap, ArrowRight, Award, Users, TrendingUp, Clock } from 'lucide-react'
import { StatCard } from '../components/ui'

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto space-y-16 animate-fade-in">
      {/* Hero Section */}
      <div className="relative py-12 lg:py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/20 via-transparent to-primary-900/20 rounded-3xl" />
        <div className="relative text-center px-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-900/30 border border-primary-700/30 rounded-full text-primary-400 text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" />
            Built on Aleo • Zero-Knowledge Privacy
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-dark-50 mb-6 leading-tight">
            Prove your reputation.
            <br />
            <span className="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
              Reveal nothing else.
            </span>
          </h1>
          <p className="text-lg lg:text-xl text-dark-400 mb-10 max-w-3xl mx-auto leading-relaxed">
            AleoCred is a zero-knowledge credential system where you collect verifiable
            reputation as private ZK assets, enabling selective disclosure without exposure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/organizer" className="btn-primary text-lg px-8 py-3.5 flex items-center justify-center gap-2 group">
              Issue Credentials
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/user" className="btn-secondary text-lg px-8 py-3.5">
              View My Credentials
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={Award} label="Credentials Issued" value="12,847" change="+18% this month" changeType="positive" />
        <StatCard icon={Users} label="Active Users" value="3,421" change="+24% this month" changeType="positive" />
        <StatCard icon={TrendingUp} label="Verifications" value="45,892" change="+32% this month" changeType="positive" />
        <StatCard icon={Clock} label="Avg. Verification" value="0.8s" change="-15% faster" changeType="positive" />
      </div>

      {/* Features Grid */}
      <div>
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-dark-50 mb-3">Why AleoCred?</h2>
          <p className="text-dark-400 max-w-2xl mx-auto">Privacy-first credentials powered by zero-knowledge proofs</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard
            icon={<Shield className="w-7 h-7" />}
            title="Private by Default"
            description="Credentials stored as encrypted records in your Aleo wallet"
            color="primary"
          />
          <FeatureCard
            icon={<Lock className="w-7 h-7" />}
            title="Zero-Knowledge Proofs"
            description="Prove you have credentials without revealing what they are"
            color="blue"
          />
          <FeatureCard
            icon={<CheckCircle className="w-7 h-7" />}
            title="On-Chain Verification"
            description="Cryptographically verify credential authenticity on-chain"
            color="purple"
          />
          <FeatureCard
            icon={<Zap className="w-7 h-7" />}
            title="Selective Disclosure"
            description="Share only what you choose, nothing more"
            color="orange"
          />
        </div>
      </div>

      {/* How It Works */}
      <div className="card-static">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-dark-50 mb-3">How It Works</h2>
          <p className="text-dark-400">Four simple steps to private credential management</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Step
            number={1}
            title="Get Credentials"
            description="Organizations issue you private tokens for achievements, attendance, or qualifications"
          />
          <Step
            number={2}
            title="Store Privately"
            description="Credentials live encrypted in your Aleo wallet as zero-knowledge records"
          />
          <Step
            number={3}
            title="Prove Selectively"
            description="Generate ZK proofs like 'I attended 3+ events' without revealing which ones"
          />
          <Step
            number={4}
            title="Get Access"
            description="Share just the proof, no raw data - verifiers confirm validity on-chain"
          />
        </div>
      </div>

      {/* Use Cases */}
      <div>
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-dark-50 mb-3">Use Cases</h2>
          <p className="text-dark-400">Endless possibilities for private credential verification</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <UseCaseCard
            title="Event Access"
            description="Prove attendance without revealing travel history"
            examples={['Conference tickets', 'Meetup attendance', 'Workshop completion']}
            icon={<Award className="w-6 h-6" />}
          />
          <UseCaseCard
            title="DAO Participation"
            description="Show contributions without exposing voting patterns"
            examples={['Voting power', 'Proposal authorship', 'Active contributor status']}
            icon={<Users className="w-6 h-6" />}
          />
          <UseCaseCard
            title="Professional Credentials"
            description="Verify qualifications without full disclosure"
            examples={['Certifications', 'Work experience', 'Skill endorsements']}
            icon={<Shield className="w-6 h-6" />}
          />
        </div>
      </div>

      {/* CTA Section */}
      <div className="card-highlight text-center py-12">
        <h2 className="text-2xl lg:text-3xl font-bold text-dark-50 mb-4">Ready to get started?</h2>
        <p className="text-dark-400 mb-8 max-w-xl mx-auto">
          Connect your wallet and start building your private credential portfolio today.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/user" className="btn-primary px-8 py-3 flex items-center justify-center gap-2">
            <Shield className="w-5 h-5" />
            View Credentials
          </Link>
          <Link to="/verify" className="btn-secondary px-8 py-3">
            Verify a Credential
          </Link>
        </div>
      </div>
    </div>
  )
}

function FeatureCard({ icon, title, description, color }: { icon: React.ReactNode; title: string; description: string; color: string }) {
  const colorClasses = {
    primary: 'bg-primary-900/30 text-primary-400',
    blue: 'bg-accent-blue/20 text-accent-blue',
    purple: 'bg-accent-purple/20 text-accent-purple',
    orange: 'bg-accent-orange/20 text-accent-orange',
  }
  
  return (
    <div className="card group">
      <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${colorClasses[color as keyof typeof colorClasses]}`}>
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-dark-100 mb-2">{title}</h3>
      <p className="text-dark-400 text-sm leading-relaxed">{description}</p>
    </div>
  )
}

function Step({ number, title, description }: { number: number; title: string; description: string }) {
  return (
    <div className="text-center">
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold text-lg mx-auto mb-4 shadow-glow">
        {number}
      </div>
      <h3 className="text-lg font-semibold text-dark-100 mb-2">{title}</h3>
      <p className="text-dark-400 text-sm leading-relaxed">{description}</p>
    </div>
  )
}

function UseCaseCard({ title, description, examples, icon }: { title: string; description: string; examples: string[]; icon: React.ReactNode }) {
  return (
    <div className="card group">
      <div className="w-12 h-12 rounded-xl bg-primary-900/30 flex items-center justify-center text-primary-400 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-dark-100 mb-2">{title}</h3>
      <p className="text-dark-400 mb-4 text-sm">{description}</p>
      <ul className="space-y-2">
        {examples.map((example, i) => (
          <li key={i} className="flex items-center text-sm text-dark-300">
            <CheckCircle className="w-4 h-4 text-primary-500 mr-2 flex-shrink-0" />
            {example}
          </li>
        ))}
      </ul>
    </div>
  )
}
