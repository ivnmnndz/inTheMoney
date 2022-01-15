import React, { useContext, useState } from "react";
import { addTradeDoc } from "../firebase/db";
import { AuthContext } from "../context/AuthState";
import Coin from "./Coin";

const TradeModal = ({ coin }) => {
  const { currentUser } = useContext(AuthContext);
  const [currency, setCurrency] = useState(false);
  const [tradeModal, setTradeModal] = useState(false);
  const [sellCoin, setSellCoin] = useState(false);
  const [quantity, setQuantity] = useState(0);
  console.log(coin);

  const handleChange = async (e) => {
    setQuantity(e.target.value);
  };

  const handleTradeModal = () => {
    setTradeModal(!tradeModal);
    setCurrency(false);
    setSellCoin(false);
  };

  const sellCrypto = () => {
    setSellCoin(true);
  };

  const buyCrypto = () => {
    setSellCoin(false);
  };

  const handleCurrencyExchange = () => {
    setCurrency(!currency);
  };

  const dollarResult = price * quantity;
  const cryptoQuantity = quantity / price;

  const buyOrderData = {
    asset: name,
    market_value: price,
    quantity: currency ? Number(cryptoQuantity) : Number(quantity),
    dollar_amount: currency ? Number(quantity) : Number(dollarResult),
    user_id: currentUser && currentUser.uid,
  };
  const sellOrderData = {
    asset: name,
    market_value: price,
    quantity: currency ? Number(-cryptoQuantity) : Number(-quantity),
    dollar_amount: currency ? Number(-quantity) : Number(-dollarResult),
    user_id: currentUser && currentUser.uid,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    sellCoin
      ? await addTradeDoc(sellOrderData)
      : await addTradeDoc(buyOrderData);
    setQuantity(0);
    setTradeModal(false);
    alert("Purchased some coin!");
  };
  return (
    <>
      <div className="modal">
        <div className="modal-content">
          <div className="trade-modal-header">
            <div>
              <button
                className={
                  sellCoin ? "trade-modal-btn" : "trade-modal-btn border"
                }
                onClick={buyCrypto}
              >
                Buy {symbol}
              </button>
              <button
                className={
                  sellCoin ? "trade-modal-btn border" : "trade-modal-btn"
                }
                onClick={sellCrypto}
              >
                Sell {symbol}
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
                <option>{symbol}</option>
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
              <span>${price}</span>
            </div>

            {currency ? (
              <div>
                {sellCoin ? (
                  <span>Est Credit</span>
                ) : (
                  <span>{`Est ${symbol}`}</span>
                )}
                <span>{cryptoQuantity.toFixed(5)}</span>
              </div>
            ) : (
              <div>
                {sellCoin ? <span>Est Credit</span> : <span>Est Cost</span>}
                <span>${dollarResult.toFixed(2)}</span>
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
    </>
  );
};

export default TradeModal;
