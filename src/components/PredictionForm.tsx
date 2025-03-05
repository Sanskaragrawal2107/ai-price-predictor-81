
import React, { useState } from 'react';
import { cryptocurrencies, timeframes } from '@/lib/mockData';
import { PredictionRequest, CryptoCurrency, TimeFrame } from '@/lib/types';
import { toast } from '@/hooks/use-toast';
import { usePredictions } from '@/hooks/use-predictions';

const PredictionForm: React.FC = () => {
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoCurrency>("BTC");
  const [selectedTimeframe, setSelectedTimeframe] = useState<TimeFrame>("30d");
  const { createPrediction } = usePredictions();
  const { mutate, isPending } = createPrediction();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const request: PredictionRequest = {
      cryptoId: selectedCrypto,
      timeframe: selectedTimeframe
    };
    
    mutate(request);
  };
  
  return (
    <div className="w-full max-w-xl mx-auto glass rounded-2xl p-8 shadow-sm animate-scale-in">
      <div className="mb-6">
        <h2 className="text-2xl font-medium mb-2">Request a Prediction</h2>
        <p className="text-foreground/70 text-sm">
          Select a cryptocurrency and timeframe to get an AI-generated price prediction that will be recorded on-chain for transparency.
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Cryptocurrency</label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {cryptocurrencies.map((crypto) => (
                <button
                  key={crypto.id}
                  type="button"
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${
                    selectedCrypto === crypto.id 
                      ? 'border-primary/50 bg-primary/5 shadow-sm' 
                      : 'border-border hover:border-primary/30 hover:bg-primary/5'
                  }`}
                  onClick={() => setSelectedCrypto(crypto.id as CryptoCurrency)}
                >
                  <span className="text-xl mb-1">{crypto.logo}</span>
                  <span className="text-xs font-medium">{crypto.id}</span>
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Timeframe</label>
            <div className="flex flex-wrap gap-2">
              {timeframes.map((timeframe) => (
                <button
                  key={timeframe.id}
                  type="button"
                  className={`px-4 py-2 rounded-full text-sm transition-colors ${
                    selectedTimeframe === timeframe.id 
                      ? 'bg-primary text-white' 
                      : 'bg-secondary text-foreground/70 hover:bg-secondary/80'
                  }`}
                  onClick={() => setSelectedTimeframe(timeframe.id as TimeFrame)}
                >
                  {timeframe.name}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-primary text-white py-3 rounded-xl font-medium shadow-sm hover:bg-primary/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isPending ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing
            </span>
          ) : (
            "Get AI Prediction"
          )}
        </button>
      </form>
    </div>
  );
};

export default PredictionForm;
