import React, { useState, useEffect } from 'react';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import LocalAtmOutlinedIcon from '@mui/icons-material/LocalAtmOutlined';
import TokenOutlinedIcon from '@mui/icons-material/TokenOutlined';
import { getAveragePrice } from '../api/aggregate';
import { fetchChainlinkPrice } from '../api/Chainlink';
import { fetchPythPrice } from '../api/Pyth';
import '../Styles/Slider.css';

const Dash = () => {
  const [aggregatePrice, setAggregatePrice] = useState(null);
  const [chainlinkPrice, setChainlinkPrice] = useState(null);
  const [pythPrice, setPythPrice] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const avgPrice = await getAveragePrice();
        setAggregatePrice(avgPrice);

        const clPrice = await fetchChainlinkPrice();
        setChainlinkPrice(clPrice?.answer / 100000000); 

        const pythPrices = await fetchPythPrice();
        if (pythPrices && pythPrices.length > 0) {
          setPythPrice(pythPrices[0].price); 
        }
      } catch (error) {
        setError(error);
      }
      setIsLoading(false);
    };

    fetchData();
    
    const interval = setInterval(fetchData, 10000);

    return () => clearInterval(interval);
  }, []); 

  return (
    <div className="px-5 py-4">
      <div>
        <div className="flex flex-col md:flex-row justify-between items-center">
          <h1 className="poppins text-[#000814] text-3xl mb-3 md:mb-0">
            Oracle Aggregator Dashboard
          </h1>
        </div>
        <div className="my-10 grid grid-cols-2 md:grid-cols-2 gap-5">
          <div className="rounded-[15px] border-2 px-5 py-5 flex flex-col justify-between">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <h1 className="poppins text-2xl mb-6 md:mb-0 ">
                Aggregate Price
              </h1>
              <MonetizationOnOutlinedIcon className="text-[#000814] text-3xl" />
            </div>
            <h3 className="mr-auto text-[#000814] text-4xl mt-2 font-bold">{aggregatePrice !== null ? `$${aggregatePrice.toFixed(2)}` : 'Loading...'}</h3>
          </div>
        </div>
        <div className="poppins text-[#000814] text-3xl mb-6 md:mb-0">Current Prices</div>
        <div className="my-4 grid grid-cols-2 md:grid-cols-2 gap-5">
          <div className="rounded-[15px] border-2 px-5 py-5 flex flex-col justify-between">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <h1 className="poppins text-2xl mb-6 md:mb-0 ">
                Chainlink Price
              </h1>
              <LocalAtmOutlinedIcon className="text-[#000814] text-3xl" />
            </div>
            <h3 className="mr-auto text-[#000814] text-4xl mt-2 font-bold">{chainlinkPrice !== null ? `$${chainlinkPrice.toFixed(2)}` : 'Loading...'}</h3>
          </div>
          <div className="rounded-[15px] border-2 px-5 py-5 flex flex-col justify-between">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <h1 className="poppins text-2xl ">Pyth Price</h1>
              <TokenOutlinedIcon className="text-[#000814] text-3xl" />
            </div>
            <h3 className="mr-auto text-[#000814] font-bold text-4xl mt-2">{pythPrice !== null ? `$${pythPrice.toFixed(2)}` : 'Loading...'}</h3>
          </div>
        </div>
        <div className="poppins text-[#000814] text-3xl mb-6 md:mb-0">Analytics</div>
        <div className="my-4 grid grid-cols-2 md:grid-cols-2 gap-5">
          <div className="rounded-[15px] border-2 px-5 py-5 flex flex-col justify-between">
            <h1 className="poppins text-2xl mb-6 md:mb-0 ">Price Difference</h1>
            <div className="flex flex-col md:flex-row justify-between items-center">
              <h3 className="mr-auto text-[#000814] text-4xl mt-2 font-bold">{(pythPrice !== null && chainlinkPrice !== null) ? `$${(pythPrice - chainlinkPrice).toFixed(2)}` : 'Loading...'}</h3>
              <span className="text-gray-500">{(pythPrice !== null && chainlinkPrice !== null) ? `${((pythPrice - chainlinkPrice) / chainlinkPrice * 100).toFixed(2)}% difference` : ''}</span>
            </div>
          </div>
          <div className="rounded-[15px] border-2 px-5 py-5 flex flex-col justify-between">
            <h1 className="poppins text-2xl mb-6 md:mb-0 ">Price Stability</h1>
            <div className="flex flex-col md:flex-row justify-between items-center">
              <h3 className="mr-auto text-[#000814] text-4xl mt-2 font-bold">{aggregatePrice !== null ? `$${(aggregatePrice * 0.02).toFixed(2)}` : 'Loading...'}</h3>
              <span className="text-gray-500">±2% of average price</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dash;
