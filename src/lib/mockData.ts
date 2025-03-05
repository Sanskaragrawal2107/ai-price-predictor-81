
import { Prediction } from './types';

export const cryptocurrencies = [
  { id: "BTC", name: "Bitcoin", logo: "₿" },
  { id: "ETH", name: "Ethereum", logo: "Ξ" },
  { id: "SOL", name: "Solana", logo: "◎" },
  { id: "ADA", name: "Cardano", logo: "₳" },
  { id: "DOT", name: "Polkadot", logo: "●" },
  { id: "AVAX", name: "Avalanche", logo: "Ⓐ" },
  { id: "MATIC", name: "Polygon", logo: "Ⓟ" },
  { id: "LINK", name: "Chainlink", logo: "⌁" },
  { id: "XRP", name: "Ripple", logo: "✕" },
  { id: "DOGE", name: "Dogecoin", logo: "Ð" },
];

export const timeframes = [
  { id: "24h", name: "24 Hours" },
  { id: "7d", name: "7 Days" },
  { id: "30d", name: "30 Days" },
  { id: "90d", name: "90 Days" },
  { id: "1y", name: "1 Year" },
];

export const mockPredictions: Prediction[] = [
  {
    id: "pred-001",
    cryptoId: "BTC",
    cryptoName: "Bitcoin",
    currentPrice: 42365.89,
    predictedPrice: 45120.37,
    percentageChange: 6.5,
    confidence: 85,
    timestamp: "2023-06-12T14:23:45Z",
    timeframe: "30d",
    status: "verified",
    verificationHash: "0x8f41b6c4a3c3b8d9e8d2a2f8c3d7e5f2a1b0c9d8"
  },
  {
    id: "pred-002",
    cryptoId: "ETH",
    cryptoName: "Ethereum",
    currentPrice: 2245.12,
    predictedPrice: 2567.84,
    percentageChange: 14.3,
    confidence: 78,
    timestamp: "2023-06-13T09:12:32Z",
    timeframe: "7d",
    status: "completed"
  },
  {
    id: "pred-003",
    cryptoId: "SOL",
    cryptoName: "Solana",
    currentPrice: 137.90,
    predictedPrice: 153.42,
    percentageChange: 11.2,
    confidence: 82,
    timestamp: "2023-06-13T11:45:18Z",
    timeframe: "24h",
    status: "pending"
  },
  {
    id: "pred-004",
    cryptoId: "DOT",
    cryptoName: "Polkadot",
    currentPrice: 6.43,
    predictedPrice: 5.98,
    percentageChange: -7.0,
    confidence: 72,
    timestamp: "2023-06-12T18:37:21Z",
    timeframe: "90d",
    status: "incorrect"
  },
  {
    id: "pred-005",
    cryptoId: "ADA",
    cryptoName: "Cardano",
    currentPrice: 0.37,
    predictedPrice: 0.42,
    percentageChange: 13.5,
    confidence: 68,
    timestamp: "2023-06-11T21:14:53Z",
    timeframe: "30d",
    status: "verified",
    verificationHash: "0x3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b"
  },
  {
    id: "pred-006",
    cryptoId: "AVAX",
    cryptoName: "Avalanche",
    currentPrice: 15.78,
    predictedPrice: 18.35,
    percentageChange: 16.3,
    confidence: 76,
    timestamp: "2023-06-10T15:42:37Z",
    timeframe: "7d",
    status: "verified",
    verificationHash: "0x2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d"
  }
];
