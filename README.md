# AleoCred - Privacy-Preserving Credential Verification System

**Aleo Wavehack Submission - Wave 1**

A zero-knowledge credential verification system built on Aleo blockchain that enables users to prove possession of credentials without revealing sensitive information.

[![Live Demo](https://img.shields.io/badge/Demo-Live-success)](https://aleocred.vercel.app)
[![Contract](https://img.shields.io/badge/Contract-credentify.aleo-blue)](https://explorer.aleo.org/program/credentify.aleo)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## 📋 SUBMISSION REQUIREMENTS

### **1. PROJECT OVERVIEW**

#### **Project Name & Description**
**AleoCred** - A zero-knowledge credential verification system that enables users to prove possession of credentials (event attendance, certifications, memberships, degrees) without revealing sensitive personal information.

#### **Problem Being Solved**
Traditional credential systems expose too much personal information:
- **Degrees** reveal graduation year, major, GPA, and institution
- **Event tickets** show which specific events you attended and when
- **Certifications** expose when and where you obtained them
- **Memberships** reveal your affiliations and participation history

**You can't prove "I have credential X" without revealing everything about X.**

This creates privacy risks, data leaks, and unnecessary exposure of personal information in hiring, event access, DAO participation, and professional verification scenarios.

#### **Why Privacy Matters for This Use Case**
1. **Professional Privacy** - Job seekers shouldn't reveal all past employers or graduation dates to prove qualifications
2. **Event Attendance** - Users shouldn't expose their full travel/event history to access exclusive communities
3. **DAO Participation** - Contributors shouldn't reveal voting patterns or all affiliations to prove reputation
4. **Selective Disclosure** - Users should control exactly what information they share, when, and with whom
5. **Correlation Prevention** - Multiple verifications shouldn't be linkable to build a profile of the user

Zero-knowledge proofs on Aleo enable users to prove "I have credential X" without revealing any underlying details, protecting privacy while maintaining verifiability.

#### **Product Market Fit (PMF) & Go-To-Market (GTM) Plan**

**Target Markets**:
1. **Event Organizers** (Primary) - Conferences, hackathons, meetups needing private ticketing
2. **DAOs & Web3 Communities** - Reputation systems, governance, contributor verification
3. **Professional Credentialing** - Certifications, degrees, employment verification
4. **Enterprise Compliance** - KYC/AML without full data exposure

**PMF Validation**:
- Event organizers struggle with ticket fraud and privacy concerns
- DAOs need reputation systems that don't expose voting patterns
- Professionals want to prove qualifications without revealing full work history
- Enterprises need compliance without storing sensitive PII

**GTM Strategy**:
- **Phase 1** (Months 1-3): Partner with 3-5 Aleo ecosystem events for pilot deployments
- **Phase 2** (Months 4-6): Integrate with major DAO platforms (Snapshot, Tally) for reputation
- **Phase 3** (Months 7-9): Launch professional credential marketplace for certifications
- **Phase 4** (Months 10-12): Enterprise sales for compliance use cases

**Revenue Model**:
- Freemium: Free for small events (<100 credentials), paid tiers for larger organizations
- Transaction fees: 0.1-0.5% on credential issuance for premium features
- Enterprise licensing: Custom deployments with SLA support

**Competitive Advantage**:
- First-mover on Aleo with production-ready credential system
- True privacy via ZK proofs (vs. pseudonymous blockchain credentials)
- Composable reputation across events, DAOs, and professional contexts

---

### **2. WORKING DEMO**

#### **Deployment Status**
✅ **Deployed on Aleo Testnet**
- **Program ID**: `credentify.aleo`
- **Network**: Aleo Testnet
- **Contract Explorer**: [View on Aleo Explorer](https://explorer.aleo.org/program/credentify.aleo)
- **Status**: Verified and Functional

#### **Functional Leo Smart Contracts**
✅ **Core Functions Implemented**:
- `initialize(admin)` - Initialize contract with first organizer
- `register_event(event_id)` - Register new event (organizers only)
- `issue_credential(recipient, event_id)` - Issue private credential to user
- `verify_credential(credential)` - Verify credential authenticity via ZK proof
- `verify_event_credential(credential, event_id)` - Verify credential for specific event
- `add_organizer(new_organizer)` - Add new organizer (admin only)
- `deactivate_event(event_id)` - Deactivate event (organizer only)
- `batch_issue(recipients[], event_id)` - Issue credentials in batch

#### **Live UI Demonstrating Core Features**
✅ **Production Application**: [aleocred.vercel.app](https://aleocred.vercel.app)

**Implemented Pages**:
1. **Landing Page** - Hero, features, stats, use cases with professional design
2. **Organizer Dashboard** - Event creation, credential issuance, management table
3. **User Credentials** - View credentials, generate ZK proofs, QR codes
4. **Verification** - Scan/upload proofs, verify on-chain
5. **Batch Issue** - CSV upload interface for bulk credential issuance
6. **Analytics** - Organizer metrics and insights dashboard
7. **DAO Reputation** - Governance participation tracking
8. **Professional Credentials** - Degrees, certifications management
9. **Settings** - Profile, notifications, security preferences
10. **Transaction History** - Track all credential operations

**Core Features Demonstrated**:
- Event registration and management
- Private credential issuance workflow
- Zero-knowledge proof generation with QR codes
- Credential verification interface
- Batch credential issuance
- Multi-credential type support (events, certifications, achievements)
- Responsive design (mobile, tablet, desktop)

---

### **3. TECHNICAL DOCUMENTATION**

#### **GitHub Repository**
✅ **Repository**: [github.com/AlexD-Great/AleoCred](https://github.com/AlexD-Great/AleoCred)

**Includes**:
- Complete source code (smart contracts + frontend)
- Comprehensive README with setup instructions
- Architecture documentation
- Deployment guides
- API reference for all contract functions

#### **Architecture Overview**

**System Architecture**:
```
┌─────────────────┐
│   Frontend UI   │ (React + TypeScript)
│  Vercel Deploy  │
└────────┬────────┘
         │
         ├─ Wallet Connection (Leo Wallet)
         │
         ▼
┌─────────────────┐
│  Aleo Testnet   │
│                 │
│  credentify.aleo│ (Smart Contract)
│                 │
│  - Events       │ (Public Registry)
│  - Credentials  │ (Private Records)
│  - Permissions  │ (Organizer System)
└─────────────────┘
```

**Data Flow**:
1. Organizer registers event → Public event registry updated
2. Organizer issues credential → Private record minted to user's wallet
3. User generates proof → ZK proof created from private credential
4. Verifier checks proof → On-chain verification without revealing credential details

**Smart Contract Architecture**:
- **Private Records**: Credentials stored as encrypted records in user wallets
- **Public Mappings**: Event registry with organizer permissions
- **Access Control**: Permission-based system for organizers and admins
- **Batch Operations**: Optimized for scalability

#### **Privacy Model Explanation**

**Privacy Guarantees**:
1. **Credential Privacy**: Credentials stored as private records, encrypted on-chain
2. **Selective Disclosure**: Users generate ZK proofs revealing only necessary information
3. **Unlinkability**: Multiple proofs from same user cannot be correlated
4. **Issuer Verification**: Verifiers confirm credential authenticity without seeing details
5. **No Data Leakage**: Verification happens on-chain without exposing private data

**Zero-Knowledge Proof Flow**:
```
User Credential (Private)
    ↓
ZK Proof Generation
    ↓
Proof Shared (Public)
    ↓
On-Chain Verification
    ↓
Result: Valid/Invalid (No credential details revealed)
```

**Technical Implementation**:
- Leo's `record` type ensures credentials are private by default
- Aleo's ZK-SNARK circuits enable proof generation without revealing inputs
- On-chain verification confirms proof validity without accessing private data
- Encrypted storage prevents unauthorized access to credential details

---

### **4. TEAM INFORMATION**

**Team Member**:
- **Name**: Adam
- **Discord Handle**: @Jessy0614
- **Aleo Wallet Address**: `aleo1t4wm8g9w5wakmhauffda9sg4tseefthlzzh9357qjh02k864s5yqhek79z`

---

### **5. PROGRESS CHANGELOG**

#### **Wave 1 - Foundation & Contract Deployment** ✅ COMPLETE

**What We Built**:
- Designed and deployed `credentify.aleo` smart contract to Aleo Testnet
- Implemented 8 core contract functions (register, issue, verify, batch, permissions)
- Built production-ready React + TypeScript frontend with 10 pages
- Created professional UI/UX with TailwindCSS and responsive design
- Developed reusable component library (modals, badges, stat cards, skeletons)
- Implemented credential management workflows for organizers and users
- Added ZK proof generation interface with QR code support
- Created comprehensive documentation and demo script
- Deployed live application to Vercel

**Feedback Incorporated**: N/A (First submission)

**Next Wave Goals** (Wave 2):
- Integrate Leo Wallet adapter for live transaction signing
- Enable end-to-end credential issuance flow on testnet
- Implement real-time transaction status tracking
- Add wallet balance and record queries
- Enhance error handling and user feedback
- Test batch credential issuance at scale

---

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
