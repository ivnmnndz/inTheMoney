import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Chart from "./Chart";
import "../css/CoinPage.css";
import TradeModal from "./TradeModal";

const CoinPage = () => {
  const [singleCoin, setSingleCoin] = useState(null);
  let { id } = useParams();

  useEffect(() => {
    fetch(`https://api.coingecko.com/api/v3/coins/${id}?localization=false`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("error");
        }
        return res.json();
      })
      .then((data) => setSingleCoin(data));
  }, [id]);

  return (
    singleCoin && (
      <div className="coin-page-main">
        <div className="coin-page-left">
          <h1>{singleCoin.name}</h1>
          <div className="coin-page-current-stats">
            <h2>
              ${singleCoin.market_data.current_price.usd.toLocaleString()}
            </h2>

            <div>
              ${singleCoin.market_data.price_change_24h.toFixed(2)} Today
            </div>
            <div>
              %{singleCoin.market_data.price_change_percentage_24h.toFixed(2)}{" "}
              Today
            </div>
          </div>

          <div>
            <Chart coin={singleCoin} className={"coin-page-chart"} />
          </div>

          <section className="coin-page-box-info">
            <div className="coin-page-box-info-1">
              <span>Your Market Value</span>
              <span>${singleCoin.market_data.current_price.usd}</span>
              <span>${singleCoin.market_data.price_change_24h.toFixed(2)}</span>
              <span>
                %{singleCoin.market_data.price_change_percentage_24h.toFixed(2)}
              </span>
            </div>
            <div className="coin-page-box-info-2">
              <span>Your Average Cost</span>
              <span>dynamic number</span>
              <span>quantity</span>
              <span>portfolio percentage</span>
            </div>
          </section>
        </div>
        <div className="coin-page-right">
          <TradeModal coin={singleCoin} />
        </div>
      </div>
    )
  );
};

export default CoinPage;
