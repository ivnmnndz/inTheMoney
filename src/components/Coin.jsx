import React, { useState } from "react";
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
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  return (
    <div onClick={toggleModal} className="coin-container">
      <div className="coin-row">
        <img src={image} alt="crypto" />
        <h1>{name}</h1>
        <p className="coin-symbol">{symbol}</p>

        <p className="coin-price">${price.toLocaleString()}</p>

        <p className="coin-volume">Vol. ${volume.toLocaleString()}</p>
        {priceChange < 0 ? (
          <p className="coin-percent red">{priceChange.toFixed(1)}%</p>
        ) : (
          <p className="coin-percent green">{priceChange.toFixed(1)}%</p>
        )}
        <p className="coin-marketcap">Mkt Cap: ${marketcap.toLocaleString()}</p>
      </div>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2>{name}</h2>
            <p>{price.toLocaleString()}</p>
            <p>
              {priceChange < 0 ? (
                <p className="coin-percent red">{priceChange.toFixed(2)}%</p>
              ) : (
                <p className="coin-percent green">{priceChange.toFixed(2)}%</p>
              )}
            </p>
            <div className="coin-btn">
              <button className="btn-buy">Buy</button>
              <button className="btn-sell">Sell</button>
            </div>
          </div>
          <button className="close-modal" onClick={toggleModal}>
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default Coin;
