# Deployment Guide

## Frontend Deployment to Vercel

### Prerequisites
- Vercel account (sign up at https://vercel.com)
- GitHub repository connected

### Option 1: Deploy via Vercel Dashboard

1. Go to https://vercel.com/new
2. Import your GitHub repository: `AlexD-Great/AleoCred`
3. Configure project:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Add Environment Variables:
   - `VITE_NETWORK`: `testnet`
   - `VITE_ENDPOINT`: `https://api.explorer.provable.com/v1`
   - `VITE_PROGRAM_ID`: `credentify.aleo`
5. Click "Deploy"

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy from project root
cd C:\Users\shelby\Desktop\AleoCred
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? AleoCred
# - Directory? ./frontend
# - Override settings? No

# For production deployment
vercel --prod
```

### Environment Variables

After deployment, add these environment variables in Vercel dashboard:

```
VITE_NETWORK=testnet
VITE_ENDPOINT=https://api.explorer.provable.com/v1
VITE_PROGRAM_ID=credentify.aleo
```

---

## Smart Contract Deployment to Aleo Testnet

### Prerequisites
- Leo CLI installed
- Aleo account with testnet credits

### Steps

1. **Generate Account** (if you don't have one)
```bash
cd contracts/aleocred
leo account new
```

Save your private key securely!

2. **Get Testnet Credits**
- Visit: https://faucet.aleo.org
- Enter your address
- Request testnet credits

3. **Deploy Contract**
```bash
leo deploy --broadcast
```

4. **Save Program ID**
After deployment, note the program ID and update:
- Frontend environment variable: `VITE_PROGRAM_ID`
- Update in Vercel dashboard

### Testing Deployment

```bash
# Initialize organizer
leo run initialize <admin_address>

# Register event
leo run register_event <event_id>

# Issue credential
leo run issue_credential <receiver_address> <event_id> <timestamp>
```

---

## Post-Deployment

### Update Frontend with Deployed Contract

1. Update `frontend/.env`:
```
VITE_PROGRAM_ID=<your_deployed_program_id>
```

2. Redeploy frontend:
```bash
vercel --prod
```

### Verify Deployment

1. **Frontend**: Visit your Vercel URL
2. **Contract**: Check on Aleo Explorer
   - https://explorer.aleo.org/program/<your_program_id>

---

## Troubleshooting

### Frontend Issues

**Build fails on Vercel:**
- Check Node.js version (should be 18+)
- Verify all dependencies in package.json
- Check build logs in Vercel dashboard

**Wallet connection fails:**
- Ensure Aleo wallet extension is installed
- Check network is set to testnet
- Verify VITE_NETWORK environment variable

### Contract Issues

**Deployment fails:**
- Ensure you have testnet credits
- Check program name doesn't contain "aleo"
- Verify Leo CLI version: `leo --version`

**Transaction fails:**
- Check account has sufficient credits
- Verify program is deployed
- Check function parameters are correct

---

## Monitoring

### Frontend
- Vercel Analytics: https://vercel.com/dashboard/analytics
- Check deployment logs for errors

### Contract
- Aleo Explorer: https://explorer.aleo.org
- Monitor transactions and program state

---

## Updating

### Frontend Updates
```bash
git add .
git commit -m "Update frontend"
git push origin main
# Vercel auto-deploys on push
```

### Contract Updates
```bash
# Rebuild contract
leo build

# Deploy new version
leo deploy --broadcast

# Update VITE_PROGRAM_ID in Vercel
```
