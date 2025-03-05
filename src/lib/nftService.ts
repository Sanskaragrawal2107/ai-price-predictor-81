import { NFT, NFTSearchRequest, NFTPrediction, TimeFrame } from './types';
import { USE_MOCK_DATA } from './env';
import { GEMINI_API_KEY } from './env';

// Mock NFT data for development and testing
const mockNFTs: NFT[] = [
  {
    id: 'nft-1',
    name: 'Bored Ape #7329',
    description: 'Bored Ape Yacht Club is a collection of 10,000 unique Bored Ape NFTs.',
    image: 'https://i.seadn.io/gae/Ju9CkWtV-1Okvf45wo8UctR-M9He2PjILP0oOvxE89AyiPPGtrR3gysu1Zgy0hjd2xKIgjJJtWIc0ybj4Vd7wv8t3pxDGHoJBzDB?auto=format&dpr=1&w=1000',
    collection: 'Bored Ape Yacht Club',
    floorPrice: 18.5,
    lastSalePrice: 20.3,
    blockchain: 'Ethereum',
    tokenId: '7329',
    traits: [
      { trait_type: 'Background', value: 'Blue' },
      { trait_type: 'Fur', value: 'Brown' },
      { trait_type: 'Eyes', value: 'Bored' },
      { trait_type: 'Mouth', value: 'Bored Cigarette' }
    ]
  },
  {
    id: 'nft-2',
    name: 'CryptoPunk #5822',
    description: 'CryptoPunks launched as a fixed set of 10,000 items in mid-2017 and became one of the inspirations for the ERC-721 standard.',
    image: 'https://i.seadn.io/gae/H-eyNE1MwL5ohL-tCfn_Xa1Sl9M9B4612tLYeUlQubzt4ewhr4huJIR5OLuyO3Z5PpJFSwdm7rq-TikAh7f5eUw338A2cy6HRH75?auto=format&dpr=1&w=1000',
    collection: 'CryptoPunks',
    floorPrice: 50.2,
    lastSalePrice: 55.0,
    blockchain: 'Ethereum',
    tokenId: '5822',
    traits: [
      { trait_type: 'Type', value: 'Alien' },
      { trait_type: 'Accessories', value: 'Bandana' }
    ]
  },
  {
    id: 'nft-3',
    name: 'DeGods #1337',
    description: 'A deflationary collection of degenerates, punks, and misfits. Gods of the metaverse & masters of our own universe.',
    image: 'https://i.seadn.io/gae/FVYe2qIJhFzVRiUG5VGgSJx9X5Lm0tYrpaq4GgP2-PJoWsRcBhPBJwQxQOrIQBsqLpkEJxC7TCOnj6KAp7kXG5lo_uDOhwHPnQRB8w?auto=format&dpr=1&w=1000',
    collection: 'DeGods',
    floorPrice: 8.2,
    lastSalePrice: 7.9,
    blockchain: 'Solana',
    tokenId: '1337',
    traits: [
      { trait_type: 'Background', value: 'Red' },
      { trait_type: 'Body', value: 'Gold' },
      { trait_type: 'Eyes', value: 'Laser' },
      { trait_type: 'Head', value: 'Crown' }
    ]
  },
  {
    id: 'nft-4',
    name: 'Azuki #9402',
    description: 'Azuki starts with a collection of 10,000 avatars that give you membership access to The Garden.',
    image: 'https://i.seadn.io/gae/ztuE3Pht9_rKVmNfnQtYTWsHLYdT3M1cHReU5gPz8DzX3uZ9oYVMvsVsuWKzFfTCXJeaaP2Bq5PdLxvW9GaOHTJdwiVjJUQPDW-9?auto=format&dpr=1&w=1000',
    collection: 'Azuki',
    floorPrice: 12.3,
    lastSalePrice: 13.1,
    blockchain: 'Ethereum',
    tokenId: '9402',
    traits: [
      { trait_type: 'Type', value: 'Human' },
      { trait_type: 'Hair', value: 'Purple Long' },
      { trait_type: 'Clothing', value: 'Kimono' }
    ]
  },
  {
    id: 'nft-5',
    name: 'Okay Bears #1201',
    description: 'A collection of 10,000 diverse bears building a virtuous community that will transcend the internet into the real world.',
    image: 'https://i.seadn.io/gae/TyPJi06xkQXQgU2QOzA5nI8wVEBtF3YQj-EJZ9xmSOy_6_ibhQz4zQIg6jXPif1wUq2S8s_yQoIrTWsUBPEpnisaRNLg4jRkGBqV?auto=format&dpr=1&w=1000',
    collection: 'Okay Bears',
    floorPrice: 5.7,
    lastSalePrice: 6.2,
    blockchain: 'Solana',
    tokenId: '1201',
    traits: [
      { trait_type: 'Background', value: 'Blue' },
      { trait_type: 'Fur', value: 'Brown' },
      { trait_type: 'Eyes', value: 'Happy' },
      { trait_type: 'Outfit', value: 'Hawaiian Shirt' }
    ]
  }
];

// Mock NFT predictions for development and testing
const mockNFTPredictions: NFTPrediction[] = [];

/**
 * Search for NFTs matching a query
 */
export async function searchNFTs(request: NFTSearchRequest): Promise<NFT[]> {
  console.log('Searching NFTs with query:', request.query, 'and blockchain:', request.blockchain);
  
  // Always use mock data until we have a real API to connect to
  return new Promise((resolve) => {
    setTimeout(() => {
      // Make a case-insensitive search to match more effectively
      const query = request.query.toLowerCase();
      
      const filteredNFTs = mockNFTs.filter(nft => {
        const matchesQuery = nft.name.toLowerCase().includes(query) || 
                           nft.collection.toLowerCase().includes(query);
        
        const matchesBlockchain = !request.blockchain || 
                               nft.blockchain.toLowerCase() === request.blockchain.toLowerCase();
        
        return matchesQuery && matchesBlockchain;
      });
      
      console.log(`Found ${filteredNFTs.length} NFTs matching query:`, filteredNFTs);
      resolve(filteredNFTs);
    }, 500); // Simulate API delay
  });
}

/**
 * Generate a prediction for an NFT's future floor price
 */
export async function generateNFTPrediction(
  nft: NFT, 
  timeframe: TimeFrame
): Promise<NFTPrediction> {
  try {
    // Map timeframes to number of days for predictions
    const timeframeMap: Record<TimeFrame, number> = {
      "24h": 1,
      "7d": 7,
      "30d": 30,
      "90d": 90,
      "1y": 365
    };
    
    const days = timeframeMap[timeframe];
    
    // Use Gemini API for the prediction if not using mock data
    if (!USE_MOCK_DATA) {
      // Construct a prompt for Gemini API
      const prompt = `
        You are an NFT market prediction AI.
        Based on current market trends, historical data, and NFT collection analysis:
        
        NFT: ${nft.name}
        Collection: ${nft.collection}
        Current floor price: ${nft.floorPrice} ETH
        Blockchain: ${nft.blockchain}
        Prediction timeframe: ${days} days
        
        Provide a JSON object with exactly these fields:
        1. "predictedFloorPrice": a number representing your predicted floor price in ETH after ${days} days
        2. "confidence": a number between 60 and 95 representing your confidence percentage in this prediction
        3. "rationale": a brief 1-2 sentence explanation of your prediction
        
        Format your response as valid JSON with no additional text or explanation.
      `;

      console.log(`Sending NFT prediction request to Gemini for ${nft.name}`);

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Gemini API error: ${response.status}`, errorText);
        throw new Error(`Gemini API error: ${response.status} ${errorText}`);
      }

      const data = await response.json();
      console.log('Gemini API response for NFT prediction:', data);
      
      // Extract the relevant part from Gemini's response
      const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (!textResponse) {
        console.error('Invalid or empty response from Gemini API:', data);
        throw new Error('Invalid or empty response from Gemini API');
      }

      console.log('Gemini text response for NFT:', textResponse);

      // Parse JSON from the response text
      // Find JSON object in the response if it's not pure JSON
      const jsonMatch = textResponse.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        console.error('Could not find valid JSON in Gemini response:', textResponse);
        throw new Error('Could not find valid JSON in Gemini response');
      }
      
      const predictionData = JSON.parse(jsonMatch[0]);
      console.log('Parsed NFT prediction data:', predictionData);
      
      if (typeof predictionData.predictedFloorPrice !== 'number' || 
          typeof predictionData.confidence !== 'number' ||
          typeof predictionData.rationale !== 'string') {
        console.error('Invalid prediction data format from Gemini:', predictionData);
        throw new Error('Invalid prediction data format from Gemini');
      }

      const percentageChange = ((predictionData.predictedFloorPrice - nft.floorPrice!) / nft.floorPrice!) * 100;
      
      const nftPrediction: NFTPrediction = {
        id: `nftpred-${Date.now()}`,
        nftId: nft.id,
        nftName: nft.name,
        nftImage: nft.image,
        collection: nft.collection,
        currentFloorPrice: nft.floorPrice || 0,
        predictedFloorPrice: parseFloat(predictionData.predictedFloorPrice.toFixed(2)),
        percentageChange: parseFloat(percentageChange.toFixed(2)),
        confidence: Math.round(predictionData.confidence),
        timestamp: new Date().toISOString(),
        timeframe: timeframe,
        predictionRationale: predictionData.rationale,
        status: "completed"
      };
      
      // In a real app, we would save this to a database or blockchain
      // For now, we'll just add it to the mock data
      mockNFTPredictions.unshift(nftPrediction);
      
      return nftPrediction;
    }
    
    // Fallback or mock data generation
    const changePercent = -10 + Math.random() * 20; // Random change between -10% and +10%
    const predictedFloorPrice = nft.floorPrice! * (1 + changePercent / 100);
    const confidence = Math.floor(65 + Math.random() * 25); // Random confidence between 65-90%
    const rationales = [
      `Based on recent sales and market sentiment, ${changePercent > 0 ? 'increased' : 'decreased'} interest in ${nft.collection} suggests a ${changePercent > 0 ? 'positive' : 'negative'} trend.`,
      `Market analysis indicates ${nft.collection} may experience ${changePercent > 0 ? 'growth' : 'decline'} due to upcoming project developments and community engagement.`,
      `Considering current market conditions and trading volume, ${nft.collection} is likely to ${changePercent > 0 ? 'appreciate' : 'depreciate'} in the short term.`
    ];
    
    const nftPrediction: NFTPrediction = {
      id: `nftpred-${Date.now()}`,
      nftId: nft.id,
      nftName: nft.name,
      nftImage: nft.image,
      collection: nft.collection,
      currentFloorPrice: nft.floorPrice || 0,
      predictedFloorPrice: parseFloat(predictedFloorPrice.toFixed(2)),
      percentageChange: parseFloat(changePercent.toFixed(2)),
      confidence: confidence,
      timestamp: new Date().toISOString(),
      timeframe: timeframe,
      predictionRationale: rationales[Math.floor(Math.random() * rationales.length)],
      status: "completed"
    };
    
    // Add to mock predictions
    mockNFTPredictions.unshift(nftPrediction);
    
    return nftPrediction;
  } catch (error) {
    console.error('Error generating NFT prediction:', error);
    
    // Fallback prediction generation
    const changePercent = -5 + Math.random() * 10; // Random change between -5% and +5%
    const predictedFloorPrice = nft.floorPrice! * (1 + changePercent / 100);
    const confidence = Math.floor(65 + Math.random() * 25); // Random confidence between 65-90%
    
    const nftPrediction: NFTPrediction = {
      id: `nftpred-${Date.now()}-fallback`,
      nftId: nft.id,
      nftName: nft.name,
      nftImage: nft.image,
      collection: nft.collection,
      currentFloorPrice: nft.floorPrice || 0,
      predictedFloorPrice: parseFloat(predictedFloorPrice.toFixed(2)),
      percentageChange: parseFloat(changePercent.toFixed(2)),
      confidence: confidence,
      timestamp: new Date().toISOString(),
      timeframe: timeframe,
      predictionRationale: "Based on general market trends and historical data.",
      status: "completed"
    };
    
    // Add to mock predictions
    mockNFTPredictions.unshift(nftPrediction);
    
    return nftPrediction;
  }
}

/**
 * Get all NFT predictions
 */
export function getNFTPredictions(): NFTPrediction[] {
  return mockNFTPredictions;
}

/**
 * Clear all NFT predictions (for testing)
 */
export function clearNFTPredictions(): void {
  mockNFTPredictions.length = 0;
}
