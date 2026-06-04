import { useContext, useState } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";

const SellActionWindow = ({ uid }) => {

  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);

  const { closeWindow } = useContext(GeneralContext);

  const handleSellClick = async () => {

    if (stockQuantity <= 0 || stockPrice <= 0) {
      alert("Enter valid quantity and price");
      return;
    }

    try {

      const res = await axios.post(
        "https://trade-spark-backend.onrender.com/newOrder",
        {
          name: uid,
          qty: Number(stockQuantity),
          price: Number(stockPrice),
          mode: "SELL",
        },
        {
          withCredentials: true,
        }
      );

      alert(res.data.message);

      closeWindow();

    } catch (error) {

      console.error("Sell order failed:", error);

      alert(
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Sell order failed"
      );
    }
  };

  return (
    <div
      id="sell-window"
      draggable="true"
      className="fixed top-40 md:right-40 z-50 md:w-[380px] rounded-lg bg-white shadow-xl border"
    >

      {/* Header */}
      <div className="border-b px-4 py-3 font-semibold text-gray-800">
        Sell {uid}
      </div>

      {/* Inputs */}
      <div className="p-4">

        <div className="flex gap-4">

          <fieldset className="w-1/2 border rounded px-3 py-2">

            <legend className="text-xs text-gray-500 px-1">
              Qty.
            </legend>

            <input
              type="number"
              min="1"
              className="w-full outline-none text-sm"
              value={stockQuantity}
              onChange={(e) =>
                setStockQuantity(e.target.value)
              }
            />

          </fieldset>

          <fieldset className="w-1/2 border rounded px-3 py-2">

            <legend className="text-xs text-gray-500 px-1">
              Price
            </legend>

            <input
              type="number"
              step="0.05"
              min="0"
              className="w-full outline-none text-sm"
              value={stockPrice}
              onChange={(e) =>
                setStockPrice(e.target.value)
              }
            />

          </fieldset>

        </div>

      </div>

      {/* Footer */}
      <div className="border-t px-4 py-3 flex items-center justify-between">

        <span className="text-xs text-gray-500">
          Funds to be credited after sell
        </span>

        <div className="flex gap-3">

          <button
            onClick={handleSellClick}
            className="rounded bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
          >
            Sell
          </button>

          <button
            onClick={closeWindow}
            className="rounded bg-gray-200 px-4 py-2 text-sm text-gray-700 hover:bg-gray-300"
          >
            Cancel
          </button>

        </div>

      </div>

    </div>
  );
};

export default SellActionWindow;