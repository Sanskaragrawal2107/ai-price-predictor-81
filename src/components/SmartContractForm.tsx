
import React, { useState } from 'react';
import { useWallet } from '@/hooks/use-wallet';
import { useSmartContract } from '@/hooks/use-smart-contract';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { Loader2, Upload, Check, Code, AlertCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';

const CONTRACT_TEMPLATES = [
  {
    id: 'erc20',
    name: 'ERC-20 Token',
    description: 'A standard interface for fungible tokens.',
  },
  {
    id: 'erc721',
    name: 'ERC-721 NFT',
    description: 'A standard interface for non-fungible tokens.',
  },
  {
    id: 'erc1155',
    name: 'ERC-1155 Multi-Token',
    description: 'A standard interface for contracts that manage multiple token types.',
  },
  {
    id: 'custom',
    name: 'Custom Contract',
    description: 'Upload or write your own custom smart contract.',
  },
];

const SmartContractForm: React.FC = () => {
  const { isConnected, connect, account } = useWallet();
  const { deployContract, isDeploying, contractAddress } = useSmartContract();
  
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [contractName, setContractName] = useState('');
  const [contractSymbol, setContractSymbol] = useState('');
  const [initialSupply, setInitialSupply] = useState('');
  const [customCode, setCustomCode] = useState('');
  const [deployStep, setDeployStep] = useState(1);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  const validateForm = () => {
    if (!isConnected) {
      setErrorMessage("Wallet not connected. Please connect your wallet first.");
      return false;
    }
    
    if (!selectedTemplate) {
      setErrorMessage("No template selected. Please select a contract template.");
      return false;
    }
    
    if (selectedTemplate !== 'custom' && (!contractName || !contractSymbol)) {
      setErrorMessage("Missing required fields. Please fill in all required fields.");
      return false;
    }
    
    if (selectedTemplate === 'custom' && !customCode) {
      setErrorMessage("No contract code provided. Please write or paste your contract code.");
      return false;
    }
    
    setErrorMessage(null);
    return true;
  };
  
  const handleDeploy = async () => {
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: errorMessage,
        variant: "destructive",
      });
      return;
    }
    
    try {
      setDeployStep(2);
      
      const params = {
        template: selectedTemplate,
        name: contractName,
        symbol: contractSymbol,
        initialSupply: initialSupply ? parseInt(initialSupply) : 0,
        customCode: selectedTemplate === 'custom' ? customCode : '',
      };
      
      const deployedAddress = await deployContract(params);
      setDeployStep(3);
      
      toast({
        title: "Contract Deployed Successfully",
        description: `Your contract has been deployed to address: ${deployedAddress.slice(0, 10)}...`,
      });
    } catch (error) {
      setDeployStep(1);
      setErrorMessage(error instanceof Error ? error.message : "Unknown error occurred");
      toast({
        title: "Deployment Failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive",
      });
    }
  };
  
  const resetForm = () => {
    setSelectedTemplate(null);
    setContractName('');
    setContractSymbol('');
    setInitialSupply('');
    setCustomCode('');
    setDeployStep(1);
    setErrorMessage(null);
  };

  // Display the error message if present
  const ErrorDisplay = () => {
    if (!errorMessage) return null;
    
    return (
      <div className="bg-destructive/10 text-destructive p-4 rounded-lg mb-6 flex items-start">
        <AlertCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
        <p>{errorMessage}</p>
      </div>
    );
  };
  
  return (
    <div className="space-y-8">
      {!isConnected ? (
        <Card className="p-8 shadow-sm text-center">
          <Code className="w-16 h-16 mx-auto text-primary mb-4" />
          <h3 className="text-xl font-medium mb-4">Connect Your Wallet</h3>
          <p className="text-foreground/70 mb-6">
            You need to connect your wallet to deploy a smart contract.
          </p>
          <Button onClick={connect} size="lg">
            Connect Wallet
          </Button>
        </Card>
      ) : (
        <>
          {deployStep === 1 && (
            <Card className="p-8 shadow-sm">
              <h3 className="text-xl font-medium mb-6">Choose Contract Template</h3>
              
              <ErrorDisplay />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {CONTRACT_TEMPLATES.map((template) => (
                  <div
                    key={template.id}
                    className={`border rounded-xl p-6 cursor-pointer transition-all ${
                      selectedTemplate === template.id 
                        ? 'border-primary ring-2 ring-primary/30' 
                        : 'border-border hover:border-primary/30'
                    }`}
                    onClick={() => setSelectedTemplate(template.id)}
                  >
                    <h4 className="font-medium mb-2">{template.name}</h4>
                    <p className="text-sm text-foreground/70">{template.description}</p>
                  </div>
                ))}
              </div>
              
              {selectedTemplate && selectedTemplate !== 'custom' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="contractName">Contract Name *</Label>
                      <Input
                        id="contractName"
                        value={contractName}
                        onChange={(e) => setContractName(e.target.value)}
                        placeholder="My Token"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contractSymbol">Token Symbol *</Label>
                      <Input
                        id="contractSymbol"
                        value={contractSymbol}
                        onChange={(e) => setContractSymbol(e.target.value)}
                        placeholder="MTK"
                      />
                    </div>
                  </div>
                  
                  {selectedTemplate === 'erc20' && (
                    <div className="space-y-2">
                      <Label htmlFor="initialSupply">Initial Supply</Label>
                      <Input
                        id="initialSupply"
                        type="number"
                        value={initialSupply}
                        onChange={(e) => setInitialSupply(e.target.value)}
                        placeholder="1000000"
                      />
                      <p className="text-xs text-foreground/70">
                        The initial amount of tokens that will be minted to your wallet.
                      </p>
                    </div>
                  )}
                </div>
              )}
              
              {selectedTemplate === 'custom' && (
                <div className="space-y-2">
                  <Label htmlFor="customCode">Contract Code</Label>
                  <Textarea
                    id="customCode"
                    value={customCode}
                    onChange={(e) => setCustomCode(e.target.value)}
                    placeholder="// Paste your contract code here"
                    className="font-mono h-64"
                  />
                </div>
              )}
              
              {selectedTemplate && (
                <div className="mt-8">
                  <Button 
                    onClick={handleDeploy}
                    disabled={
                      (selectedTemplate !== 'custom' && (!contractName || !contractSymbol)) ||
                      (selectedTemplate === 'custom' && !customCode) ||
                      isDeploying
                    }
                    size="lg"
                    className="w-full md:w-auto"
                  >
                    {isDeploying ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Deploying...
                      </>
                    ) : (
                      <>
                        <Upload className="mr-2" />
                        Deploy Contract
                      </>
                    )}
                  </Button>
                </div>
              )}
            </Card>
          )}
          
          {deployStep === 2 && (
            <Card className="p-8 shadow-sm text-center">
              <Loader2 className="w-16 h-16 mx-auto text-primary mb-4 animate-spin" />
              <h3 className="text-xl font-medium mb-4">Deploying Contract</h3>
              <p className="text-foreground/70">
                Please confirm the transaction in your wallet and wait for the deployment to complete.
              </p>
              <div className="mt-6 text-xs text-foreground/60 max-w-md mx-auto">
                <p>Deploying as: {account ? `${account.slice(0, 6)}...${account.slice(-4)}` : 'Unknown'}</p>
                <p className="mt-1">This may take a minute. Please do not refresh the page.</p>
              </div>
            </Card>
          )}
          
          {deployStep === 3 && (
            <Card className="p-8 shadow-sm text-center">
              <Check className="w-16 h-16 mx-auto text-green-500 mb-4" />
              <h3 className="text-xl font-medium mb-4">Contract Deployed Successfully</h3>
              <p className="text-foreground/70 mb-2">
                Your contract has been deployed to the blockchain.
              </p>
              <p className="font-mono text-sm bg-muted p-3 rounded-md mb-6 break-all">
                {contractAddress}
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <Button
                  onClick={() => window.open(`https://etherscan.io/address/${contractAddress}`, '_blank')}
                  variant="outline"
                >
                  View on Explorer
                </Button>
                <Button onClick={resetForm}>
                  Deploy Another Contract
                </Button>
              </div>
            </Card>
          )}
        </>
      )}
    </div>
  );
};

export default SmartContractForm;
