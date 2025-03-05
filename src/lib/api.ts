
import { CryptoCurrency, TimeFrame, Prediction, PredictionRequest, VerificationResult } from './types';
import { API_URL, USE_MOCK_DATA } from './env';
import { 
  mockRequestPrediction, 
  mockFetchPredictions, 
  mockFetchPredictionById, 
  mockVerifyPrediction 
} from './mockService';

/**
 * Request a new prediction from the API
 */
export async function requestPrediction(request: PredictionRequest): Promise<Prediction> {
  // Use mock data if specified in environment variables
  if (USE_MOCK_DATA) {
    return mockRequestPrediction(request);
  }
  
  try {
    const response = await fetch(`${API_URL}/predictions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`Error requesting prediction: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to request prediction:', error);
    
    // Fallback to mock data if API call fails
    console.warn('Falling back to mock data');
    return mockRequestPrediction(request);
  }
}

/**
 * Fetch all predictions
 */
export async function fetchPredictions(): Promise<Prediction[]> {
  // Use mock data if specified in environment variables
  if (USE_MOCK_DATA) {
    return mockFetchPredictions();
  }
  
  try {
    const response = await fetch(`${API_URL}/predictions`);

    if (!response.ok) {
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
