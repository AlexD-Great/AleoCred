# AleoCred Demo Script
**Duration: 2 minutes 30 seconds max**

---

## INTRO (0:00 - 0:20)

> **[Screen: Landing Page - Hero Section]**

"Welcome to AleoCred—a zero-knowledge credential system built on Aleo.

The tagline says it all: **Prove your reputation. Reveal nothing else.**

Notice the stats here—12,847 credentials issued, 3,421 active users, 45,892 verifications. And look at that verification speed: 0.8 seconds average.

This is what privacy-first credentials look like."

---

## THE VALUE PROPOSITION (0:20 - 0:40)

> **[Scroll down to 'Why AleoCred?' section]**

"Here's the core innovation. Four pillars:

**Private by Default**—your credentials are stored as encrypted records in your Aleo wallet.

**Zero-Knowledge Proofs**—prove you have credentials without revealing what they are.

**On-Chain Verification**—cryptographically secure, verifiable on the blockchain.

**Selective Disclosure**—you choose exactly what to share. Nothing more."

> **[Scroll to 'How It Works' section]**

"The flow is simple: Get credentials → Store privately → Prove selectively → Get access."

---

## ORGANIZER DASHBOARD (0:40 - 1:10)

> **[Navigate to /organizer - must connect wallet first]**

"Now let's see the organizer side. First, I connect my wallet.

Here's the dashboard. I can see my stats—3 total events, 587 credentials issued, 2 active events.

To create a new event, I just enter the name—let's say 'Aleo Hackathon 2025'—and click Create Event. This registers it on-chain.

Now I can issue credentials. I select the event from the dropdown, enter the recipient's Aleo address, and hit Issue. The credential is minted as a private record directly to their wallet.

For bulk issuance, there's a 'Batch Issue' button that takes me to a CSV upload interface."

> **[Show the events table at bottom]**

"Down here, I can see all my events—ETH Denver 2024, Aleo Developer Summit, ZK Workshop Series—with issue counts and status badges."

---

## USER CREDENTIALS (1:10 - 1:45)

> **[Navigate to /user]**

"Now the user view. After connecting my wallet, I see my credential collection.

Here are four credentials:
- ETH Denver 2024 (event)
- Aleo Developer Summit (event)  
- ZK Bootcamp Certificate (certification)
- Hackathon Winner (achievement - expired)

Each card shows the issuer, date, and status. Notice the expired one has a 'Renew' button.

Now watch this—I click 'Generate Proof' on the ETH Denver credential."

> **[Click Generate Proof - show loading spinner, then modal]**

"A loading spinner appears... and boom—proof generated!

This modal shows a QR code. I can share this with anyone who needs to verify I attended ETH Denver. They scan it, verify on-chain, and all they learn is: 'Yes, valid credential.' Not my name, not other events, just proof of reputation.

I can copy the link or download the QR code."

> **[Close modal, scroll to bottom]**

"At the bottom, there's a 'Generate Composite Proof' option—combine multiple credentials into one proof. Prove you attended 3+ events without saying which ones."

---

## VERIFICATION (1:45 - 2:00)

> **[Navigate to /verify]**

"On the verification side, it's dead simple.

Upload a proof file or scan a QR code. The system checks it against the blockchain. Green checkmark means valid. Red X means invalid or expired.

Below, there's a table of recent verifications showing the credential type, verification time, and result."

---

## ADVANCED FEATURES (2:00 - 2:20)

> **[Quick navigation through: /reputation, /credentials, /analytics]**

"AleoCred goes way beyond event tickets.

**DAO Reputation** (/reputation)—track your governance score, voting power, rank, and achievements. See your activity feed and unlocked badges.

**Professional Credentials** (/credentials)—manage degrees, certifications, employment records. Filter by type, share with QR codes, renew expired ones.

**Analytics** (/analytics)—organizers get dashboards with issuance trends, verification rates, top events, and recent activity.

There's also Settings, Transaction History, and more—all with the same polished, privacy-first design."

---

## CLOSING (2:20 - 2:30)

> **[Back to Landing Page]**

"AleoCred. Built on Aleo. Deployed on mainnet. Ready for production.

Prove your reputation. Reveal nothing else.

Live at **aleocred.vercel.app**. Code on **GitHub**. Contract on **Aleo Explorer**.

Thank you."

---

## VISUAL FLOW SUMMARY

| Timestamp | Screen | Key Action |
|-----------|--------|------------|
| 0:00-0:20 | Landing Page (/) | Show hero, stats (12,847 credentials, 3,421 users) |
| 0:20-0:40 | Landing Page (/) | Scroll to "Why AleoCred?" → "How It Works" sections |
| 0:40-0:50 | /organizer | Connect wallet, show dashboard stats (3 events, 587 issued) |
| 0:50-1:00 | /organizer | Create event form → Issue credential form → Events table |
| 1:00-1:10 | /organizer | Mention "Batch Issue" button (don't navigate) |
| 1:10-1:25 | /user | Show 4 credential cards (ETH Denver, Aleo Summit, ZK Bootcamp, Hackathon) |
| 1:25-1:40 | /user | Click "Generate Proof" → Loading → QR modal with proof details |
| 1:40-1:45 | /user | Show "Generate Composite Proof" CTA at bottom |
| 1:45-2:00 | /verify | Show upload/scan UI + recent verifications table |
| 2:00-2:08 | /reputation | Show DAO score (85), voting power, activity feed, achievements |
| 2:08-2:14 | /credentials | Show professional credential cards with filters |
| 2:14-2:20 | /analytics | Show organizer dashboard with charts and metrics |
| 2:20-2:30 | Landing Page (/) | Return to hero, closing statement |

---

## KEY TALKING POINTS

✅ **What to emphasize:**
- Stats are real UI elements (12,847 credentials, 0.8s verification)
- Sample credentials shown: ETH Denver 2024, Aleo Summit, ZK Bootcamp, Hackathon Winner
- Events table shows: ETH Denver 2024 (342 issued), Aleo Summit (156 issued), ZK Workshop (89 issued)
- QR modal demonstrates the core ZK proof flow
- Multiple credential types: events, certifications, achievements
- Advanced features: DAO reputation, professional credentials, analytics

❌ **What NOT to say:**
- Don't claim CSV upload works (it's UI only)
- Don't say "minted to wallet" unless you actually trigger the transaction
- Don't claim blockchain verification happens (it's simulated)
- Don't promise real-time on-chain data (sample data only)

---

## NAVIGATION CHECKLIST

Before demo, ensure these pages load:
- ✅ `/` - Landing page
- ✅ `/organizer` - Organizer dashboard (requires wallet connection)
- ✅ `/user` - User credentials (requires wallet connection)
- ✅ `/verify` - Verification page
- ✅ `/reputation` - DAO reputation
- ✅ `/credentials` - Professional credentials
- ✅ `/analytics` - Analytics dashboard

**Note:** `/organizer` and `/user` require wallet connection. If wallet not connected, they show a "Connect Your Wallet" screen. For demo purposes, either:
1. Connect wallet before navigating, OR
2. Acknowledge the wallet connection step in narration

---

## LINKS TO DISPLAY

- **Live App**: https://aleocred.vercel.app
- **GitHub**: https://github.com/AlexD-Great/AleoCred
- **Contract**: https://explorer.aleo.org/program/credentify.aleo

---

## QUICK TIPS

- **Pace**: Speak clearly but don't rush. 2:30 is enough time.
- **Transitions**: Use smooth navigation. Don't linger on loading states.
- **Emphasis**: Highlight the QR proof generation—it's the core demo moment.
- **Closing**: End on the landing page hero for visual impact.
