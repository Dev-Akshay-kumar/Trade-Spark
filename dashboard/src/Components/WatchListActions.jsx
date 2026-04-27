import BarChartIcon from "@mui/icons-material/BarChart";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Grow, Tooltip } from "@mui/material";
import GeneralContext from "./GeneralContext";
import { useContext } from "react";

export default function WatchListActions({ uid }) {
  const { openBuyWindow } = useContext(GeneralContext);
  const { openSellWindow } = useContext(GeneralContext);
  const handleBuyClick = () => {
    openBuyWindow(uid);
  };
  const handleSellClick = () => {
    openSellWindow(uid);
  };
  return (
    <>
      <div className="flex gap-2">
        <Tooltip title="Buy" placement="top" arrow slots={{ transition: Grow }}>
          <button
            className="text-xs px-2 py-1 bg-blue-500 text-white rounded cursor-pointer"
            onClick={handleBuyClick}
          >
            B
          </button>
        </Tooltip>

        <Tooltip title="Sell" placement="top" arrow>
          <button
            className="text-xs px-2 py-2 bg-red-600 text-white rounded cursor-pointer"
            onClick={handleSellClick}
          >
            S
          </button>
        </Tooltip>
        <Tooltip title="charts" placement="top" arrow>
          <button className="border rounded bg-gray-100">
            <BarChartIcon />
          </button>
        </Tooltip>
        <Tooltip title="charts" placement="top" arrow>
          <button className="border rounded">
            <MoreHorizIcon />
          </button>
        </Tooltip>
      </div>
    </>
  );
}
