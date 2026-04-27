import { Doughnut } from "react-chartjs-2";
import { watchlist } from "../Data/data";
import WatchListItem from "./WatchListItem";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);


const labels = watchlist.map((subArray) => subArray.name);

 const data = {
  labels,
  datasets: [
    {
      label: "Price",
      data: watchlist.map((stock) => Number(stock.price)),
      backgroundColor: [
        "rgba(255, 99, 132, 0.5)",
        "rgba(54, 162, 235, 0.5)",
        "rgba(255, 206, 86, 0.5)",
        "rgba(75, 192, 192, 0.5)",
        "rgba(153, 102, 255, 0.5)",
        "rgba(255, 159, 64, 0.5)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

export default function WatchList() {
  return (
    <div className="border-r border-gray-100  w-full h-full  md:bg-white p-4 bg-gray-200/90">
      <div className="mb-4">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search eg: infy, bse, nifty fut weekly, gold mcx"
          className="w-full p-2 rounded border border-black md:border-gray-200 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-200"
        />
        <div className="text-xs text-gray-400 mt-1 text-right">
          {watchlist.length} / 50
        </div>
      </div>

      <ul className="list mb-8">
        {watchlist.map((stock, index) => {
          return <WatchListItem stock={stock} key={index} />;
        })}
      </ul>
      <Doughnut data={ data } />
    </div>
  );
}
