import React, { useState, useEffect, nextID } from "react";
import "../css/dashboard.css";
import Coin from "./Coin";

const Dashboard = () => {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState("market_cap");
  const [sortOrder, setSortOrder] = useState(true);

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

  const SortByName = () => {
    setSortOrder(!sortOrder);

    const sortedCoins = coins.sort(function (a, b) {
      let nameA = sortOrder
        ? a[sortType].toUpperCase()
        : b[sortType].toUpperCase();
      let nameB = sortOrder
        ? b[sortType].toUpperCase()
        : a[sortType].toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });

    setCoins([...coins], !sortedCoins);
  };

  const SortByValue = () => {
    setSortOrder(!sortOrder);
    const sortedCoins = coins.sort((a, b) => {
      return sortOrder ? b[sortType] - a[sortType] : a[sortType] - b[sortType];
    });
    setCoins([...coins], sortedCoins);
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
      </div>
      <div className="sort-menu">
          <label>Sort by: </label>

          <li onClick={SortByName} onMouseEnter={(e) => setSortType("name")}>
            Name<i className="fas fa-sort"></i>
          </li>
          <li onClick={SortByName} onMouseEnter={(e) => setSortType("symbol")}>
            Symbol<i className="fas fa-sort"></i>
          </li>
          <li
            onClick={SortByValue}
            onMouseEnter={(e) => setSortType("current_price")}
          >
            Price<i className="fas fa-sort"></i>
          </li>
          <li
            onClick={SortByValue}
            onMouseEnter={(e) => setSortType("total_volume")}
          >
            Volume<i className="fas fa-sort"></i>
          </li>
          <li
            onClick={SortByValue}
            onMouseEnter={(e) => setSortType("price_change_percentage_24h")}
          >
            %<i className="fas fa-sort"></i>
          </li>
          <li
            onClick={SortByValue}
            onMouseEnter={(e) => setSortType("market_cap")}
          >
            Market Cap<i className="fas fa-sort"></i>
          </li>
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
