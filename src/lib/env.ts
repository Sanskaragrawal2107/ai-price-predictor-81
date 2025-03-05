
/**
 * Environment variables with fallbacks
 */

// API URL for the prediction service - replace with your actual API endpoint
export const API_URL = import.meta.env.VITE_API_URL || 'https://mockapi.io/api/v1/crypto-predictions';

// Set this to 'true' to use mock data instead of real API calls (for development)
export const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === 'true' || false; // Default to false

// Blockchain connection settings
export const CHAIN_ID = import.meta.env.VITE_CHAIN_ID || '0x1'; // Ethereum Mainnet by default
export const INFURA_KEY = import.meta.env.VITE_INFURA_KEY || ''; // Optional: Your Infura API key

// CoinGecko API key
export const COINGECKO_API_KEY = 'CG-7TLijhrpmXWjpkMFHpDaMciK';

// Gemini API key
export const GEMINI_API_KEY = 'AIzaSyDwqj1YcFKVzpLc_4ZyC_s9YAMCONx57RI';
