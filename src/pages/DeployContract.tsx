
import React from 'react';
import Layout from '@/components/Layout';
import SmartContractForm from '@/components/SmartContractForm';

const DeployContract: React.FC = () => {
  return (
    <Layout>
      <div className="container max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Deploy Smart Contract</h1>
        <div className="mb-8">
          <p className="text-foreground/70">
            Deploy your own smart contract to the blockchain with our easy-to-use interface.
            Connect your wallet, customize your contract, and deploy with just a few clicks.
          </p>
        </div>
        
        <SmartContractForm />
      </div>
    </Layout>
  );
};

export default DeployContract;
