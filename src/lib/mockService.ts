
import { mockPredictions as initialMockPredictions } from './mockData';
import { PredictionRequest, Prediction, VerificationResult } from './types';

// Create a mutable copy of the mock predictions that we can modify
export const mockPredictions: Prediction[] = [...initialMockPredictions];

// Simulate API latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Mock implementation of requesting a prediction
 */
export async function mockRequestPrediction(request: PredictionRequest): Promise<Prediction> {
  // Simulate API call delay
  await delay(1200);
  
  const crypto = mockPredictions.find(p => p.cryptoId === request.cryptoId) || mockPredictions[0];
  
  // Use more realistic price range based on the crypto's current price
  const currentPrice = crypto.currentPrice * (0.98 + Math.random() * 0.04); // Random price variation of ±2%
  
  // Calculate a more realistic prediction
  const changePercent = -5 + Math.random() * 10; // Random change between -5% and +5%
  const predictedPrice = parseFloat((currentPrice * (1 + changePercent / 100)).toFixed(2));
  const percentageChange = parseFloat(changePercent.toFixed(2));
  
  const newPrediction: Prediction = {
    id: `pred-${Date.now()}`,
    cryptoId: request.cryptoId,
    cryptoName: crypto.cryptoName,
    currentPrice: parseFloat(currentPrice.toFixed(2)),
    predictedPrice,
    percentageChange,
    confidence: Math.floor(65 + Math.random() * 25), // Random confidence between 65-90%
    timestamp: new Date().toISOString(),
    timeframe: request.timeframe,
    status: "completed", // Change from "pending" to "completed" immediately
    verificationHash: `hash-${Date.now()}-${Math.floor(Math.random() * 1000000)}`
  };
  
  // Add to mock predictions
  mockPredictions.unshift(newPrediction);
  
  return newPrediction;
}

/**
 * Mock implementation of fetching all predictions
 */
export async function mockFetchPredictions(): Promise<Prediction[]> {
  await delay(800);
  return [...mockPredictions];
}

/**
 * Mock implementation of fetching a prediction by ID
 */
export async function mockFetchPredictionById(id: string): Promise<Prediction> {
  await delay(500);
  
  const prediction = mockPredictions.find(p => p.id === id);
  if (!prediction) {
    throw new Error(`Prediction with ID ${id} not found`);
  }
  
  return prediction;
}

/**
 * Mock implementation of verifying a prediction
 */
export async function mockVerifyPrediction(id: string, hash: string): Promise<VerificationResult> {
  await delay(1500);
  
  const prediction = mockPredictions.find(p => p.id === id);
  
  if (!prediction) {
    return {
      isVerified: false,
      originalTimestamp: "",
      originalPrediction: 0,
      message: "Prediction not found"
    };
  }
  
  // In a real app, this would perform cryptographic verification
  const isVerified = prediction.verificationHash === hash;
  
  if (isVerified && prediction.status === "completed") {
    // Update the prediction status to verified if it's verified successfully
    prediction.status = "verified";
  }
  
  return {
    isVerified,
    originalTimestamp: prediction.timestamp,
    originalPrediction: prediction.predictedPrice,
    message: isVerified 
      ? "Prediction successfully verified against blockchain data" 
      : "Verification failed. Hash does not match on-chain data"
  };
}
