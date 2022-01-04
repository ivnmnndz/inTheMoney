import React, { useContext, useEffect, useState } from "react";
import "../css/Profile.css";
import { AuthContext } from "../context/AuthState";
import { getMyTrades } from "../firebase/db";
import { Link } from "react-router-dom";

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
  }, [currentUser]);
  console.log({ myTrades });

  const profileElipse = () => {
    setProfileElipseModal(!profileElipse);
  };

  const sumOfDollarAmount = myTrades.reduce((sum, currentValue) => {
    return sum + currentValue.dollar_amount;
  }, 0);

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
          <span>Total Invested: ${sumOfDollarAmount}</span>
        </div>
        <div>
          <Link to="/dashboard">
            <button>Make a trade</button>
          </Link>
        </div>
      </div>

      <div className="user-stats">
        <div className="user-stats-header">
          <span>Current Holdings</span>
        </div>
        <div className="user-stats-body">
          {sumOfSameCrypto.map((trade, i) => (
            <div className="user-stats-container" key={i}>
              <div className="user-stats-content">
                <span>{trade[0]}</span>
                <span>{`Total Equity: $${trade[1].dollar_amount}`}</span>
                <span>{`Qty: ${trade[1].quantity}`}</span>
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
