
import { fetchPythPrice } from './Pyth';
import { fetchChainlinkPrice } from './Chainlink';

export const getAveragePrice = async () => {
  try {
    
    const pythPrice = await fetchPythPrice();
    const chainlinkPrice = await fetchChainlinkPrice();

    
    const pythPriceValue = pythPrice[0]?.price || 0; 
    const chainlinkPriceValue = chainlinkPrice?.answer / 100000000 || 0; 
    console.log('Pyth price:', pythPriceValue);
    console.log('Chainlink price:', chainlinkPriceValue);
    
    const averagePrice = (pythPriceValue + chainlinkPriceValue) / 2;

    return averagePrice;
  } catch (error) {
    console.error('Error calculating average price:', error);
    throw error; 
  }
};
