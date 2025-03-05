
import React, { useState } from 'react';
import { VerificationResult } from '@/lib/types';
import { toast } from '@/components/ui/use-toast';

const VerificationPanel: React.FC = () => {
  const [hash, setHash] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [result, setResult] = useState<VerificationResult | null>(null);
  
  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!hash.trim()) {
      toast({
        variant: "destructive",
        title: "Verification failed",
        description: "Please enter a valid verification hash",
      });
      return;
    }
    
    setIsVerifying(true);
    
    // Simulate API verification
    setTimeout(() => {
      // Mock success for demo (would be actual verification in production)
      const mockResult: VerificationResult = {
        isVerified: hash.startsWith('0x'),
        originalTimestamp: new Date().toISOString(),
        originalPrediction: 45120.37,
        message: hash.startsWith('0x') 
          ? "Prediction verified successfully on-chain" 
          : "Invalid verification hash format"
      };
      
      setResult(mockResult);
      setIsVerifying(false);
      
      toast({
        title: mockResult.isVerified ? "Verification Successful" : "Verification Failed",
        description: mockResult.message,
        variant: mockResult.isVerified ? "default" : "destructive",
      });
    }, 1500);
  };
  
  return (
    <div className="w-full max-w-3xl mx-auto glass rounded-2xl p-8 shadow-sm animate-scale-in">
      <h2 className="text-2xl font-medium mb-2">Verify Prediction Integrity</h2>
      <p className="text-foreground/70 text-sm mb-6">
        Enter a prediction verification hash to confirm it was recorded on-chain and has not been tampered with.
      </p>
      
      <form onSubmit={handleVerify} className="mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Enter verification hash (0x...)"
            value={hash}
            onChange={(e) => setHash(e.target.value)}
            className="flex-1 px-4 py-3 bg-secondary/30 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
          />
          <button
            type="submit"
            disabled={isVerifying}
            className="px-6 py-3 bg-primary text-white rounded-xl font-medium shadow-sm hover:bg-primary/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {isVerifying ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Verifying
              </span>
            ) : (
              "Verify"
            )}
          </button>
        </div>
      </form>
      
      {result && (
        <div className={`rounded-xl p-6 mb-4 animate-fade-in ${
          result.isVerified ? 'bg-green-50 border border-green-100' : 'bg-red-50 border border-red-100'
        }`}>
          <div className="flex items-start">
            <div className={`p-2 rounded-full mr-4 ${
              result.isVerified ? 'bg-green-100' : 'bg-red-100'
            }`}>
              {result.isVerified ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.75 12.75L10.25 15.25L16.25 9.25" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 9L9 15M9 9L15 15" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
            
            <div>
              <h3 className={`font-medium text-lg mb-2 ${
                result.isVerified ? 'text-green-800' : 'text-red-800'
              }`}>
                {result.isVerified ? 'Prediction Verified' : 'Verification Failed'}
              </h3>
              
              <p className="text-sm mb-4">{result.message}</p>
              
              {result.isVerified && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white/50 p-3 rounded-lg">
                    <div className="text-xs font-medium text-gray-500 mb-1">Timestamp</div>
                    <div className="text-sm">{new Date(result.originalTimestamp).toLocaleString()}</div>
                  </div>
                  <div className="bg-white/50 p-3 rounded-lg">
                    <div className="text-xs font-medium text-gray-500 mb-1">Original Prediction</div>
                    <div className="text-sm font-medium">${result.originalPrediction.toLocaleString()}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-5">
        <h3 className="font-medium text-yellow-800 mb-2 flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          How Verification Works
        </h3>
        <p className="text-sm text-yellow-800/80">
          Each prediction is recorded on-chain with a unique verification hash. This creates a tamper-proof record that can be verified at any time. The verification process confirms the original prediction details, timestamp, and ensures data integrity.
        </p>
      </div>
    </div>
  );
};

export default VerificationPanel;
