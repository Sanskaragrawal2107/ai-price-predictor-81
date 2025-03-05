
import React, { useState } from 'react';
import PredictionCard from './PredictionCard';
import { CryptoCurrency, TimeFrame, PredictionStatus } from '@/lib/types';
import { usePredictions } from '@/hooks/use-predictions';

const PredictionHistory: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<PredictionStatus | 'all'>('all');
  const { getPredictions } = usePredictions();
  const { data: predictions, isLoading, error } = getPredictions();
  
  const filteredPredictions = !predictions ? [] : (
    activeFilter === 'all' 
      ? predictions 
      : predictions.filter(prediction => prediction.status === activeFilter)
  );
  
  if (isLoading) {
    return (
      <div className="w-full h-64 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <svg className="animate-spin h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-foreground/70">Loading predictions...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="w-full py-10 text-center">
        <div className="bg-red-50 text-red-800 p-4 rounded-xl mx-auto max-w-md">
          <p className="font-medium">Error loading predictions</p>
          <p className="text-sm mt-1">{error instanceof Error ? error.message : 'Unknown error'}</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="w-full animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-medium">Prediction History</h2>
        
        <div className="flex space-x-2">
          {(['all', 'pending', 'completed', 'verified', 'incorrect'] as const).map((status) => (
            <button
              key={status}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${
                activeFilter === status 
                  ? 'bg-primary text-white' 
                  : 'bg-secondary/60 text-foreground/70 hover:bg-secondary'
              }`}
              onClick={() => setActiveFilter(status)}
            >
              {status === 'all' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>
      
      {filteredPredictions.length === 0 ? (
        <div className="text-center py-16 bg-secondary/30 rounded-2xl">
          <p className="text-foreground/70">No predictions match your filter criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPredictions.map((prediction) => (
            <PredictionCard key={prediction.id} prediction={prediction} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PredictionHistory;
