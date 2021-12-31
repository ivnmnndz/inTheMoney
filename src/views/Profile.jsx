import React, { useContext, useEffect, useState } from "react";
import "../css/Profile.css";
import { AuthContext } from "../context/AuthState";
import { getMyTrades } from "../firebase/db";

const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  const [myTrades, setMyTrades] = useState([]);
  const [profileElipseModal, setProfileElipseModal] = useState(false);
  const [totalDollarAmount, setTotalDollarAmount] = useState([]);

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
  }, []);
  console.log({ myTrades });

  const profileElipse = () => {
    setProfileElipseModal(!profileElipse);
  };

  const sumOfDollarAmount = myTrades.reduce((sum, currentValue) => {
    return sum + parseInt(currentValue.dollar_amount);
  }, 0);

  console.log({ sumOfDollarAmount });

  const groupBy = (array, key) => {
    return array.reduce((result, currentValue) => {
      (result[currentValue[key]] = result[currentValue[key]] || []).push(
        currentValue
      );

      return result;
    }, {});
  };

  const myTradesGroupByName = groupBy(myTrades, "asset");
  console.log({ myTradesGroupByName });

  let totals = {};
  myTrades.forEach((element) => {
    if (totals[element.asset] !== undefined) {
      totals[element.asset] = {
        quantity: element.quantity + totals[element.asset].quantity,
        dollar_amount:
          element.dollar_amount + totals[element.asset].dollar_amount,
      };
    } else {
      totals[element.asset] = {
        quantity: element.quantity,
        dollar_amount: element.dollar_amount,
      };
    }
  });
  console.log({ totals });

  const sumOfSameCrypto = Object.entries(totals);

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
          <span>Total Amount: ${sumOfDollarAmount}</span>
        </div>
        <div>
          <button>Edit Profile</button>
          <button>Make a trade</button>
        </div>
      </div>

      <div className="user-stats">
        <div className="user-stats-header">
          <span>Current Holdings</span>
        </div>
        <div className="user-stats-body">
          {sumOfSameCrypto.map((trade, i) => (
            <div className="user-stats-container" key={i}>
              <div className="user-stats-body-trade-top">
                <span>{trade[0]}</span>
                {/*trade.dollar_amount will be replaced with dynamic value based on which display you want from elipse */}
                <span>Total Equity: ${trade[1].dollar_amount}</span>
              </div>
              <div className="user-stats-body-trade-bottom">
                <span>Qty:{trade[1].quantity}</span>
                {/*trade.market_value will be replaced with dynamic value based on which display you want from elipse */}
                <span></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <div>Loading</div>
  );
};

export default Profile;
