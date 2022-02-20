import React, { useContext, useState } from "react";
import { addTradeDoc } from "../firebase/db";
import { AuthContext } from "../context/AuthState";

const TradeModal = ({ coin }) => {
  const { currentUser } = useContext(AuthContext);
  const [currency, setCurrency] = useState(false);
  const [sellCoin, setSellCoin] = useState(false);
  const [quantity, setQuantity] = useState(0);

  const handleChange = async (e) => {
    setQuantity(e.target.value);
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

  const dollarResult = coin.market_data.current_price.usd * quantity;
  const cryptoQuantity = quantity / coin.market_data.current_price.usd;
  const transactionDate = new Date().getTime();

  const buyOrderData = {
    createdAt: transactionDate,
    asset: coin.id,
    name: coin.name,
    market_value: coin.market_data.current_price.usd,
    quantity: currency ? Number(cryptoQuantity) : Number(quantity),
    dollar_amount: currency ? Number(quantity) : Number(dollarResult),
    user_id: currentUser && currentUser.uid,
  };
  const sellOrderData = {
    createdAt: transactionDate,
    asset: coin.id,
    name: coin.name,
    market_value: coin.market_data.current_price.usd,
    quantity: currency ? Number(-cryptoQuantity) : Number(-quantity),
    dollar_amount: currency ? Number(-quantity) : Number(-dollarResult),
    user_id: currentUser && currentUser.uid,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (sellCoin) {
      await addTradeDoc(sellOrderData);
      alert(`Sold some ${coin.name}`);
    } else {
      await addTradeDoc(buyOrderData);
      alert(`Purchased some ${coin.name}`);
    }
    setQuantity(0);
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
                Buy {coin.symbol}
              </button>
              <button
                className={
                  sellCoin ? "trade-modal-btn border" : "trade-modal-btn"
                }
                onClick={sellCrypto}
              >
                Sell {coin.symbol}
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="trade-form">
            <div>
              <span>Buy in</span>
              <select onChange={handleCurrencyExchange}>
                <option>{coin.symbol}</option>
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
              <span>Current</span>
              <span>
                ${coin.market_data.current_price.usd.toLocaleString("en-US")}
              </span>
            </div>

            {currency ? (
              <div>
                {sellCoin ? (
                  <span>Est Credit</span>
                ) : (
                  <span>{`Est ${coin.symbol}`}</span>
                )}
                <span>{cryptoQuantity.toFixed(5)}</span>
              </div>
            ) : (
              <div>
                {sellCoin ? <span>Est Credit</span> : <span>Est Cost</span>}
                <span>${dollarResult.toLocaleString("en-US")}</span>
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
