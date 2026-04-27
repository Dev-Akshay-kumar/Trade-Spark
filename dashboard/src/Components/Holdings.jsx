import axios from "axios";
import { useState, useEffect } from "react";
import VerticalGraph from "./VerticalGraph";

function Holdings() {
  let [allHoldings, setAllHoldings] = useState([]);

  useEffect(() => {
    const fetchHoldings = async () => {
      const res = await axios.get("http://localhost:3000/allHoldings",{
        withCredentials: true,
      });
      setAllHoldings(res.data);
    };
    fetchHoldings();
  }, []);

  const labels = allHoldings.map((subArray) => subArray.name);

  const data = {
    labels,
    datasets: [
      {
        label: "Stock Price",
        data: allHoldings.map((stock) => Number(stock.price)),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  // 🔹 Summary calculations
  const totalInvestment = allHoldings.reduce(
    (sum, stock) => sum + stock.avg * stock.qty,
    0
  );

  const currentValue = allHoldings.reduce(
    (sum, stock) => sum + stock.price * stock.qty,
    0
  );

  const totalPnL = currentValue - totalInvestment;

  const pnlPercent =
    totalInvestment === 0 ? 0 : (totalPnL / totalInvestment) * 100;

  const pnlClass = totalPnL >= 0 ? "text-green-600" : "text-red-600";

  return (
    <>
      <div className="space-y-6  px-6 py-8">
        <h3 className="text-lg font-semibold">
          Holdings ({allHoldings.length})
        </h3>

        <div className="w-full overflow-x-auto">
          <table className="w-full max-w-7xl border-collapse text-center border-y border-gray-300">
            <thead>
              <tr className="bg-red-300 border border-gray-300 h-10">
                <th className="text-left border-r border-gray-300 pl-3">
                  Instrument
                </th>
                <th>Qty.</th>
                <th>Avg. cost</th>
                <th className="border-r border-gray-300">LTP</th>
                <th>Cur. val</th>
                <th>P&L</th>
                <th>Net chg.</th>
                <th>Day chg.</th>
              </tr>
            </thead>

            <tbody>
              {allHoldings.map((stock, index) => {
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
                      {stock.name}
                    </td>
                    <td>{stock.qty}</td>
                    <td>{stock.avg.toFixed(2)}</td>
                    <td className="border-r border-gray-300">
                      {stock.price.toFixed(2)}
                    </td>
                    <td>{curValue.toFixed(2)}</td>
                    <td className={pnlClass}>{pnl.toFixed(2)}</td>
                    <td className={pnlClass}>{stock.net}</td>
                    <td className={dayClass}>{stock.day}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Summary section */}
        <div className="md:grid grid-cols-3 gap-6 mt-10 ">
          <div className="space-y-2">
            <h5 className="text-gray-700 text-3xl">
              {totalInvestment.toLocaleString("en-IN", {
                minimumFractionDigits: 2,
              })}
            </h5>
            <p className="text-gray-500">Total investment</p>
          </div>

          <div className="space-y-2">
            <h5 className="text-gray-700 text-3xl">
              {currentValue.toLocaleString("en-IN", {
                minimumFractionDigits: 2,
              })}
            </h5>
            <p className="text-gray-500">Current value</p>
          </div>

          <div className="space-y-2">
            <h5 className={`text-3xl ${pnlClass}`}>
              {totalPnL.toLocaleString("en-IN", {
                minimumFractionDigits: 2,
              })}{" "}
              ({pnlPercent.toFixed(2)}%)
            </h5>
            <p className="text-gray-500">P&amp;L</p>
          </div>
        </div>

        <div className="w-full min-w-0 mt-12">
          <VerticalGraph data={data} />
        </div>
      </div>
    </>
  );
}

export default Holdings;
