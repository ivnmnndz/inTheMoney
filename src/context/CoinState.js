import React, { createContext, useState, useEffect } from "react";

//create context
export const CoinContext = createContext();

//export a provider component to wrap children components
export const CoinProvider = ({ children }) => {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
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
  }, []);

  /*  const getSingleCoin = (id) => {
    fetch(
      `https://api.coingecko.com/api/v3/coins/${id}?localization=false`
    ).then((res) => {
      if (!res.ok) {
        throw new Error("error");
      }
      return res.json();
    })
     .then((data) => console.log(data)); 
  }; */

  return (
    <CoinContext.Provider
      value={{
        coins,
        setCoins,
      }}
    >
      {children}
    </CoinContext.Provider>
  );
};
