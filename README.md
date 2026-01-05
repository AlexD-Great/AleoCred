# AleoCred - Private Verifiable Credential System

**Tagline**: Prove your reputation. Reveal nothing else.

## Overview

AleoCred is a zero-knowledge credential system where users accumulate verifiable reputation as private ZK assets, enabling selective disclosure without exposure. Built on Aleo blockchain.

## The Problem

Public reputation in Web3 exposes everything:
- **DAOs**: Voting history and holdings are public - competitors see your strategy
- **Job Hunting**: Must reveal all credentials to prove qualifications
- **Event Access**: Attendance history creates public travel footprint
- **KYC/Compliance**: Expose all personal data every verification

## Our Solution

Collect credentials as private ZK tokens in your Aleo wallet. Prove you have them without revealing what they are or who issued them.

### How It Works

1. **Get Credentials**: Organizations issue private tokens for achievements
2. **Store Privately**: Encrypted in your Aleo wallet
3. **Prove Selectively**: Generate ZK proofs like "I have X but not Y"
4. **Get Access**: Share just the proof, no raw data

## Current Status: Wave 1

### Wave 1: Basic Event Tickets
Building the foundation for private event credentials.

**Features**:
- Smart contract to mint private event tickets
- Web app for event organizers to issue tickets
- User interface to prove attendance without revealing which event

**Deliverables**:
- Live demo on Aleo testnet
- Basic frontend website
- 3 test events created

## Tech Stack

- **Smart Contracts**: Leo (Aleo's programming language)
- **Frontend**: React + TypeScript
- **Blockchain**: Aleo Testnet
- **SDK**: @provable/sdk, @provable/wasm

## Project Structure

```
AleoCred/
├── contracts/          # Leo smart contracts
│   └── aleocred/      # Main credential program
├── frontend/          # React web application
├── docs/              # Documentation
└── README.md
```

## Getting Started

### Prerequisites

- Rust (latest stable)
- Leo CLI 3.4.0+
- Node.js 22+
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/AleoCred.git
cd AleoCred

# Install Leo program dependencies
cd contracts/aleocred
leo build

# Install frontend dependencies
cd ../../frontend
npm install
```

### Running Locally

```bash
# Terminal 1: Start local Aleo devnet
leo devnet --storage tmp --clear-storage

# Terminal 2: Deploy contract
cd contracts/aleocred
leo deploy --broadcast

# Terminal 3: Start frontend
cd frontend
npm run dev
```

## Roadmap

### Phase 1: Simple Event Credentials (Waves 1-3)
- ✅ Wave 1: Basic Event Tickets
- ⏳ Wave 2: Ticket Features (expiration, revocation, batch issuance)
- ⏳ Wave 3: Multiple Events (composite proofs, QR codes)

### Phase 2: DAO Reputation (Waves 4-6)
- ⏳ Wave 4: DAO Voting Power
- ⏳ Wave 5: Contributor Reputation
- ⏳ Wave 6: Cross-DAO Recognition

### Phase 3: Professional Use (Waves 7-9)
- ⏳ Wave 7: Professional Credentials
- ⏳ Wave 8: Compliance Tools
- ⏳ Wave 9: Mainnet Ready

### Phase 4: Launch (Wave 10)
- ⏳ Wave 10: Production Launch

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

## License

MIT License - see LICENSE file for details

## Contact

- Website: [Coming Soon]
- Twitter: [Coming Soon]
- Discord: [Coming Soon]

---

**Built with ❤️ on Aleo**
