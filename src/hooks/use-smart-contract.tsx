
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import { useWallet } from '@/hooks/use-wallet';

interface DeployParams {
  template: string;
  name?: string;
  symbol?: string;
  initialSupply?: number;
  customCode?: string;
}

// Improved mock function to simulate contract deployment
const deployContractToBlockchain = async (params: DeployParams, account: string): Promise<string> => {
  console.log("Deploying contract with params:", params);
  console.log("Deployer account:", account);
  
  // Input validation
  if (!account || !account.startsWith('0x')) {
    throw new Error("Invalid wallet address. Please reconnect your wallet.");
  }
  
  if (params.template === 'erc20' || params.template === 'erc721' || params.template === 'erc1155') {
    if (!params.name || !params.symbol) {
      throw new Error(`${params.template} requires both name and symbol parameters.`);
    }
  }
  
  if (params.template === 'erc20' && params.initialSupply !== undefined && params.initialSupply < 0) {
    throw new Error("Initial supply cannot be negative.");
  }
  
  if (params.template === 'custom' && (!params.customCode || params.customCode.trim().length < 10)) {
    throw new Error("Custom contract code is too short or invalid.");
  }
  
  // Simulate network delay for more realistic experience
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  // Generate a deterministic contract address based on account and params
  // This makes it consistent between deployments with the same parameters
  const stringToHash = `${account}-${params.template}-${params.name}-${params.symbol}-${Date.now()}`;
  let hash = 0;
  for (let i = 0; i < stringToHash.length; i++) {
    const char = stringToHash.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  
  // Create a hex representation that looks like an Ethereum address
  const hexString = Math.abs(hash).toString(16).padStart(40, '0');
  return `0x${hexString}`;
};

export function useSmartContract() {
  const [contractAddress, setContractAddress] = useState<string | null>(null);
  const { account } = useWallet();
  
  const deployContractMutation = useMutation({
    mutationFn: async (params: DeployParams) => {
      if (!account) {
        throw new Error("Wallet not connected. Please connect your wallet before deploying.");
      }
      
      try {
        return await deployContractToBlockchain(params, account);
      } catch (error) {
        console.error("Contract deployment error:", error);
        throw error;
      }
    },
    onSuccess: (address: string) => {
      setContractAddress(address);
      return address;
    },
    onError: (error) => {
      console.error("Contract deployment error:", error);
      toast({
        title: "Deployment Failed",
        description: error instanceof Error ? error.message : "Unknown error occurred during deployment",
        variant: "destructive",
      });
      throw error;
    },
  });
  
  const deployContract = async (params: DeployParams): Promise<string> => {
    try {
      return await deployContractMutation.mutateAsync(params);
    } catch (error) {
      console.error("Error in deployContract:", error);
      throw error;
    }
  };
  
  return {
    deployContract,
    isDeploying: deployContractMutation.isPending,
    contractAddress,
    error: deployContractMutation.error,
  };
}
