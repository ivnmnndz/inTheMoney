import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
import React, { useState, useEffect } from "react";
import "../css/chart.css";

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement);

const Chart = ({ coin, className }) => {
  const [chartData, setChartData] = useState({});
  const dates = {
    /* weekday: "short", */
    month: "short",
    day: "numeric",
    /*  year: "2-digit", */
  };

  useEffect(() => {
    fetch(
      `https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart?vs_currency=usd&days=1`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("error");
        }
        return res.json();
      })
      .then((data) => setChartData(data));
  }, []);

  var data = {
    /* converts api json number into shorthand time */
    labels: chartData.prices
      ? chartData.prices.map((x) =>
          new Date(x[0]).toLocaleDateString(undefined, dates)
        )
      : [],
    datasets: [
      {
        label: "Price",
        data: chartData.prices ? chartData.prices.map((x) => x[1]) : [],

        pointRadius: 0,
        backgroundColor: [
          "rgba(255, 99, 132, .8)",
          "rgba(54, 162, 235, .8)",
          "rgba(255, 206, 86, .8)",
          "rgba(75, 192, 192, .8)",
          "rgba(153, 102, 255, .8)",
          "rgba(255, 159, 64, .8)",
        ],
        borderColor:
          chartData.price_change_percentage_24h > 0 ? "green" : "red",
        borderWidth: 1,
        fill: false,
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
        beginAtZero: false,
        display: true,
      },
      x: {
        /* hiding x-axis labels */ display: true,
      },
    },
  };

  return (
    <div className={className}>
      <Line data={data} options={options} />
    </div>
  );
};

export default Chart;
