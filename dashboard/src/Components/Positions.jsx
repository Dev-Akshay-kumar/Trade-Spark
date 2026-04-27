import axios from "axios";
import { useEffect, useState } from "react";
function Positions () {
  let [allPositions,setAllPositions]=useState([]);

  useEffect(() => {
    const fetchPositions = async () => {
      const res = await axios.get("http://localhost:3000/allPositions");
      setAllPositions(res.data);
    };
    fetchPositions();
  }, []);

  return (
    <>
      <div className="space-y-6 w-full max-w-4xl px-6 py-8">
        <h3 className="text-slate-500 text-lg font-semibold">Positions ({allPositions.length})</h3>

        <div className="overflow-x-auto">
          <table className="w-full max-w-7xl border-collapse text-center border-y border-gray-300">
            <thead className="">
            <tr className="bg-red-300 border border-gray-300 h-10">
              <th className="border-r border-gray-300
              ">Product</th>
              <th>Instrument</th>
              <th>Qty.</th>
              <th className="border-r border-gray-300 ">Avg.</th>
              <th>LTP</th>
              <th>P&L</th>
              <th>Chg.</th>
            </tr>
            </thead>
            <tbody>
              {allPositions.map((stock, index) => {
                const curValue = stock.price * stock.qty;
                const pnl = curValue - stock.avg * stock.qty;

                const pnlClass = pnl >= 0 ? "text-green-600" : "text-red-600";
                const dayClass = stock.isLoss
                  ? "text-red-600"
                  : "text-green-600";

                return (
                  <tr
                    key={index}
                    className="h-12 border border-gray-200 even:bg-gray-50"
                  >
                    <td className="border-r border-gray-300 px-2">
                      {stock.product}
                    </td>   
                    <td>{stock.name}</td>
                    <td>{stock.qty}</td>
                    <td className="border-r border-gray-300">{stock.avg.toFixed(2)}</td>
                    <td >
                      {stock.price.toFixed(2)}
                    </td>
                    <td className={pnlClass}>{pnl.toFixed(2)}</td>
                    {/* <td className={pnlClass}>{stock.net}</td> */}
                    <td className={dayClass}>{stock.day}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Positions;
