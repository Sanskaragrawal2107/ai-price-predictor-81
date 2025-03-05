
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  requestPrediction, 
  fetchPredictions, 
  fetchPredictionById, 
  verifyPrediction 
} from "@/lib/api";
import { PredictionRequest, Prediction, VerificationResult } from "@/lib/types";
import { toast } from "@/hooks/use-toast";

export function usePredictions() {
  const queryClient = useQueryClient();

  // Get all predictions
  const getPredictions = () => {
    return useQuery({
      queryKey: ['predictions'],
      queryFn: fetchPredictions,
    });
  };

  // Get a single prediction by ID
  const getPredictionById = (id: string) => {
    return useQuery({
      queryKey: ['predictions', id],
      queryFn: () => fetchPredictionById(id),
      enabled: !!id,
    });
  };

  // Create a new prediction
  const createPrediction = () => {
    return useMutation({
      mutationFn: (request: PredictionRequest) => requestPrediction(request),
      onSuccess: (newPrediction) => {
        queryClient.invalidateQueries({ queryKey: ['predictions'] });
        toast({
          title: "Prediction Created",
          description: `Your ${newPrediction.cryptoId} prediction has been created.`,
        });
      },
      onError: (error) => {
        console.error('Create prediction error:', error);
        toast({
          title: "Error Creating Prediction",
          description: `Failed to create prediction: ${error instanceof Error ? error.message : 'Unknown error'}`,
          variant: "destructive",
        });
      },
    });
  };

  // Verify a prediction's authenticity
  const verifyPredictionHash = () => {
    return useMutation({
      mutationFn: ({ id, hash }: { id: string; hash: string }) => verifyPrediction(id, hash),
      onSuccess: (result) => {
        if (result.isVerified) {
          toast({
            title: "Prediction Verified",
            description: result.message,
          });
        } else {
          toast({
            title: "Verification Failed",
            description: result.message,
            variant: "destructive",
          });
        }
      },
      onError: (error) => {
        toast({
          title: "Verification Error",
          description: `An error occurred during verification: ${error instanceof Error ? error.message : 'Unknown error'}`,
          variant: "destructive",
        });
      },
    });
  };

  return {
    getPredictions,
    getPredictionById,
    createPrediction,
    verifyPredictionHash,
  };
}
