import { Link } from "react-router-dom";
import GeneralContext from "./GeneralContext";
import { useContext, useState } from "react";
import axios from "axios";

const BuyActionWindow = ({ uid }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);
  const { closeWindow } = useContext(GeneralContext);

  const handleBuyClick = () => {
    try {
      axios.post("http://localhost:3000/newOrder", {
        name: uid,
        qty: stockQuantity,
        price: stockPrice,
        mode: "BUY",
      });
      closeWindow();
      alert("Buy order placed successfully!");
    } catch (error) {
      console.error("Buy order failed:", error);
      alert("Buy order failed. Please try again.");
    }
  };

  const handlecloseClick = () => {
    closeWindow();
  };
  return (
    <div
      id="buy-window"
      draggable="true"
      className="fixed top-40 md:right-40 z-50 md:w-[380px] rounded-lg bg-white shadow-xl border"
    >
      <div className="border-b px-4 py-3 font-semibold text-gray-800">
        Buy {uid}
      </div>
      <div className="p-4">
        <div className="flex gap-4">
          <fieldset className="w-1/2 border rounded px-3 py-2">
            <legend className="text-xs text-gray-500 px-1">Qty.</legend>
            <input
              type="number"
              className="w-full outline-none text-sm"
              onChange={(e) => {
                setStockQuantity(e.target.value);
              }}
              value={stockQuantity}
            />
          </fieldset>

          <fieldset className="w-1/2 border rounded px-3 py-2">
            <legend className="text-xs text-gray-500 px-1">Price</legend>
            <input
              type="number"
              step="0.05"
              className="w-full outline-none text-sm"
              onChange={(e) => {
                setStockPrice(e.target.value);
              }}
              value={stockPrice}
            />
          </fieldset>
        </div>
      </div>
      <div className="border-t px-4 py-3 flex items-center justify-between">
        <span className="text-xs text-gray-500">Margin required ₹140.65</span>
        <div className="flex gap-3">
          <button
            onClick={handleBuyClick}
            className="rounded bg-orange-500 px-4 py-2 text-sm text-white hover:bg-orange-500-700 cursor-pointer"
          >
            Buy
          </button>

          <Link
            to=""
            onClick={handlecloseClick}
            className="rounded bg-gray-200 px-4 py-2 text-sm text-gray-700 hover:bg-gray-300 cursor-pointer"
          >
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;
