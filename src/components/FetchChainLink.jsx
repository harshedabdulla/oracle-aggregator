import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { fetchChainlinkPrice } from '../api/Chainlink'; // Adjust path based on your project structure
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const FetchChainLink = () => {
  const [priceData, setPriceData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [priceHistory, setPriceHistory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchChainlinkPrice();
        setPriceData(data);
        const currentTime = new Date().toLocaleString(); // Get current time
        setPriceHistory(prevHistory => [
          ...prevHistory,
          {
            roundId: data.roundId.toString(),
            price: data.answer / 100000000,
            updatedAt: currentTime,
          }
        ]);
      } catch (error) {
        setError(error);
      }
      setIsLoading(false);
    };

    fetchData();
    const interval = setInterval(fetchData, 10000); // Fetch data every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Sidebar />
      <div className="p-4 sm:ml-64">
        <div className="flex flex-col md:flex-row justify-between items-center my-4">
          <h1 className="poppins text-[#3a3a3a] text-3xl mb-3 md:mb-0 ml-5">
            Latest BTC/USD Chainlink Price Data
          </h1>
        </div>
        {/* Line Chart for Price History */}
        <div className="mt-8">
          <h2 className="poppins text-[#3a3a3a] text-2xl mb-3">Price History</h2>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={priceHistory} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="updatedAt" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="price" stroke="#52a1cb" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">Error: {error.message}</p>
          ) : priceData ? (
            <div>
              <p className="poppins text-[#3a3a3a] text-2xl mb-3">Price Details</p>
              <ul>
                <li className="mb-3 font-bold">Price: ${priceData.answer.toString() / 100000000}</li>
                <li className="mb-3">Round ID: {priceData.roundId.toString()}</li>
                <li className="mb-3">Updated At: {new Date().toLocaleString()}</li> {/* Display current time */}
              </ul>
            </div>
          ) : (
            <p>No data fetched yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FetchChainLink;
