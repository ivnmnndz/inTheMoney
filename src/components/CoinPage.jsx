import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CoinContext } from "../context/CoinState";
import Chart from "./Chart";
import "../css/CoinPage.css";
import TradeModal from "./TradeModal";

const CoinPage = () => {
  const { coins, setCoins, getSingleCoin } = useContext(CoinContext);
  const [singleCoin, setSingleCoin] = useState(null);
  let { id } = useParams();

  /* useEffect(() => {
    getSingleCoin(id).then((data) => setSingleCoin(data));
  }, []); */

  useEffect(() => {
    fetch(`https://api.coingecko.com/api/v3/coins/${id}?localization=false`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("error");
        }
        return res.json();
      })
      .then((data) => setSingleCoin(data));
  }, []);
  console.log(singleCoin);

  function createMarkup() {
    return { __html: singleCoin.description.en };
  }

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
              %{singleCoin.market_data.price_change_percentage_24h.toFixed(2)}
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
          <section>
            <h3>About</h3>
            <div
              className="coin-page-about"
              dangerouslySetInnerHTML={createMarkup()}
            ></div>
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

{
  /*  {coins ? (
   <div className="coin-row">
     <div className="coin-row-container">
       <div className="img-container">
         <img src={coins[0].image} alt="crypto" />
       </div>

       <p className="mobile">name</p>
     </div>
     <div className="coin-row-container">symbol</div>
     <div className="coin-row-container">Price $</div>
     <div className="coin-row-container mobile">Vol. $</div>
     <div className="coin-row-container">percentage %</div>
     <div className="coin-row-container mobile">Mcap: $</div>
     <div className="chart-container">chart</div>
   </div>
 ) : (
   <div>loading</div>
 )} */
}
