import React from "react";
import "../css/coin.css";

const Coin = ({
  image,
  name,
  symbol,
  price,
  volume,
  priceChange,
  marketcap,
}) => {
  return (
    <div className="coin-container">
      <div className="coin-row">
        <div className="coin">
          <img src={image} alt="crypto" />
          <h1>{name}</h1>
          <span className="coin-symbol">{symbol}</span>
        </div>
        <div className="coin-data">
          <span className="coin-price">${price}</span>
          <span className="coin-volume">Vol. {volume.toLocaleString()}</span>
          {priceChange < 0 ? (
            <span className="coin-percent red">{priceChange.toFixed(2)}%</span>
          ) : (
            <span className="coin-percent green">
              {priceChange.toFixed(2)}%
            </span>
          )}
          <span className="coin-marketcap">
            Mkt Cap: ${marketcap.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Coin;
