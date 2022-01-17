import React, { useState, useContext } from "react";
import { CoinContext } from "../context/CoinState";
import "../css/dashboard.css";
import Coin from "./Coin";

const Dashboard = () => {
  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState("market_cap");
  const [sortOrder, setSortOrder] = useState(true);
  const [sortCoinOrder, setSortCoinOrder] = useState(true);
  const [sortSymbolOrder, setSortSymbolOrder] = useState(true);
  const [sortPriceOrder, setSortPriceOrder] = useState(true);
  const [sortVolOrder, setSortVolOrder] = useState(true);
  const [sortPriceChangeOrder, setSortPriceChangeOrder] = useState(true);
  const [sortMktCapOrder, setSortMktCapOrder] = useState(true);

  const { coins, setCoins } = useContext(CoinContext);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  const SortByName = (coinsToSort) => {
    const sortedCoins = coins.sort((a, b) => {
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
        <div
          className="sort-name"
          onClick={SortByName}
          onClickCapture={(e) =>
            setSortType("name") +
            setSortCoinOrder(!sortCoinOrder) +
            setSortOrder(sortCoinOrder)
          }
        >
          Coin<i className="fas fa-sort"></i>
        </div>
        <div
          className="sort-symbol"
          onClick={SortByName}
          onClickCapture={(e) =>
            setSortType("symbol") +
            setSortSymbolOrder(!sortSymbolOrder) +
            setSortOrder(sortSymbolOrder)
          }
        >
          Symbol<i className="fas fa-sort"></i>
        </div>
        <div
          className="sort-price"
          onClick={SortByValue}
          onClickCapture={(e) =>
            setSortType("current_price") +
            setSortPriceOrder(!sortPriceOrder) +
            setSortOrder(sortPriceOrder)
          }
        >
          Price<i className="fas fa-sort"></i>
        </div>
        <div
          className="sort-vol"
          onClick={SortByValue}
          onClickCapture={(e) =>
            setSortType("total_volume") +
            setSortVolOrder(!sortVolOrder) +
            setSortOrder(sortVolOrder)
          }
        >
          Vol.<i className="fas fa-sort"></i>
        </div>
        <div
          className="sort-percent"
          onClick={SortByValue}
          onClickCapture={(e) =>
            setSortType("price_change_percentage_24h") +
            setSortPriceChangeOrder(!sortPriceChangeOrder) +
            setSortOrder(sortPriceChangeOrder)
          }
        >
          %<i className="fas fa-sort"></i>
        </div>
        <div
          className="sort-mktCap"
          onClick={SortByValue}
          onClickCapture={(e) =>
            setSortType("market_cap") +
            setSortMktCapOrder(!sortMktCapOrder) +
            setSortOrder(sortMktCapOrder)
          }
        >
          Mkt Cap<i className="fas fa-sort"></i>
        </div>
      </div>

      {filteredCoins.map((coin, index) => {
        return <Coin key={index} coin={coin} />;

      })}
    </div>
  );
};

export default Dashboard;
