
/**
 * Environment variables with fallbacks
 */

// API URL for the prediction service
export const API_URL = import.meta.env.VITE_API_URL || 'https://api.crypto-predictions.example';

// Set this to 'true' to use mock data instead of real API calls (for development)
export const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === 'true';
