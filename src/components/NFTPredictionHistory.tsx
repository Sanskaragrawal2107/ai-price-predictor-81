
import React from 'react';
import { useNFTPredictions } from '@/hooks/use-nft-predictions';

const NFTPredictionHistory: React.FC = () => {
  const { getNFTPredictionsQuery } = useNFTPredictions();
  const { data: predictions = [], isLoading, refetch } = getNFTPredictionsQuery();
  
  const handleRefresh = () => {
    refetch();
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  return (
    <div className="w-full glass rounded-2xl p-8 shadow-sm animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-medium mb-2">NFT Prediction History</h2>
          <p className="text-foreground/70 text-sm">
            View your past NFT floor price predictions and their status.
          </p>
        </div>
        <button
          onClick={handleRefresh}
          className="p-2 rounded-lg hover:bg-secondary/70 transition-colors"
          title="Refresh predictions"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-refresh-cw">
            <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
            <path d="M21 3v5h-5" />
            <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
            <path d="M3 21v-5h5" />
          </svg>
        </button>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <svg className="animate-spin h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      ) : predictions.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-border rounded-xl">
          <svg className="w-16 h-16 mx-auto text-foreground/30 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          <h3 className="text-xl font-medium mb-2">No Predictions Yet</h3>
          <p className="text-foreground/70 max-w-sm mx-auto">
            Search for an NFT and generate a prediction to see it appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {predictions.map((prediction) => (
            <div key={prediction.id} className="border border-border rounded-xl overflow-hidden bg-background/50">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/4 aspect-square">
                  <img 
                    src={prediction.nftImage} 
                    alt={prediction.nftName} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 md:w-3/4">
                  <div className="flex flex-col md:flex-row justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-medium">{prediction.nftName}</h3>
                      <p className="text-sm text-foreground/70">{prediction.collection}</p>
                    </div>
                    <div className="mt-2 md:mt-0 md:text-right">
                      <div className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mb-1">
                        {prediction.timeframe} Prediction
                      </div>
                      <p className="text-xs text-foreground/60">
                        Created: {formatDate(prediction.timestamp)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-foreground/70">Current Floor</p>
                      <p className="text-lg font-medium">{prediction.currentFloorPrice} ETH</p>
                    </div>
                    <div>
                      <p className="text-xs text-foreground/70">Predicted Floor</p>
                      <p className="text-lg font-medium">{prediction.predictedFloorPrice} ETH</p>
                    </div>
                    <div>
                      <p className="text-xs text-foreground/70">Change</p>
                      <p className={`text-lg font-medium ${
                        prediction.percentageChange > 0 ? 'text-green-600' : 
                        prediction.percentageChange < 0 ? 'text-red-600' : 'text-foreground'
                      }`}>
                        {prediction.percentageChange > 0 ? '+' : ''}{prediction.percentageChange}%
                      </p>
                    </div>
                  </div>
                  
                  <div className="border-t border-border pt-4 mt-4">
                    <p className="text-sm mb-1">
                      <span className="font-medium">Rationale:</span> {prediction.predictionRationale}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center">
                        <span className="text-sm mr-2">Confidence:</span>
                        <div className="bg-secondary w-36 h-3 rounded-full overflow-hidden">
                          <div 
                            className="bg-primary h-full rounded-full"
                            style={{ width: `${prediction.confidence}%` }}
                          ></div>
                        </div>
                        <span className="text-sm ml-2">{prediction.confidence}%</span>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        prediction.status === 'completed' ? 'bg-green-100 text-green-800' :
                        prediction.status === 'verified' ? 'bg-blue-100 text-blue-800' :
                        prediction.status === 'incorrect' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {prediction.status.charAt(0).toUpperCase() + prediction.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NFTPredictionHistory;
