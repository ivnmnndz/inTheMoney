import React, { useContext, useEffect, useState, useRef } from "react";
import { GlobalContext } from "../context/GlobalState";
import "../css/coin.css";
import { addTradeDoc } from "../firebase/db";

const Coin = ({
  image,
  name,
  symbol,
  price,
  volume,
  priceChange,
  marketcap,
}) => {
  const { currentUser } = useContext(GlobalContext);
  /* const inputRef = useRef(0); */
  const [modal, setModal] = useState(false);
  const [trade, setTrade] = useState(false);

  const tradeInfo = {
    asset: name,
    market_value: price,
    quantity: 0,
    dollar_amount: 0,
    user_id: currentUser.uid,
  };

  const [tradeData, setTradeData] = useState(tradeInfo);

  const result = price * tradeData.quantity;

  const handleChange = async (e) => {
    setTradeData({
      ...tradeData,
      quantity: e.target.value,
      dollar_amount: result,
    });
  };

  const tradeModal = () => {
    setTrade(!trade);
  };

  if (trade) {
    document.body.classList.add("trade-modal");
  } else {
    document.body.classList.remove("trade-modal");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addTradeDoc(tradeData);
  };

  return (
    <>
      <div onClick={tradeModal} className="coin-row">
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

      {trade && (
        <div className="modal">
          <div onClick={tradeModal} className="trade-overlay"></div>
          <div className="modal-content">
            <div className="trade-modal-header">
              <select name="currencySelect" id="">
                <option defaultValue value="usd">
                  USD
                </option>
                <option value={name}>{symbol.toUpperCase()}</option>
              </select>
              <button className="close-modal" onClick={tradeModal}>
                X
              </button>
            </div>
            <h2>{name}</h2>

            <form onSubmit={handleSubmit} className="trade-form" action="">
              <label htmlFor="trade-input">
                {`Amount in ${symbol.toUpperCase()}`}
                <input
                  /* ref={inputRef} */
                  onChange={handleChange}
                  name="quantity"
                  type="number"
                  id="trade-input"
                  value={tradeData.quantity}
                />
              </label>
              <div>
                <span>Est Price</span>
                <span>${price.toLocaleString()}</span>
              </div>
              <div>
                <span>Est Cost</span>
                <span>${result}</span>
              </div>
              <div>
                <button className="trade-form-btn" type="submit">
                  Confirm Trade
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Coin;
