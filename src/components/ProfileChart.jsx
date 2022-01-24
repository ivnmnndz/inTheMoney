import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
import React, { useState, useEffect, useContext } from "react";
import "../css/chart.css";
import { CoinContext } from "../context/CoinState";

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement);

const ProfileChart = ({ className, myTrades, sumOfSameCrypto }) => {
  /*   const [liveData, setLiveData] = useState([final, new Date().getTime()]); */

  const [chartData, setChartData] = useState({});

  const { coins } = useContext(CoinContext);

  // we need below api to get X and Y axis on chart. X-axis = transactionTime , Y-axis = prices
  useEffect(() => {
    fetch(
      `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("error");
        }
        return res.json();
      })

      .then((data) => setChartData(data));
  }, []);

  const sumOfDollarAmount = myTrades.reduce((sum, currentValue) => {
    return sum + currentValue.dollar_amount;
  }, 0);

  let coinName = coins.map((x) => x.id);
  let myTradesName = myTrades.map((x) => x.asset);

  // commented out below because it needs to return with optional chaining or else it crashes.
  //const livePrice = product of coin amount and current coin market value

  const updatedPrice = () => {
    try {
      const livePrice = sumOfSameCrypto[0][1].quantity * coins[0].current_price;
      const profitAndLoss = livePrice - sumOfSameCrypto[0][1].dollar_amount;
      const liveTotal = profitAndLoss + sumOfSameCrypto[0][1].dollar_amount;
      return liveTotal;
    } catch (err) {
      console.log("PNL not working");
    }
  };
  console.log(updatedPrice());

  const matchedNames = () => {
    if ((coinName = myTradesName)) {
      return;
    }
  };

  console.log(coinName);
  console.log(myTradesName);
  console.log(matchedNames());

  const final = updatedPrice();

  const nf = new Intl.NumberFormat("en-US");
  console.log(final);
  //commented out below because it needs to return with optional chaining or else it crashes
  // const profitAndLoss = sum of purchase price and current price

  const data = {
    /* converts api json number into shorthand time */
    /*  labels: liveData[1], */
    datasets: [
      {
        labels: "price",
        data: { final },
        backgroundColor: [
          "rgba(255, 99, 132, .8)",
          "rgba(54, 162, 235, .8)",
          "rgba(255, 206, 86, .8)",
          "rgba(75, 192, 192, .8)",
          "rgba(153, 102, 255, .8)",
          "rgba(255, 159, 64, .8)",
        ],
        borderColor: "green",
        borderWidth: 1,
        fill: true,
      },
    ],
  };

  var options = {
    plugins: {
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    hover: {
      mode: "nearest",
      intersect: false,
    },
    maintainAspectRatio: true,
    scales: {
      /* hiding y-axis labels */
      y: {
        grid: {
          display: false,
        },
        beginAtZero: false,
        display: true,
      },
      x: {
        grid: {
          display: false,
        },
        /* hiding x-axis labels */ display: true,
      },
    },
  };

  return (
    <div>
      <div>Current Portfolio Balance {nf.format(final)}</div>
      <Line data={data} options={options} width={"500"} height={"300"} />
    </div>
  );
};

export default ProfileChart;
