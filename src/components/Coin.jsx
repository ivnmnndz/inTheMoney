
import React from "react";
import { Link } from "react-router-dom";
import "../css/coin.css";
import Chart from "./Chart";


const Coin = ({ coin }) => {
  const {
    id,
    image,
    name,
    symbol,
    current_price,
    total_volume,
    price_change_percentage_24h,
    market_cap,
  } = coin;

  const numFormat = (num) => {
    if (num > 1000000000) {
      return (num / 1000000000).toFixed(1) + "B";
    } else if (num > 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num < 1000000) {
      return num;
    }
  };

  const formatVolume = numFormat(total_volume);
  const formatMarketCap = numFormat(market_cap);

  return (
    <>
      <div className="coin-row">
        <div className="coin-row-container">
          <div className="img-container">
            <Link to={`/${id}`}>
              <img src={image} alt="crypto" />
            </Link>
          </div>
          <p className="mobile">{name}</p>
        </div>
        <div className="coin-row-container">{symbol.toUpperCase()}</div>
        <div className="coin-row-container">
          Price ${current_price.toLocaleString()}
        </div>
        <div className="coin-row-container mobile">Vol. ${formatVolume}</div>
        <div className="coin-row-container">
          <p
            className={`coin-percent ${
              price_change_percentage_24h < 0 ? "red" : "green"
            }`}
          >
            {price_change_percentage_24h.toFixed(2)}%
          </p>
        </div>
        <div className="coin-row-container mobile">
          Mcap: ${formatMarketCap}
        </div>
        <Chart coin={coin} className={"coin-row-chart"} />
      </div>
    </>
  );
};

export default Coin;
