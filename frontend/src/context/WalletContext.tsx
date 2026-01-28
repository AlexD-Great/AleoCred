import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface WalletContextType {
  connected: boolean;
  address: string | null;
  connecting: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

declare global {
  interface Window {
    leoWallet?: {
      connect: () => Promise<{ address: string }>;
      disconnect: () => Promise<void>;
      on: (event: string, callback: (data: any) => void) => void;
    };
    puzzle?: {
      connect: () => Promise<{ address: string }>;
      disconnect: () => Promise<void>;
    };
  }
}

export function WalletProvider({ children }: { children: ReactNode }) {
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [connecting, setConnecting] = useState(false);

  useEffect(() => {
    const savedAddress = localStorage.getItem('aleo_address');
    if (savedAddress) {
      setAddress(savedAddress);
      setConnected(true);
    }
  }, []);

  const connect = async () => {
    setConnecting(true);
    try {
      if (window.leoWallet) {
        const result = await window.leoWallet.connect();
        setAddress(result.address);
        setConnected(true);
        localStorage.setItem('aleo_address', result.address);
      } else if (window.puzzle) {
        const result = await window.puzzle.connect();
        setAddress(result.address);
        setConnected(true);
        localStorage.setItem('aleo_address', result.address);
      } else {
        alert('Please install Leo Wallet or Puzzle Wallet extension');
        window.open('https://leo.app/', '_blank');
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      alert('Failed to connect wallet. Please try again.');
    } finally {
      setConnecting(false);
    }
  };

  const disconnect = () => {
    setConnected(false);
    setAddress(null);
    localStorage.removeItem('aleo_address');
    if (window.leoWallet) {
      window.leoWallet.disconnect();
    }
  };

  return (
    <WalletContext.Provider value={{ connected, address, connecting, connect, disconnect }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}
