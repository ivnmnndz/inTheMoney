import React, { useState, useEffect } from "react";
import "../css/dashboard.css";
import Coin from "./Coin";

const Dashboard = () => {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState("market_cap");
  const [sortOrder, setSortOrder] = useState(true);
  const [sortCoinOrder, setCoinSortOrder] = useState(true);
  const [sortSymbolOrder, setSymbolSortOrder] = useState(true);
  const [sortPriceOrder, setPriceSortOrder] = useState(true);
  const [sortVolOrder, setVolSortOrder] = useState(true);
  const [sortPriceChangeOrder, setPriceChangeSortOrder] = useState(true);
  const [sortMktCapOrder, setMktCapSortOrder] = useState(true);

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

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  const SortByName = () => {
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
        <li
          onClick={SortByName}
          onClickCapture={(e) =>
            setSortType("name") +
            setCoinSortOrder(!sortCoinOrder) +
            setSortOrder(sortCoinOrder)
          }
        >
          Coin<i className="fas fa-sort"></i>
        </li>
        <li
          onClick={SortByName}
          onClickCapture={(e) =>
            setSortType("symbol") +
            setSymbolSortOrder(!sortSymbolOrder) +
            setSortOrder(sortSymbolOrder)
          }
        >
          Symbol<i className="fas fa-sort"></i>
        </li>
        <li
          onClick={SortByValue}
          onClickCapture={(e) =>
            setSortType("current_price") +
            setPriceSortOrder(!sortPriceOrder) +
            setSortOrder(sortPriceOrder)
          }
        >
          Price<i className="fas fa-sort"></i>
        </li>
        <li
          onClick={SortByValue}
          onClickCapture={(e) =>
            setSortType("total_volume") +
            setVolSortOrder(!sortVolOrder) +
            setSortOrder(sortVolOrder)
          }
        >
          Vol.<i className="fas fa-sort"></i>
        </li>
        <li
          onClick={SortByValue}
          onClickCapture={(e) =>
            setSortType("price_change_percentage_24h") +
            setPriceChangeSortOrder(!sortPriceChangeOrder) +
            setSortOrder(sortPriceChangeOrder)
          }
        >
          %<i className="fas fa-sort"></i>
        </li>
        <li
          onClick={SortByValue}
          onClickCapture={(e) =>
            setSortType("market_cap") +
            setMktCapSortOrder(!sortMktCapOrder) +
            setSortOrder(sortMktCapOrder)
          }
        >
          Mkt Cap<i className="fas fa-sort"></i>
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
