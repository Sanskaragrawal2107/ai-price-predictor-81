
import { COINGECKO_API_KEY } from './env';
import { CryptoCurrency } from './types';

// Map our internal cryptocurrency IDs to CoinGecko IDs
const cryptoIdMap: Record<CryptoCurrency, string> = {
  BTC: 'bitcoin',
  ETH: 'ethereum',
  SOL: 'solana',
  ADA: 'cardano',
  DOT: 'polkadot',
  AVAX: 'avalanche-2',
  MATIC: 'matic-network',
  LINK: 'chainlink',
  XRP: 'ripple',
  DOGE: 'dogecoin'
};

/**
 * Fetch current price for a cryptocurrency from CoinGecko
 */
export async function fetchCurrentPrice(cryptoId: CryptoCurrency): Promise<number> {
  try {
    const geckoId = cryptoIdMap[cryptoId];
    if (!geckoId) {
      throw new Error(`Unmapped cryptocurrency: ${cryptoId}`);
    }

    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${geckoId}&vs_currencies=usd&x_cg_demo_api_key=${COINGECKO_API_KEY}`;
    console.log(`Fetching price from CoinGecko: ${url}`);
    
    const response = await fetch(url);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`CoinGecko API error: ${response.status} ${response.statusText}`, errorText);
      throw new Error(`CoinGecko API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log(`CoinGecko response for ${cryptoId}:`, data);
    
    if (!data[geckoId] || typeof data[geckoId].usd !== 'number') {
      console.error(`Invalid response from CoinGecko for ${cryptoId}:`, data);
      throw new Error(`Invalid response from CoinGecko for ${cryptoId}`);
    }
    
    return data[geckoId].usd;
  } catch (error) {
    console.error(`Error fetching price for ${cryptoId}:`, error);
    throw error;
  }
}

/**
 * Fetch historical price data for a cryptocurrency
 */
export async function fetchHistoricalPrices(
  cryptoId: CryptoCurrency,
  days: number = 30
): Promise<{ prices: [number, number][] }> {
  try {
    const geckoId = cryptoIdMap[cryptoId];
    if (!geckoId) {
      throw new Error(`Unmapped cryptocurrency: ${cryptoId}`);
    }

    const url = `https://api.coingecko.com/api/v3/coins/${geckoId}/market_chart?vs_currency=usd&days=${days}&x_cg_demo_api_key=${COINGECKO_API_KEY}`;
    console.log(`Fetching historical prices from CoinGecko: ${url}`);
    
    const response = await fetch(url);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`CoinGecko historical API error: ${response.status} ${response.statusText}`, errorText);
      throw new Error(`CoinGecko API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log(`CoinGecko historical data for ${cryptoId}:`, data);
    
    return data;
  } catch (error) {
    console.error(`Error fetching historical prices for ${cryptoId}:`, error);
    throw error;
  }
}
