# Wave 1: Basic Event Tickets

## Overview

Wave 1 establishes the foundation of AleoCred by implementing a simple event credential system where organizers can issue private tickets to attendees.

## Features Implemented

### Smart Contract (`aleocred.aleo`)

1. **Credential Record**
   - Private record stored in user's wallet
   - Contains: owner, event_id, issued_at, issuer
   - Fully encrypted and private

2. **Event Registry**
   - Public mapping of events
   - Tracks: organizer, active status, total issued count
   - Verifiable on-chain

3. **Core Functions**
   - `initialize`: Set up first organizer
   - `register_event`: Create new event (organizer only)
   - `issue_credential`: Mint credential to attendee
   - `verify_credential`: Generate ZK proof of ownership
   - `verify_event_credential`: Prove attendance at specific event
   - `add_organizer`: Grant organizer permissions
   - `deactivate_event`: Disable credential issuance

### Frontend Application

1. **Home Page**
   - Project overview and value proposition
   - How it works explanation
   - Use case examples

2. **Organizer Dashboard**
   - Create events
   - Issue credentials to attendees
   - View event statistics

3. **User Portal**
   - View owned credentials
   - Generate zero-knowledge proofs
   - Share proof links

## User Flows

### Organizer Flow

```
1. Connect wallet
2. Create event → Event registered on-chain
3. Issue credential to attendee address
4. Credential sent as private record
5. Track issuance count
```

### Attendee Flow

```
1. Connect wallet
2. Receive credential (private record)
3. View credential in wallet
4. Generate proof without revealing details
5. Share proof for verification
```

### Verifier Flow

```
1. Receive proof from user
2. Verify proof on-chain
3. Confirm credential validity
4. Grant access
```

## Technical Implementation

### Leo Program Structure

```leo
program aleocred.aleo {
    record Credential { ... }
    struct EventInfo { ... }
    mapping events: field => EventInfo;
    mapping organizers: address => bool;
    
    transition issue_credential(...) -> (Credential, Future)
    transition verify_credential(...) -> bool
}
```

### Frontend Stack

- **Framework**: React 18 + TypeScript
- **Routing**: React Router v6
- **Styling**: TailwindCSS
- **Wallet**: Aleo Wallet Adapter
- **Build**: Vite
- **Icons**: Lucide React

## Deliverables

✅ **Smart Contract**
- Fully functional Leo program
- Tested locally
- Ready for testnet deployment

✅ **Frontend Application**
- Responsive web interface
- Wallet integration
- Three main pages (Home, Organizer, User)

✅ **Documentation**
- README with setup instructions
- Architecture documentation
- This Wave 1 guide

## Testing Checklist

### Local Testing

- [ ] Install Rust and Leo CLI
- [ ] Build Leo program: `leo build`
- [ ] Run local tests: `leo run issue_credential aleo1... 1field 1u32`
- [ ] Start local devnet
- [ ] Deploy contract locally
- [ ] Test all transitions

### Frontend Testing

- [ ] Install dependencies: `npm install`
- [ ] Start dev server: `npm run dev`
- [ ] Connect wallet
- [ ] Test organizer dashboard
- [ ] Test user portal
- [ ] Verify responsive design

### Integration Testing

- [ ] Deploy to testnet
- [ ] Create test event
- [ ] Issue test credentials
- [ ] Generate proofs
- [ ] Verify proofs on-chain

## Next Steps (Wave 2)

Wave 2 will add:
- Credential expiration dates
- Revocation mechanism
- Batch issuance (up to 50 credentials at once)
- Discord bot for distribution
- Enhanced event management

## Known Limitations

1. **Single Event Type**: Only basic event credentials
2. **Manual Issuance**: One credential at a time (batch in Wave 2)
3. **No Expiration**: Credentials don't expire yet
4. **No Revocation**: Can't revoke issued credentials yet
5. **Simple Proofs**: Only ownership proofs (composite proofs in Wave 3)

## Security Considerations

- Credentials are private records (ZK by default)
- Only organizers can issue credentials
- Event registry is public for verification
- Proofs reveal no credential details
- On-chain verification ensures authenticity

## Gas Optimization

- Private records are cheaper than public state
- Minimal mapping operations
- Batch issuance for efficiency (Wave 2)
- Optimized data structures

## Success Metrics

- ✅ Contract compiles without errors
- ✅ All transitions execute successfully
- ✅ Frontend builds and runs
- ✅ Wallet integration works
- ⏳ Deployed to testnet
- ⏳ 3 test events created
- ⏳ 10+ credentials issued

## Resources

- Contract: `contracts/aleocred/src/main.leo`
- Frontend: `frontend/src/`
- Docs: `docs/`
