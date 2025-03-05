
import React, { useState } from 'react';
import { mockPredictions } from '@/lib/mockData';
import PredictionCard from './PredictionCard';
import { CryptoCurrency, TimeFrame, PredictionStatus } from '@/lib/types';

const PredictionHistory: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<PredictionStatus | 'all'>('all');
  
  const filteredPredictions = activeFilter === 'all' 
    ? mockPredictions 
    : mockPredictions.filter(prediction => prediction.status === activeFilter);
  
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
