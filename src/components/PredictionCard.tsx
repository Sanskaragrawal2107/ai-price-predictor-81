
import React from 'react';
import { Prediction } from '@/lib/types';
import { cn } from '@/lib/utils';

interface PredictionCardProps {
  prediction: Prediction;
}

const PredictionCard: React.FC<PredictionCardProps> = ({ prediction }) => {
  const {
    cryptoId,
    cryptoName,
    currentPrice,
    predictedPrice,
    percentageChange,
    confidence,
    timestamp,
    timeframe,
    status,
    verificationHash
  } = prediction;
  
  const formattedTimestamp = new Date(timestamp).toLocaleString();
  
  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    completed: "bg-blue-100 text-blue-800",
    verified: "bg-green-100 text-green-800",
    incorrect: "bg-red-100 text-red-800"
  };
  
  const percentageDirection = percentageChange >= 0 ? "text-green-600" : "text-red-600";
  
  return (
    <div className="glass rounded-2xl p-6 card-hover animate-slide-up">
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="font-medium text-lg">{cryptoId}</span>
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-secondary">
              {timeframe}
            </span>
            <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full", statusColors[status])}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
          </div>
          <div className="text-sm text-foreground/70">{cryptoName}</div>
        </div>
        <div className="text-right">
          <div className="text-sm font-medium">Confidence</div>
          <div className="text-lg font-semibold">{confidence}%</div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-secondary/60 p-3 rounded-xl">
          <div className="text-xs font-medium text-foreground/70 mb-1">Current Price</div>
          <div className="text-lg font-semibold">${currentPrice.toLocaleString()}</div>
        </div>
        <div className="bg-secondary/60 p-3 rounded-xl">
          <div className="text-xs font-medium text-foreground/70 mb-1">Predicted Price</div>
          <div className="text-lg font-semibold">${predictedPrice.toLocaleString()}</div>
        </div>
      </div>
      
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-sm font-medium">Change</div>
          <div className={cn("text-lg font-semibold", percentageDirection)}>
            {percentageChange >= 0 ? '+' : ''}{percentageChange}%
          </div>
        </div>
        
        <div>
          <div className="text-sm font-medium">Predicted On</div>
          <div className="text-sm">{formattedTimestamp}</div>
        </div>
      </div>
      
      {verificationHash && (
        <div className="border-t border-border pt-3 mt-3">
          <div className="text-xs text-foreground/70 mb-1">Verification Hash</div>
          <div className="text-xs font-mono bg-secondary/40 p-2 rounded overflow-x-auto">
            {verificationHash}
          </div>
        </div>
      )}
    </div>
  );
};

export default PredictionCard;
