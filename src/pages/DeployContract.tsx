
import React from 'react';
import Layout from '@/components/Layout';
import SmartContractForm from '@/components/SmartContractForm';

const DeployContract: React.FC = () => {
  return (
    <Layout>
      <div className="container max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Deploy Smart Contract</h1>
        <div className="mb-8">
          <p className="text-foreground/70 mb-4">
            Deploy your own smart contract to the blockchain with our easy-to-use interface.
            Connect your wallet, customize your contract, and deploy with just a few clicks.
          </p>
          
          <div className="rounded-lg bg-muted p-4">
            <h3 className="text-lg font-medium mb-2">How it works:</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Connect your wallet using the MetaMask browser extension</li>
              <li>Choose a contract template (ERC-20, ERC-721, ERC-1155, or custom)</li>
              <li>Configure your contract parameters (name, symbol, supply)</li>
              <li>Deploy your contract to the blockchain</li>
              <li>View your deployed contract on the blockchain explorer</li>
            </ol>
            <p className="mt-4 text-xs text-foreground/60">
              Note: This is a simulated deployment for demonstration purposes. No actual blockchain transactions will be made.
            </p>
          </div>
        </div>
        
        <SmartContractForm />
      </div>
    </Layout>
  );
};

export default DeployContract;
