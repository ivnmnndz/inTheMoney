import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
import React, { useContext } from "react";
import "../css/chart.css";
import { CoinContext } from "../context/CoinState";

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement);

const ProfileChart = ({ liveTotalSum, boughtAtSum }) => {
  const { chartData } = useContext(CoinContext);
  /* liveDifference is the difference between the sum of the current value of coins we bought  - the sum of coins value at which we bought at  */
  const liveDifference = liveTotalSum - boughtAtSum;

  const data = {
    labels: chartData.prices
      ? chartData.prices.map((x) =>
          new Date(x[0]).toLocaleTimeString([], {
            hour: "numeric",
            minute: "numeric",
            /*  day: "numeric", */
          })
        )
      : [],
    datasets: [
      {
        labels: "price",
        data: chartData.prices
          ? chartData.prices.map((x) => liveDifference)
          : [],

        pointRadius: 0,
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
