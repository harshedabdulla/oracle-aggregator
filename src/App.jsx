import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Dashboard from './components/Dashboard';  
import FetchPricePyth from './components/FetchPrice';
import FetchChainLink from './components/FetchChainLink';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/FetchPricePyth' element={<FetchPricePyth />} />
        <Route path='/FetchPriceChain' element={<FetchChainLink />} />

        <Route path='/' element={
            <Dashboard />
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
