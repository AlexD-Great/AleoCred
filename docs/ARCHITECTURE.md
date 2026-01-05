# AleoCred Architecture

## System Overview

AleoCred is built on a three-layer architecture leveraging Aleo's zero-knowledge capabilities.

```
┌─────────────────────────────────────────┐
│         Frontend Layer                  │
│   (React + TypeScript + Aleo SDK)       │
│  - Organizer Dashboard                  │
│  - User Credential Viewer               │
│  - Proof Generator Interface            │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│      Smart Contract Layer (Leo)         │
│  - Credential Issuance                  │
│  - Proof Verification                   │
│  - Access Control                       │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│         Aleo Blockchain                 │
│  - Private State (Records)              │
│  - Public State (Mappings)              │
│  - Zero-Knowledge Proofs                │
└─────────────────────────────────────────┘
```

## Core Components

### 1. Credential Record (Private State)

Each credential is a private record stored in the user's wallet:

```leo
record Credential {
    owner: address,
    event_id: field,
    issued_at: u32,
    issuer: address,
    metadata: field
}
```

**Privacy Properties**:
- Only the owner can see credential details
- Existence is hidden from public view
- Can generate proofs without revealing data

### 2. Event Registry (Public State)

Events are registered publicly for verification:

```leo
struct EventInfo {
    organizer: address,
    active: bool,
    issued_count: u32
}

mapping events: field => EventInfo;
```

### 3. Proof System

Users generate ZK proofs to demonstrate credential ownership:

**Proof Types**:
- **Existence Proof**: "I have a valid credential"
- **Attribute Proof**: "My credential has property X"
- **Threshold Proof**: "I have N+ credentials"

## Data Flow

### Credential Issuance Flow

```
1. Organizer creates event
   ├─> Event registered in public mapping
   └─> Event ID generated

2. Organizer issues credential
   ├─> Private record created
   ├─> Sent to user's address
   └─> Public counter incremented

3. User receives credential
   ├─> Stored in wallet as record
   └─> Can generate proofs
```

### Proof Verification Flow

```
1. User generates proof
   ├─> Selects credential from wallet
   ├─> Creates ZK proof of ownership
   └─> No credential data revealed

2. Verifier checks proof
   ├─> Validates ZK proof on-chain
   ├─> Confirms credential validity
   └─> Grants access
```

## Security Model

### Privacy Guarantees

1. **Credential Privacy**: Credentials are private records, invisible to observers
2. **Selective Disclosure**: Prove properties without revealing credential
3. **Unlinkability**: Multiple proofs cannot be linked to same user
4. **Forward Privacy**: Past credentials remain private even if new ones are public

### Access Control

1. **Issuer Authority**: Only authorized organizers can issue credentials
2. **Revocation**: Issuers can revoke credentials via public registry
3. **Expiration**: Time-based validity enforced in proofs

## Wave 1 Implementation

### Smart Contract Functions

```leo
// Issue a new credential to a user
transition issue_credential(
    receiver: address,
    event_id: field
) -> Credential

// Verify credential ownership (generates proof)
transition verify_credential(
    credential: Credential
) -> bool

// Register a new event (organizer only)
transition register_event(
    event_id: field
) -> Future
```

### Frontend Components

1. **Organizer Dashboard**
   - Create events
   - Issue credentials to attendees
   - View issuance statistics

2. **User Portal**
   - View owned credentials
   - Generate proofs
   - Share proof links

3. **Verifier Interface**
   - Check proof validity
   - Grant access based on proof

## Scalability Considerations

### Wave 1 (Current)
- Single event type
- Simple ownership proofs
- Manual issuance

### Future Waves
- Batch issuance (Wave 2)
- Composite proofs (Wave 3)
- Cross-credential verification (Wave 6)
- Automated issuance via oracles (Wave 8)

## Technology Stack

- **Smart Contracts**: Leo 3.4.0+
- **Frontend**: React 18+ with TypeScript
- **State Management**: React Context + Hooks
- **Aleo Integration**: @provable/sdk, @provable/wasm
- **Styling**: TailwindCSS
- **Build Tool**: Vite

## Deployment Strategy

### Development
- Local devnet for testing
- Rapid iteration on contract logic
- Frontend connected to local node

### Testnet
- Deploy to Aleo testnet
- Public testing with real users
- Performance monitoring

### Mainnet (Wave 10)
- Security audit completed
- Migration tools for testnet users
- Production monitoring
