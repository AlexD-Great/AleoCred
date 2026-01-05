import { Link } from 'react-router-dom'
import { Shield, Lock, CheckCircle, Zap } from 'lucide-react'

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center py-16">
        <h1 className="text-5xl font-bold text-white mb-4">
          Prove your reputation.
          <br />
          <span className="text-primary-400">Reveal nothing else.</span>
        </h1>
        <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
          AleoCred is a zero-knowledge credential system where you collect verifiable
          reputation as private ZK assets, enabling selective disclosure without exposure.
        </p>
        <div className="flex gap-4 justify-center">
          <Link to="/organizer" className="btn-primary text-lg px-8 py-3">
            Issue Credentials
          </Link>
          <Link to="/user" className="btn-secondary text-lg px-8 py-3">
            View My Credentials
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
        <FeatureCard
          icon={<Shield className="w-8 h-8" />}
          title="Private by Default"
          description="Credentials stored as encrypted records in your Aleo wallet"
        />
        <FeatureCard
          icon={<Lock className="w-8 h-8" />}
          title="Zero-Knowledge Proofs"
          description="Prove you have credentials without revealing what they are"
        />
        <FeatureCard
          icon={<CheckCircle className="w-8 h-8" />}
          title="Verifiable"
          description="Cryptographically verify credential authenticity on-chain"
        />
        <FeatureCard
          icon={<Zap className="w-8 h-8" />}
          title="Selective Disclosure"
          description="Share only what you choose, nothing more"
        />
      </div>

      <div className="mt-20 card">
        <h2 className="text-2xl font-bold text-white mb-4">How It Works</h2>
        <div className="space-y-6">
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

      <div className="mt-16 grid md:grid-cols-3 gap-6">
        <UseCaseCard
          title="Event Access"
          description="Prove attendance without revealing travel history"
          examples={['Conference tickets', 'Meetup attendance', 'Workshop completion']}
        />
        <UseCaseCard
          title="DAO Participation"
          description="Show contributions without exposing voting patterns"
          examples={['Voting power', 'Proposal authorship', 'Active contributor status']}
        />
        <UseCaseCard
          title="Professional Credentials"
          description="Verify qualifications without full disclosure"
          examples={['Certifications', 'Work experience', 'Skill endorsements']}
        />
      </div>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="card text-center">
      <div className="flex justify-center text-primary-500 mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  )
}

function Step({ number, title, description }: { number: number; title: string; description: string }) {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center text-white font-bold">
        {number}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
    </div>
  )
}

function UseCaseCard({ title, description, examples }: { title: string; description: string; examples: string[] }) {
  return (
    <div className="card">
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400 mb-4">{description}</p>
      <ul className="space-y-2">
        {examples.map((example, i) => (
          <li key={i} className="flex items-center text-sm text-gray-300">
            <CheckCircle className="w-4 h-4 text-primary-500 mr-2" />
            {example}
          </li>
        ))}
      </ul>
    </div>
  )
}
