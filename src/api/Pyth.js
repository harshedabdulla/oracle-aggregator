// src/api/Pyth.js
import { PriceServiceConnection } from '@pythnetwork/price-service-client';

const connection = new PriceServiceConnection('https://hermes.pyth.network');
const priceIds = [
  '0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43', // BTC/USD price id
];

export const fetchPythPrice = async () => {
  try {
    const currentPrices = await connection.getLatestPriceFeeds(priceIds);
    const prices = currentPrices.map(feed => ({
      id: feed.id,
      price: feed.price.price * Math.pow(10, feed.price.expo),
      conf: feed.price.conf * Math.pow(10, feed.price.expo),
      expo: feed.price.expo,
      publishTime: feed.price.publishTime
    }));
    return prices;
  } catch (error) {
    console.error('Error fetching Pyth price:', error);
    return null;
  }
};
