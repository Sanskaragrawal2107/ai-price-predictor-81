
import { mockPredictions } from './mockData';
import { PredictionRequest, Prediction, VerificationResult } from './types';

// Simulate API latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Mock implementation of requesting a prediction
 */
export async function mockRequestPrediction(request: PredictionRequest): Promise<Prediction> {
  // Simulate API call delay
  await delay(1200);
  
  const crypto = mockPredictions.find(p => p.cryptoId === request.cryptoId) || mockPredictions[0];
  
  const newPrediction: Prediction = {
    id: `pred-${Date.now()}`,
    cryptoId: request.cryptoId,
    cryptoName: crypto.cryptoName,
    currentPrice: crypto.currentPrice * (0.9 + Math.random() * 0.2), // Random price variation
    predictedPrice: 0,
    percentageChange: 0,
    confidence: Math.floor(65 + Math.random() * 25), // Random confidence between 65-90%
    timestamp: new Date().toISOString(),
    timeframe: request.timeframe,
    status: "pending"
  };
  
  // Calculate predicted price and percentage change
  const changePercent = -10 + Math.random() * 20; // Random change between -10% and +10%
  newPrediction.percentageChange = parseFloat(changePercent.toFixed(2));
  newPrediction.predictedPrice = parseFloat((newPrediction.currentPrice * (1 + changePercent / 100)).toFixed(2));
  
  // Add to mock predictions (in a real app, this would be stored in a database)
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
  
  return {
    isVerified,
    originalTimestamp: prediction.timestamp,
    originalPrediction: prediction.predictedPrice,
    message: isVerified 
      ? "Prediction successfully verified against blockchain data" 
      : "Verification failed. Hash does not match on-chain data"
  };
}
