import { ReactNode, useMemo } from 'react';
import { WalletProvider as AleoWalletProvider, useWallet as useAleoWallet } from '@demox-labs/aleo-wallet-adapter-react';
import { WalletModalProvider } from '@demox-labs/aleo-wallet-adapter-reactui';
import { LeoWalletAdapter } from '@demox-labs/aleo-wallet-adapter-leo';
import { DecryptPermission, WalletAdapterNetwork } from '@demox-labs/aleo-wallet-adapter-base';

import '@demox-labs/aleo-wallet-adapter-reactui/styles.css';

export type WalletType = 'Leo Wallet';

export function WalletProvider({ children }: { children: ReactNode }) {
  const wallets = useMemo(
    () => [
      new LeoWalletAdapter({
        appName: 'AleoCred',
      }),
    ],
    []
  );

  return (
    <AleoWalletProvider
      wallets={wallets}
      decryptPermission={DecryptPermission.NoDecrypt}
      network={WalletAdapterNetwork.Testnet}
      autoConnect={false}
    >
      <WalletModalProvider>{children}</WalletModalProvider>
    </AleoWalletProvider>
  );
}

// Re-export the wallet hook with our custom interface
export function useWallet() {
  const wallet = useAleoWallet();
  
  return {
    account: wallet.publicKey ? { address: wallet.publicKey, network: 'testnet' } : null,
    isConnecting: wallet.connecting,
    isConnected: wallet.connected,
    hasWallet: !!wallet.wallet,
    connect: async (_type: WalletType) => {
      if (!wallet.wallet) {
        throw new Error('Leo Wallet extension not found. Please install it from https://leo.app/');
      }
      await wallet.connect(DecryptPermission.NoDecrypt, WalletAdapterNetwork.Testnet);
    },
    disconnect: () => wallet.disconnect(),
    requestTransaction: async (programId: string, functionName: string, inputs: string[]): Promise<string> => {
      if (!wallet.requestTransaction) {
        throw new Error('Transaction request not supported');
      }
      
      // Use the wallet adapter's transaction request with proper structure
      const txId = await wallet.requestTransaction({
        address: wallet.publicKey || '',
        chainId: 'testnet3',
        fee: 1000000,
        feePrivate: false,
        transitions: [{
          program: programId,
          functionName: functionName,
          inputs: inputs,
        }],
      });
      
      return txId;
    },
  };
}
