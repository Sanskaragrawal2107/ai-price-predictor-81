
import React, { useState } from 'react';
import { useNFTPredictions } from '@/hooks/use-nft-predictions';
import { TimeFrame } from '@/lib/types';
import { timeframes } from '@/lib/mockData';
import { toast } from '@/hooks/use-toast';

const NFTSearchForm: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchBlockchain, setSearchBlockchain] = useState<string | undefined>();
  const [selectedTimeframe, setSelectedTimeframe] = useState<TimeFrame>("30d");
  const { searchNFTsQuery, selectedNFT, setSelectedNFT, createNFTPrediction } = useNFTPredictions();
  
  // Only run the query when we have a search query
  const { data: searchResults, isLoading: isSearching, error } = searchNFTsQuery(searchQuery, searchBlockchain);
  const { mutate: generatePrediction, isPending: isGenerating } = createNFTPrediction();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.length < 2) {
      toast({
        title: "Search query too short",
        description: "Please enter at least 2 characters to search",
        variant: "destructive"
      });
      return;
    }
    
    console.log("Searching for NFTs with query:", searchQuery);
    // The search is already being performed by the query hook
  };
  
  const handleGeneratePrediction = () => {
    if (selectedNFT) {
      generatePrediction({
        nft: selectedNFT,
        timeframe: selectedTimeframe
      });
    }
  };
  
  return (
    <div className="w-full space-y-8 animate-fade-in">
      <div className="glass rounded-2xl p-8 shadow-sm">
        <div className="mb-6">
          <h2 className="text-2xl font-medium mb-2">Search NFTs</h2>
          <p className="text-foreground/70 text-sm">
            Search for NFTs by collection name or individual NFT identifier. 
            Select an NFT to get an AI-generated floor price prediction.
          </p>
        </div>
        
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">Search Query</label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Bored Ape, Azuki, etc."
                className="w-full px-4 py-2 rounded-lg border border-border focus:border-primary focus:ring-1 focus:ring-primary bg-background"
              />
            </div>
            <div className="sm:w-1/3">
              <label className="block text-sm font-medium mb-2">Blockchain</label>
              <select
                value={searchBlockchain || ''}
                onChange={(e) => setSearchBlockchain(e.target.value || undefined)}
                className="w-full px-4 py-2 rounded-lg border border-border focus:border-primary focus:ring-1 focus:ring-primary bg-background"
              >
                <option value="">All Blockchains</option>
                <option value="Ethereum">Ethereum</option>
                <option value="Solana">Solana</option>
                <option value="Polygon">Polygon</option>
              </select>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={searchQuery.length < 2 || isSearching}
            className="w-full bg-primary text-white py-3 rounded-xl font-medium shadow-sm hover:bg-primary/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSearching ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Searching...
              </span>
            ) : (
              "Search NFTs"
            )}
          </button>
        </form>
      </div>
      
      {/* Search Results */}
      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-4">
          Error: {error instanceof Error ? error.message : 'Unknown error occurred'}
        </div>
      )}
      
      {searchResults && searchResults.length > 0 ? (
        <div className="glass rounded-2xl p-8 shadow-sm">
          <h3 className="text-xl font-medium mb-4">Search Results</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchResults.map((nft) => (
              <div 
                key={nft.id}
                className={`border rounded-xl overflow-hidden cursor-pointer transition-all hover:shadow-md ${
                  selectedNFT?.id === nft.id ? 'border-primary ring-2 ring-primary/30' : 'border-border'
                }`}
                onClick={() => setSelectedNFT(nft)}
              >
                <div className="aspect-square w-full bg-secondary/30 overflow-hidden">
                  <img 
                    src={nft.image} 
                    alt={nft.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-medium text-sm">{nft.name}</h4>
                  <p className="text-xs text-foreground/70">{nft.collection}</p>
                  {nft.floorPrice && (
                    <p className="text-sm mt-2">
                      Floor: <span className="font-medium">{nft.floorPrice} ETH</span>
                    </p>
                  )}
                  <div className="flex items-center mt-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      nft.blockchain === 'Ethereum' ? 'bg-blue-100 text-blue-800' :
                      nft.blockchain === 'Solana' ? 'bg-purple-100 text-purple-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {nft.blockchain}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : searchQuery.length >= 2 && !isSearching && searchResults && (
        <div className="glass rounded-2xl p-8 shadow-sm text-center">
          <svg className="w-16 h-16 mx-auto text-foreground/30 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
          <h3 className="text-xl font-medium mb-2">No NFTs Found</h3>
          <p className="text-foreground/70">
            Try a different search term or blockchain filter.
          </p>
        </div>
      )}
      
      {/* Selected NFT and Prediction Form */}
      {selectedNFT && (
        <div className="glass rounded-2xl p-8 shadow-sm">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <div className="rounded-xl overflow-hidden border border-border">
                <img 
                  src={selectedNFT.image} 
                  alt={selectedNFT.name} 
                  className="w-full aspect-square object-cover"
                />
              </div>
            </div>
            <div className="md:w-2/3">
              <h3 className="text-2xl font-medium mb-2">{selectedNFT.name}</h3>
              <p className="text-foreground/70 mb-4">{selectedNFT.description}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm text-foreground/70">Collection</p>
                  <p className="font-medium">{selectedNFT.collection}</p>
                </div>
                <div>
                  <p className="text-sm text-foreground/70">Blockchain</p>
                  <p className="font-medium">{selectedNFT.blockchain}</p>
                </div>
                {selectedNFT.floorPrice && (
                  <div>
                    <p className="text-sm text-foreground/70">Floor Price</p>
                    <p className="font-medium">{selectedNFT.floorPrice} ETH</p>
                  </div>
                )}
                {selectedNFT.lastSalePrice && (
                  <div>
                    <p className="text-sm text-foreground/70">Last Sale</p>
                    <p className="font-medium">{selectedNFT.lastSalePrice} ETH</p>
                  </div>
                )}
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Prediction Timeframe</label>
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
                
                <button
                  onClick={handleGeneratePrediction}
                  disabled={isGenerating}
                  className="w-full bg-primary text-white py-3 rounded-xl font-medium shadow-sm hover:bg-primary/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isGenerating ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Generating Prediction...
                    </span>
                  ) : (
                    "Generate Floor Price Prediction"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NFTSearchForm;
