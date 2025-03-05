
export type CryptoCurrency = 
  | "BTC" 
  | "ETH" 
  | "SOL" 
  | "ADA" 
  | "DOT" 
  | "AVAX" 
  | "MATIC" 
  | "LINK" 
  | "XRP"
  | "DOGE";

export type TimeFrame = 
  | "24h" 
  | "7d" 
  | "30d" 
  | "90d" 
  | "1y";

export type PredictionStatus = 
  | "pending" 
  | "completed" 
  | "verified"
  | "incorrect";

export interface PredictionRequest {
  cryptoId: CryptoCurrency;
  timeframe: TimeFrame;
}

export interface Prediction {
  id: string;
  cryptoId: CryptoCurrency;
  cryptoName: string;
  currentPrice: number;
  predictedPrice: number;
  percentageChange: number;
  confidence: number;
  timestamp: string;
  timeframe: TimeFrame;
  status: PredictionStatus;
  verificationHash?: string;
}

export interface VerificationResult {
  isVerified: boolean;
  originalTimestamp: string;
  originalPrediction: number;
  message: string;
}
