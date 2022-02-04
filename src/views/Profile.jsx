import React, { useContext, useEffect, useState } from "react";
import "../css/Profile.css";
import { AuthContext } from "../context/AuthState";
import { getMyTrades } from "../firebase/db";
import { Link } from "react-router-dom";
import OnLoadSpinner from "../components/OnLoadSpinner";
import ProfileChart from "../components/ProfileChart";
import { CoinContext } from "../context/CoinState";

const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  const [myTrades, setMyTrades] = useState([]);
  const { coins } = useContext(CoinContext);

  useEffect(() => {
    async function fetchTrades() {
      if (currentUser) {
        const trades = await getMyTrades(currentUser.uid);
        setMyTrades(trades);
      } else {
        console.log("no user");
      }
    }
    fetchTrades();
  }, [currentUser]);

  const sumOfDollarAmount = myTrades
    .reduce((sum, currentValue) => {
      return sum + currentValue.dollar_amount;
    }, 0)
    .toLocaleString();

  let totals = {};
  myTrades.forEach((element) => {
    if (totals[element.asset] !== undefined) {
      totals[element.asset] = {
        name: element.name,
        quantity: element.quantity + totals[element.asset].quantity,
        dollar_amount:
          element.dollar_amount + totals[element.asset].dollar_amount,
      };
    } else {
      totals[element.asset] = {
        name: element.name,
        quantity: element.quantity,
        dollar_amount: element.dollar_amount,
      };
    }
  });

  /* im sure there is an easier and shorter way to do this but this is the best i could do so far */

  /* totalQuantity gets total quantity from every coin i buy and adds it all up */
  const totalQuantiy = Array.from(
    myTrades.reduce(
      (m, { name, quantity }) => m.set(name, (m.get(name) || 0) + quantity),
      new Map()
    ),
    ([name, quantity]) => ({ name, quantity })
  );
  /* totalDollarAmount gets total dollar_amount from every coin i buy and adds it all up */
  const totalDollarAmount = Array.from(
    myTrades.reduce(
      (m, { name, dollar_amount }) =>
        m.set(name, (m.get(name) || 0) + dollar_amount),
      new Map()
    ),
    ([name, dollar_amount]) => ({ name, dollar_amount })
  );

  /*sumOfEachCoin merges the above objects together  */
  let sumOfEachCoin = totalQuantiy.map((item, i) =>
    Object.assign({}, item, totalDollarAmount[i])
  );

  /* the for loop below adds coin gecko api to  sumOfEachCoin if names match*/
  let sumOfSameCoin = [];
  for (let i = 0; i < sumOfEachCoin.length; i++) {
    sumOfSameCoin.push({
      ...sumOfEachCoin[i],
      ...coins.find((name) => name.name === sumOfEachCoin[i].name),
    });
  }

  /* livePrice gets sumOfSameCoin array and multiplies each coins currrent price to what our quantity is */
  const livePrice = sumOfSameCoin.map(
    (trade) => trade.quantity * trade.current_price
  );

  const boughtAtSum = sumOfSameCoin.reduce((sum, x) => {
    return sum + x.dollar_amount;
  }, 0);

  /* liveTotalSum  adds everything in array together to get your live Total */
  let liveTotalSum = livePrice.reduce((sum, x) => {
    return sum + x;
  }, 0);
  /*   let timeInSeconds = new Date().getTime();
  let myChartData = [{ currentTime: timeInSeconds, currentPrice: liveTotalSum }]; */

  /* const sumOfSameCrypto = Object.entries(totals); */

  return currentUser ? (
    <div className="container">
      <div className="user-data">
        <div>
          <span>Name: {currentUser.displayName}</span>
        </div>
        <div>
          <span>Email: {currentUser.email}</span>
        </div>
        <div>
          <span>Total Invested: ${sumOfDollarAmount}</span>
        </div>
        <div>
          <Link to="/dashboard">
            <button>Make a trade</button>
          </Link>
        </div>
      </div>
      <ProfileChart liveTotalSum={liveTotalSum} boughtAtSum={boughtAtSum} />
      <div className="user-stats-header">
        <span>Current Holdings</span>
        <div className="user-stats">
          <div className="user-stats-body">
            {sumOfSameCoin.map((trade, i) => (
              <div className="user-stats-container" key={i}>
                <div className="user-stats-content">
                  <span>{trade.name}</span>
                  <span>{`Total Equity: $${trade.dollar_amount.toFixed(
                    2
                  )}`}</span>
                  <span>{`Qty: ${trade.quantity.toFixed(3)}`}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <OnLoadSpinner />
  );
};

export default Profile;
