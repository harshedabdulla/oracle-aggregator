# Oracle Aggregator Dashboard

This project is a web-based Oracle Aggregator Dashboard built using React. It aggregates and displays real-time cryptocurrency price data from multiple sources including Chainlink and Pyth.


## Overview

The Oracle Aggregator Dashboard is a single-page application that fetches cryptocurrency price data from multiple oracle sources and displays it in a user-friendly interface. It provides real-time updates and analytics to monitor price differences and stability across different sources.

## Getting Started

### Prerequisites

Make sure you have Node.js and npm installed on your machine.

### Installation


```bash
git clone https://github.com/harshedabdulla/oracle-aggregator.git
cd oracle-aggregator
npm install
npm run dev
```

## Features

Real-time aggregation of cryptocurrency prices
Display of aggregate price, individual oracle prices (Chainlink, Pyth), and analytics (price difference, price stability)
Automatic data refresh every 10 seconds
Responsive design for mobile and desktop viewing

## Technologies Used
- React.js
- JavaScript (ES6+)
- Axios for API requests
- Oracle, Aggregation, and APIs

### Oracle
In blockchain and cryptocurrency contexts, an Oracle refers to a service that provides real-world data to smart contracts or applications on the blockchain. Oracles are essential for fetching external data (like cryptocurrency prices) that are not native to the blockchain environment.

### Aggregation
Aggregation involves combining data from multiple sources to provide a unified view or average value. In this project, aggregation refers to combining cryptocurrency price data from multiple oracle sources (Chainlink, Pyth) to calculate and display an average or aggregate price.

### BTC, Pyth, Chainlink
BTC: Bitcoin, the first and most well-known cryptocurrency.
Pyth: A cryptocurrency data provider that offers price feeds.
Chainlink: A decentralized oracle network that provides real-world data to smart contracts on the blockchain.



