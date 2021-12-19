import React, { useState, useEffect, nextID } from "react";
import "../css/dashboard.css";
import Coin from "./Coin";

const Dashboard = (index) => {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState();

  useEffect(() => {
    fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("error");
        }
        return res.json();
      })
      .then((data) => setCoins(data));
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.toLowerCase())
  );
  // Sort By Value
  const SortByValue = () => {
    const sortedCoins = coins.sort((a, b) => {
      return b.current_price - a.current_price;
    });
    setCoins([...coins], !sortedCoins);
  };

  // Sort By Name
  const SortbyName = () => {
    const sortedCoins = coins.sort(function (a, b) {
      let nameA = a.name.toUpperCase();
      let nameB = b.name.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      // names must be equal
      return 0;
    });

    setCoins([...coins], !sortedCoins);
  };

  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">Search A Currency</h1>
        <form action="">
          <input
            type="text"
            placeholder="Search"
            className="coin-input"
            onChange={handleChange}
          />
        </form>
        <button className="sort" onClick={SortbyName}>
          Sort via Name
        </button>
        <button className="sort" onClick={SortByValue}>
          Sort via Value
        </button>
      </div>
      {filteredCoins.map((coin) => {
        return (
          <Coin
            key={coin.id}
            name={coin.name}
            image={coin.image}
            symbol={coin.symbol}
            marketcap={coin.market_cap}
            price={coin.current_price}
            priceChange={coin.price_change_percentage_24h}
            volume={coin.total_volume}
          />
        );
      })}
    </div>
  );
};

export default Dashboard;
