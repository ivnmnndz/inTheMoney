import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthState";
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
  const { currentUser } = useContext(AuthContext);
  const [currency, setCurrency] = useState(false);
  const [tradeModal, setTradeModal] = useState(false);
  const [quantity, setQuantity] = useState(0);
  
  const handleChange = async (e) => {
    setQuantity(e.target.value);
  };

  const handleTradeModal = () => {
    setTradeModal(!tradeModal);
    setCurrency(false);
  };
  
  const handleCurrencyExchange = () => {
    setCurrency(!currency);
  };

  const dollarResult = parseInt(price * quantity).toFixed(2);
  const cryptoQuantity = parseInt(quantity / price).toFixed(6);
  const orderData = {
    asset: name,
    market_value: price,
    quantity: currency ? cryptoQuantity : quantity,
    dollar_amount: currency ? quantity : dollarResult,
    user_id: currentUser && currentUser.uid,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addTradeDoc(orderData);
    setQuantity(0);
    setTradeModal(false);
    alert("Purchased some coin!")
  };

  return (
    <>
      <div onClick={handleTradeModal} className="coin-row">
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

      {tradeModal && (
        <div className="modal">
          <div onClick={handleTradeModal} className="trade-overlay"></div>
          <div className="modal-content">
            <div className="trade-modal-header">
              <div>
                <button className="trade-modal-btn">
                  Buy {symbol.toUpperCase()}
                </button>
                <button className="trade-modal-btn">
                  Sell {symbol.toUpperCase()}
                </button>
              </div>

              <button className="close-modal" onClick={handleTradeModal}>
                X
              </button>
            </div>

            <form onSubmit={handleSubmit} className="trade-form">

              <div>
                <span>Buy in</span>
                <select onChange={handleCurrencyExchange}>
                  <option>{symbol.toUpperCase()}</option>
                  <option>USD</option>
                </select>
              </div>

              <label htmlFor="trade-input">
                Amount
                {currency ? (
                  <input
                    onChange={handleChange}
                    placeholder="$0.00"
                    name="quantity"
                    type="number"
                    id="trade-input"
                    value={quantity}
                  />
                ) : (
                  <input
                    onChange={handleChange}
                    placeholder="0"
                    name="quantity"
                    type="number"
                    id="trade-input"
                    value={quantity}
                  />
                )}

              </label>
              <div>
                <span>Current Price</span>
                <span>${price.toLocaleString()}</span>
              </div>

              {currency ? (
                <div>
                  <span>{`Est ${symbol.toUpperCase()}`}</span>
                  <span>{cryptoQuantity}</span>
                </div>
              ) : (
                <div>
                  <span>Est Cost</span>
                  <span>${dollarResult}</span>
                </div>
              )}

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
