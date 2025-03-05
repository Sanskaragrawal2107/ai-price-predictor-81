
import { CryptoCurrency, TimeFrame, Prediction, PredictionRequest, VerificationResult } from './types';
import { API_URL, USE_MOCK_DATA } from './env';
import { 
  mockRequestPrediction, 
  mockFetchPredictions, 
  mockFetchPredictionById, 
  mockVerifyPrediction,
  mockPredictions
} from './mockService';
import { fetchCurrentPrice } from './coingeckoService';
import { generatePricePrediction } from './geminiService';

/**
 * Request a new prediction from the API
 */
export async function requestPrediction(request: PredictionRequest): Promise<Prediction> {
  // Try to get real data if USE_MOCK_DATA is false
  if (!USE_MOCK_DATA) {
    try {
      console.log(`Requesting real prediction for ${request.cryptoId}`);
      
      // 1. Fetch current price from CoinGecko
      const currentPrice = await fetchCurrentPrice(request.cryptoId);
      
      // 2. Get cryptocurrency full name
      const cryptoNames: Record<CryptoCurrency, string> = {
        BTC: 'Bitcoin',
        ETH: 'Ethereum',
        SOL: 'Solana',
        ADA: 'Cardano',
        DOT: 'Polkadot',
        AVAX: 'Avalanche',
        MATIC: 'Polygon',
        LINK: 'Chainlink',
        XRP: 'XRP',
        DOGE: 'Dogecoin'
      };
      
      // 3. Get AI prediction from Gemini
      const { predictedPrice, confidence } = await generatePricePrediction(
        request.cryptoId,
        currentPrice,
        request.timeframe
      );
      
      // 4. Calculate percentage change
      const percentageChange = ((predictedPrice - currentPrice) / currentPrice) * 100;
      
      // 5. Create prediction object
      const prediction: Prediction = {
        id: `pred-${Date.now()}`,
        cryptoId: request.cryptoId,
        cryptoName: cryptoNames[request.cryptoId],
        currentPrice,
        predictedPrice,
        percentageChange: parseFloat(percentageChange.toFixed(2)),
        confidence,
        timestamp: new Date().toISOString(),
        timeframe: request.timeframe,
        status: "completed", // Change from "pending" to "completed" immediately
        verificationHash: `hash-${Date.now()}-${Math.floor(Math.random() * 1000000)}`
      };
      
      // In a real app, we would save this to a database or blockchain
      // For now, we'll just add it to the mock data
      mockPredictions.unshift(prediction);
      
      return prediction;
    } catch (error) {
      console.error('Failed to get real prediction, falling back to mock:', error);
      // Fall back to mock data if there's an error
      return mockRequestPrediction(request);
    }
  }
  
  // Use mock data if specified in environment variables
  console.log('Using mock data for prediction request');
  return mockRequestPrediction(request);
}

/**
 * Fetch all predictions
 */
export async function fetchPredictions(): Promise<Prediction[]> {
  // Use mock data if specified in environment variables
  if (USE_MOCK_DATA) {
    console.log('Using mock data for fetching predictions');
    return mockFetchPredictions();
  }
  
  try {
    console.log(`Fetching predictions from ${API_URL}/predictions`);
    const response = await fetch(`${API_URL}/predictions`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Error fetching predictions: ${response.status} ${response.statusText}`, errorText);
      throw new Error(`Error fetching predictions: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to fetch predictions:', error);
    
    // Fallback to mock data if API call fails
    console.warn('Falling back to mock data');
    return mockFetchPredictions();
  }
}

/**
 * Fetch a specific prediction by ID
 */
export async function fetchPredictionById(id: string): Promise<Prediction> {
  // Use mock data if specified in environment variables
  if (USE_MOCK_DATA) {
    return mockFetchPredictionById(id);
  }
  
  try {
    const response = await fetch(`${API_URL}/predictions/${id}`);

    if (!response.ok) {
      throw new Error(`Error fetching prediction: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch prediction with ID ${id}:`, error);
    
    // Fallback to mock data if API call fails
    console.warn('Falling back to mock data');
    return mockFetchPredictionById(id);
  }
}

/**
 * Verify a prediction's authenticity
 */
export async function verifyPrediction(id: string, hash: string): Promise<VerificationResult> {
  // Use mock data if specified in environment variables
  if (USE_MOCK_DATA) {
    return mockVerifyPrediction(id, hash);
  }
  
  try {
    const response = await fetch(`${API_URL}/predictions/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, hash }),
    });

    if (!response.ok) {
      throw new Error(`Error verifying prediction: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to verify prediction:', error);
    
    // Fallback to mock data if API call fails
    console.warn('Falling back to mock data');
    return mockVerifyPrediction(id, hash);
  }
}
