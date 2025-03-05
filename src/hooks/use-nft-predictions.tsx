
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { NFT, NFTPrediction, NFTSearchRequest, TimeFrame } from '@/lib/types';
import { searchNFTs, generateNFTPrediction, getNFTPredictions } from '@/lib/nftService';
import { toast } from '@/hooks/use-toast';

export function useNFTPredictions() {
  const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null);
  const queryClient = useQueryClient();

  // Search NFTs
  const searchNFTsQuery = (query: string, blockchain?: string) => {
    return useQuery({
      queryKey: ['nftSearch', query, blockchain],
      queryFn: () => searchNFTs({ query, blockchain }),
      enabled: query.length > 1, // Only search if query is at least 2 chars
    });
  };

  // Get all NFT predictions
  const getNFTPredictionsQuery = () => {
    return useQuery({
      queryKey: ['nftPredictions'],
      queryFn: () => getNFTPredictions(),
    });
  };

  // Create a new NFT prediction
  const createNFTPrediction = () => {
    return useMutation({
      mutationFn: ({ nft, timeframe }: { nft: NFT; timeframe: TimeFrame }) => 
        generateNFTPrediction(nft, timeframe),
      onSuccess: (newPrediction) => {
        queryClient.invalidateQueries({ queryKey: ['nftPredictions'] });
        toast({
          title: "NFT Prediction Created",
          description: `Your prediction for ${newPrediction.nftName} has been created.`,
        });
      },
      onError: (error) => {
        console.error('Create NFT prediction error:', error);
        toast({
          title: "Error Creating NFT Prediction",
          description: `Failed to create NFT prediction: ${error instanceof Error ? error.message : 'Unknown error'}`,
          variant: "destructive",
        });
      },
    });
  };

  return {
    selectedNFT,
    setSelectedNFT,
    searchNFTsQuery,
    getNFTPredictionsQuery,
    createNFTPrediction,
  };
}
