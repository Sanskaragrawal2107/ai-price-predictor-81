
import { useState, useEffect, useCallback } from 'react';
import { toast } from '@/hooks/use-toast';
import { CHAIN_ID } from '@/lib/env';

interface WalletState {
  isConnected: boolean;
  account: string | null;
  chainId: string | null;
  balance: string | null;
}

export function useWallet() {
  const [walletState, setWalletState] = useState<WalletState>({
    isConnected: false,
    account: null,
    chainId: null,
    balance: null
  });

  // Initialize and set up event listeners for wallet changes
  useEffect(() => {
    const checkIfWalletIsConnected = async () => {
      try {
        // Check if window.ethereum is available
        if (!window.ethereum) {
          console.log('Make sure you have MetaMask installed!');
          return;
        }
        
        // Check if we're authorized to access the user's wallet
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        
        if (accounts.length !== 0) {
          const account = accounts[0];
          const chainId = await window.ethereum.request({ method: 'eth_chainId' });
          
          setWalletState({
            isConnected: true,
            account,
            chainId,
            balance: null
          });
        }
      } catch (error) {
        console.error('Error checking if wallet is connected:', error);
      }
    };

    checkIfWalletIsConnected();

    // Set up listeners for account and chain changes
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length === 0) {
          // User disconnected their wallet
          setWalletState({
            isConnected: false,
            account: null,
            chainId: null,
            balance: null
          });
          toast({
            title: "Wallet Disconnected",
            description: "Your wallet has been disconnected.",
          });
        } else {
          // User switched accounts
          setWalletState(prev => ({
            ...prev,
            account: accounts[0],
          }));
          toast({
            title: "Account Changed",
            description: `Connected to ${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`,
          });
        }
      });

      window.ethereum.on('chainChanged', (chainId: string) => {
        setWalletState(prev => ({
          ...prev,
          chainId,
        }));
        toast({
          title: "Network Changed",
          description: "The blockchain network has been changed.",
        });
        window.location.reload();
      });
    }

    return () => {
      // Remove listeners when component unmounts
      if (window.ethereum) {
        window.ethereum.removeAllListeners('accountsChanged');
        window.ethereum.removeAllListeners('chainChanged');
      }
    };
  }, []);

  // Connect wallet function
  const connect = useCallback(async () => {
    try {
      if (!window.ethereum) {
        toast({
          title: "Wallet Not Found",
          description: "Please install MetaMask or another Ethereum wallet to continue.",
          variant: "destructive",
        });
        return;
      }

      // Request account access
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      
      // Check if the user is on the correct network
      if (chainId !== CHAIN_ID) {
        try {
          // Try to switch to the correct network
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: CHAIN_ID }],
          });
        } catch (switchError: any) {
          // If the chain is not added to MetaMask, we can't switch automatically
          toast({
            title: "Network Error",
            description: `Please switch to the correct network in your wallet. Chain ID: ${CHAIN_ID}`,
            variant: "destructive",
          });
        }
      }

      setWalletState({
        isConnected: true,
        account: accounts[0],
        chainId,
        balance: null
      });

      toast({
        title: "Wallet Connected",
        description: `Connected to ${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`,
      });
    } catch (error) {
      console.error('Error connecting wallet:', error);
      toast({
        title: "Connection Failed",
        description: "Failed to connect to your wallet. Please try again.",
        variant: "destructive",
      });
    }
  }, []);

  // Disconnect wallet function
  const disconnect = useCallback(() => {
    setWalletState({
      isConnected: false,
      account: null,
      chainId: null,
      balance: null
    });
    
    toast({
      title: "Wallet Disconnected",
      description: "You have successfully disconnected your wallet.",
    });
  }, []);

  return {
    ...walletState,
    connect,
    disconnect
  };
}

// Add Ethereum provider types
declare global {
  interface Window {
    ethereum?: {
      isMetaMask?: boolean;
      request: (request: { method: string; params?: Array<any> }) => Promise<any>;
      on: (event: string, listener: (...args: any[]) => void) => void;
      removeListener: (event: string, listener: (...args: any[]) => void) => void;
      removeAllListeners: (event: string) => void;
    };
  }
}
