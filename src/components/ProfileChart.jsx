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
import { log } from "@craco/craco/lib/logger";

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement);

const ProfileChart = ({ myTrades, sumOfSameCrypto }) => {
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
  let merged = [];
  for (let i = 0; i < sumOfEachCoin.length; i++) {
    merged.push({
      ...sumOfEachCoin[i],
      ...coins.find((name) => name.name === sumOfEachCoin[i].name),
    });
  }

  /* livePrice gets merged array and multiplies each coins currrent price to what our quantity is */
  const livePrice = merged.map((trade) => trade.quantity * trade.current_price);

  /* liveTotalSum  adds everything in array together to get your live Total */
  let liveTotalSum = livePrice.reduce((sum, x) => {
    return sum + x;
  }, 0);

  const data = {
    /* labels: new Date().getTime(), */
    datasets: [
      {
        labels: "price",
        data: { liveTotalSum },
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
      <div>Current Portfolio Balance {liveTotalSum}</div>
      <Line data={data} options={options} width={"500"} height={"300"} />
    </div>
  );
};

export default ProfileChart;
