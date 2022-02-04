import React, { createContext, useState, useEffect } from "react";

//create context
export const CoinContext = createContext();

//export a provider component to wrap children components
export const CoinProvider = ({ children }) => {
  const [coins, setCoins] = useState([]);
  const [repeater, setRepeater] = useState(0);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const getCoins = () => {
      fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false`
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error("error");
          }
          return res.json();
        })
        .then((data) => setCoins(data));
    };

    getCoins();
    setTimeout(() => setRepeater((prevState) => prevState + 1), 100000);
  }, [repeater]);

  useEffect(() => {
    const coinChart = () => {
      fetch(
        `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1`
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error("error");
          }
          return res.json();
        })
        .then((data) => setChartData(data));
    };
    coinChart();
  }, []);

  return (
    <CoinContext.Provider
      value={{
        coins,
        setCoins,
        chartData,
        setChartData,
      }}
    >
      {children}
    </CoinContext.Provider>
  );
};
