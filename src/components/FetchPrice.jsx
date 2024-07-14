import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { fetchPythPrice } from '../api/Pyth';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const FetchPricePyth = () => {
  const [prices, setPrices] = useState([]);
  const [priceHistory, setPriceHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pythPrices = await fetchPythPrice();
        const formattedPrices = pythPrices.map(price => ({
          id: price.id,
          price: price.price,
          time: new Date(price.publishTime * 1000).toLocaleTimeString()
        }));

        setPrices(pythPrices);
        setPriceHistory(prevHistory => [...prevHistory, ...formattedPrices]);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData(); // Initial fetch

    const intervalId = setInterval(fetchData, 10000); // Fetch every 10 seconds

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, []);

  return (
    <div>
      <Sidebar />
      <div className="p-4 sm:ml-64">
        <div className="flex flex-col md:flex-row justify-between items-center my-4">
          <h1 className="poppins text-[#3a3a3a] text-3xl mb-3 md:mb-0 ml-5">
            Latest BTC/USD Pyth Network Data
          </h1>
        </div>
        <div className="">
          <div>
            <h2 className="poppins text-[#3a3a3a] text-2xl mb-3">Price Details</h2>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={priceHistory} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="price" stroke="#52a1cb" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="poppins text-[#3a3a3a] text-2xl mb-3">Current Prices</h2>
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="text-red-500">Error: {error}</p>
            ) : (
              <div>
                {prices.length > 0 ? (
                  prices.map(price => (
                    <div key={price.id} className="mb-4">
                      <p className="font-bold">Price: ${price.price.toFixed(2)}</p>
                      <p>Confidence: ${price.conf.toFixed(2)}</p>
                      <p>Publish Time: {new Date(price.publishTime * 1000).toLocaleString()}</p>
                    </div>
                  ))
                ) : (
                  <p>No prices available</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FetchPricePyth;
