import { useState } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import WatchListActions from "./WatchListActions";


function WatchListItem ({ stock }) {
  let [showWatchListActions, setWatchListActions] = useState(false);

  const handlwMouseEnter = (e) => {
    setWatchListActions(true);
  };
  const handleMouseLeave = (e) => {
    setWatchListActions(false);
  };

  const handleClick=(e)=>{
    setWatchListActions((prev)=>!prev);
  };

  return (
    <li
      onMouseEnter={handlwMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className="group md:flex items-center justify-between px-4 py-3 space-y-2 hover:bg-gray-50 rounded-2xl cursor-pointer"

    > 
      <div className="">
      <span className={`text-sm font-medium ${
            stock.isDown ? "text-red-600" : "text-green-600"
          }`}>{stock.name}</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-700">{stock.price.toFixed(2)}</span>
        {stock.isDown? (<KeyboardArrowDownIcon />):
        (<KeyboardArrowUpIcon />)}
        <span
          className={`text-sm font-medium ${
            stock.isDown ? "text-red-600" : "text-green-600"
          }`}
        >
          {stock.percent}
        </span>       
      </div>
      {showWatchListActions && <WatchListActions uid={stock.name} />}
    </li>
  );
};

export default WatchListItem;

