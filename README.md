# AleoCred - Privacy-Preserving Credential Verification System

**Aleo Wavehack Submission - Wave 1**

A zero-knowledge credential verification system built on Aleo blockchain that enables users to prove possession of credentials without revealing sensitive information.

[![Live Demo](https://img.shields.io/badge/Demo-Live-success)](https://aleocred.vercel.app)
[![Contract](https://img.shields.io/badge/Contract-credentify.aleo-blue)](https://explorer.aleo.org/program/credentify.aleo)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## The Problem

Traditional credential systems expose too much personal information:
- **Degrees** reveal graduation year, major, GPA, and institution
- **Event tickets** show which specific events you attended and when
- **Certifications** expose when and where you obtained them
- **Memberships** reveal your affiliations and participation history

**You can't prove "I have credential X" without revealing everything about X.**

This creates privacy risks, data leaks, and unnecessary exposure of personal information.

## Our Solution

**AleoCred** leverages Aleo's zero-knowledge technology to create a privacy-preserving credential system where:

- **Credentials are private** - Stored as encrypted records in your Aleo wallet
- **Proofs are selective** - Prove you have a credential without revealing details
- **Identity is protected** - No correlation between different credential verifications
- **Data stays yours** - You control what information to share and when

### How It Works

1. **Issue Credentials** - Organizations mint private credential records for users
2. **Store Privately** - Credentials encrypted in your Aleo wallet as records
3. **Generate Proofs** - Create zero-knowledge proofs of credential ownership
4. **Verify Selectively** - Share only the proof, not the underlying data

## 🚀 Wave 1: Foundation & Contract Deployment

**Status**: ✅ Complete

Wave 1 establishes the core infrastructure for private credential management on Aleo.

### ✅ Delivered

**Smart Contract (`credentify.aleo`)**
- ✅ Private credential record structure with encrypted on-chain storage
- ✅ Event registration and management system
- ✅ Credential issuance functions for organizers
- ✅ Zero-knowledge verification infrastructure
- ✅ Organizer permission system
- ✅ Deployed to Aleo Testnet with consensus V12+ compatibility
- ✅ Contract verified and functional: `credentify.aleo`

**Web Application**
- ✅ Production-ready UI with modern design
- ✅ Event organizer dashboard interface
- ✅ Credential issuance workflow
- ✅ User credential management pages
- ✅ Responsive design with TailwindCSS
- ✅ Complete project documentation

**Infrastructure**
- ✅ GitHub repository with full source code
- ✅ Deployment pipeline ready for Vercel
- ✅ Comprehensive README and architecture docs

### 📋 Wave 1 Scope

Wave 1 focused on:
1. Designing and deploying the core Leo smart contract
2. Building a production-quality user interface
3. Establishing the project architecture and documentation
4. Validating the private credential model on Aleo testnet

**Intentionally deferred to Wave 2**: Wallet integration and end-to-end transaction flow

---

## 🔄 Wave 2: Wallet Integration & Live Transactions

**Status**: 📅 Planned

Wave 2 will complete the end-to-end user experience by integrating wallet connectivity and enabling live contract interactions.

### 🎯 Planned Features

**Wallet Integration**
- Leo Wallet connection with stable adapter library
- Account management and authentication
- Transaction signing and submission
- Real-time balance and record queries

**Contract Interaction**
- Event creation transactions from organizer dashboard
- Credential issuance to user wallets
- Proof generation for credential verification
- Transaction history and status tracking

**Enhanced UX**
- Wallet connection status indicators
- Transaction confirmation flows
- Error handling and user feedback
- Loading states and progress tracking

### 🔧 Technical Approach

Wave 2 will evaluate:
- `@demox-labs/aleo-wallet-adapter-*` packages (current approach)
- `@provable/sdk` and `@provable/wasm` (if more stable)
- Community-recommended wallet integration patterns
- Direct Leo Wallet API if adapter issues persist

---

## 🎯 Wave 3: Advanced Features

**Status**: 📅 Future

- Credential expiration and revocation
- Batch credential issuance optimization
- Composite proofs across multiple credentials
- Enhanced verification mechanisms
- Multi-event reputation aggregation

## 🛠 Tech Stack

### Smart Contract
- **Language**: Leo (Aleo's domain-specific language)
- **Network**: Aleo Testnet
- **Program ID**: `credentify.aleo`

### Frontend
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **Icons**: Lucide React
- **Wallet**: Leo Wallet (Wave 2 integration)

### Infrastructure
- **Deployment**: Vercel
- **Version Control**: GitHub
- **Network**: Aleo Testnet

## 📁 Project Structure

```
AleoCred/
├── contracts/
│   └── aleocred/
│       ├── src/
│       │   └── main.leo          # Main credential contract
│       ├── build/
│       │   └── main.aleo         # Compiled Aleo instructions
│       ├── program.json          # Program metadata
│       └── .env                  # Deployment credentials
├── frontend/
│   ├── src/
│   │   ├── components/           # React components
│   │   ├── context/
│   │   │   └── WalletContext.tsx # Leo Wallet integration
│   │   ├── lib/
│   │   │   └── aleo.ts          # Aleo network utilities
│   │   ├── pages/               # Application pages
│   │   └── App.tsx              # Main app component
│   ├── package.json
│   └── vite.config.ts
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- **Leo CLI**: v1.11.0 or higher ([Installation Guide](https://developer.aleo.org/leo/installation))
- **Node.js**: v18.0.0 or higher
- **Leo Wallet**: Browser extension ([Download](https://leo.app/))
- **Aleo Testnet Credits**: Get from [faucet](https://faucet.aleo.org/)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/AlexD-Great/AleoCred.git
cd AleoCred
```

2. **Install frontend dependencies**
```bash
cd frontend
npm install
```

3. **Build the contract** (optional - already deployed)
```bash
cd ../contracts/aleocred
leo build
```

### Running the Application

#### Option 1: Use Deployed Contract (Recommended)

The contract is already deployed to Aleo testnet at `credentify.aleo`.

```bash
cd frontend
npm run dev
```

Visit `http://localhost:3000` and connect your Leo Wallet.

#### Option 2: Deploy Your Own Contract

1. **Set up environment**
```bash
cd contracts/aleocred
cp .env.example .env
# Edit .env with your private key
```

2. **Deploy to testnet**
```bash
snarkos developer deploy credentify.aleo \
  --private-key "YOUR_PRIVATE_KEY" \
  --query "https://api.explorer.provable.com/v1" \
  --path "./build/" \
  --broadcast "https://api.explorer.provable.com/v1/testnet/transaction/broadcast" \
  --fee 1000000 \
  --record "RECORD_STRING"
```

3. **Update frontend configuration**
```bash
cd ../../frontend
# Update PROGRAM_ID in src/lib/aleo.ts
```

### Using the Application

1. **Install Leo Wallet**
   - Download from [leo.app](https://leo.app/)
   - Create or import an Aleo account
   - Get testnet credits from [faucet](https://faucet.aleo.org/)

2. **Connect Wallet**
   - Open the application
   - Click "Connect Wallet"
   - Approve connection in Leo Wallet

3. **As an Organizer**
   - Navigate to "Organizer" page
   - Create a new event
   - Issue credentials to attendees

4. **As a User**
   - Navigate to "My Credentials"
   - View your credentials
   - Generate ZK proofs of attendance

## 📐 Smart Contract Architecture

### Data Structures

**Credential Record** (Private)
```leo
record Credential {
    owner: address,      // Credential holder
    event_id: field,     // Event identifier
    issued_at: u32,      // Issuance timestamp
    issuer: address      // Issuing organization
}
```

**EventInfo Struct** (Public)
```leo
struct EventInfo {
    organizer: address,  // Event organizer
    active: bool,        // Event status
    total_issued: u32    // Credentials issued count
}
```

### Key Functions

- `initialize(admin)` - Initialize contract with first organizer
- `register_event(event_id)` - Register new event (organizers only)
- `issue_credential(recipient, event_id)` - Issue credential to user
- `verify_credential(credential)` - Verify credential authenticity
- `verify_event_credential(credential, event_id)` - Verify credential for specific event
- `add_organizer(new_organizer)` - Add new organizer (admin only)
- `deactivate_event(event_id)` - Deactivate event (organizer only)
- `batch_issue(recipients[], event_id)` - Issue credentials in batch

### Security Features

- ✅ Private credential storage (encrypted records)
- ✅ Organizer permission system
- ✅ Event activation/deactivation controls
- ✅ Zero-knowledge verification
- ✅ Batch operations for efficiency

## 🎯 Roadmap

### Phase 1: Simple Event Credentials (Waves 1-3)
- ✅ **Wave 1: Basic Event Tickets** - Foundation with private credentials
- ⏳ **Wave 2: Ticket Features** - Expiration, revocation, batch issuance
- ⏳ **Wave 3: Multiple Events** - Composite proofs, QR codes

### Phase 2: DAO Reputation (Waves 4-6)
- ⏳ **Wave 4: DAO Voting Power** - Reputation-based governance
- ⏳ **Wave 5: Contributor Reputation** - Track contributions privately
- ⏳ **Wave 6: Cross-DAO Recognition** - Portable reputation

### Phase 3: Professional Use (Waves 7-9)
- ⏳ **Wave 7: Professional Credentials** - Degrees, certifications
- ⏳ **Wave 8: Compliance Tools** - Enterprise features
- ⏳ **Wave 9: Mainnet Ready** - Production hardening

### Phase 4: Launch (Wave 10)
- ⏳ **Wave 10: Production Launch** - Full mainnet deployment

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Live Demo**: [aleocred.vercel.app](https://aleocred.vercel.app)
- **Contract**: [credentify.aleo](https://explorer.aleo.org/program/credentify.aleo)
- **GitHub**: [github.com/AlexD-Great/AleoCred](https://github.com/AlexD-Great/AleoCred)
- **Aleo Docs**: [developer.aleo.org](https://developer.aleo.org)

## 📞 Support

For questions and support:
- Open an issue on GitHub
- Join Aleo Discord community
- Check Aleo documentation

---

**Built with ❤️ on Aleo | Wavehack Submission - Wave 1**
