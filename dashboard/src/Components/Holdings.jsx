import axios from "axios";
import { useEffect, useState } from "react";
import VerticalGraph from "./VerticalGraph";

function Holdings() {
  const [allHoldings, setAllHoldings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHoldings = async () => {
      try {
        const res = await axios.get(
          "https://trade-spark-backend.onrender.com//allHoldings",
          {
            withCredentials: true,
          }
        );

        console.log("Backend Response:", res.data);

        // Backend returns:
        // { success: true, data: [...] }

        setAllHoldings(
          Array.isArray(res.data.data)
            ? res.data.data
            : []
        );
      } catch (error) {
        console.error(
          "Error fetching holdings:",
          error
        );
        setAllHoldings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHoldings();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        Loading holdings...
      </div>
    );
  }

  const labels = allHoldings.map(
    (stock) => stock.name
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Stock Price",
        data: allHoldings.map(
          (stock) => Number(stock.price || 0)
        ),
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
        ],
      },
    ],
  };

  const totalInvestment = allHoldings.reduce(
    (sum, stock) =>
      sum +
      Number(stock.avg || 0) *
        Number(stock.qty || 0),
    0
  );

  const currentValue = allHoldings.reduce(
    (sum, stock) =>
      sum +
      Number(stock.price || 0) *
        Number(stock.qty || 0),
    0
  );

  const totalPnL =
    currentValue - totalInvestment;

  const pnlPercent =
    totalInvestment === 0
      ? 0
      : (totalPnL / totalInvestment) * 100;

  const pnlClass =
    totalPnL >= 0
      ? "text-green-600"
      : "text-red-600";

  return (
    <div className="space-y-6 px-6 py-8">
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

              <th className="border-r border-gray-300">
                LTP
              </th>

              <th>Cur. val</th>
              <th>P&amp;L</th>
              <th>Net chg.</th>
              <th>Day chg.</th>
            </tr>
          </thead>

          <tbody>
            {allHoldings.map(
              (stock, index) => {
                const price = Number(
                  stock.price || 0
                );

                const avg = Number(
                  stock.avg || 0
                );

                const qty = Number(
                  stock.qty || 0
                );

                const curValue =
                  price * qty;

                const pnl =
                  curValue - avg * qty;

                const rowPnlClass =
                  pnl >= 0
                    ? "text-green-600"
                    : "text-red-600";

                return (
                  <tr
                    key={stock._id || index}
                    className="h-12 border border-gray-200 even:bg-gray-50"
                  >
                    <td className="border-r border-gray-300 px-2">
                      {stock.name}
                    </td>

                    <td>{qty}</td>

                    <td>
                      {avg.toFixed(2)}
                    </td>

                    <td className="border-r border-gray-300">
                      {price.toFixed(2)}
                    </td>

                    <td>
                      {curValue.toFixed(2)}
                    </td>

                    <td className={rowPnlClass}>
                      {pnl.toFixed(2)}
                    </td>

                    <td className={rowPnlClass}>
                      {stock.net || "0%"}
                    </td>

                    <td
                      className={
                        stock.isDown
                          ? "text-red-600"
                          : "text-green-600"
                      }
                    >
                      {stock.day || "0%"}
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </div>

      <div className="md:grid grid-cols-3 gap-6 mt-10">
        <div>
          <h5 className="text-3xl">
            ₹
            {totalInvestment.toLocaleString(
              "en-IN",
              {
                minimumFractionDigits: 2,
              }
            )}
          </h5>

          <p>Total Investment</p>
        </div>

        <div>
          <h5 className="text-3xl">
            ₹
            {currentValue.toLocaleString(
              "en-IN",
              {
                minimumFractionDigits: 2,
              }
            )}
          </h5>

          <p>Current Value</p>
        </div>

        <div>
          <h5
            className={`text-3xl ${pnlClass}`}
          >
            ₹
            {totalPnL.toLocaleString(
              "en-IN",
              {
                minimumFractionDigits: 2,
              }
            )}
            {" ("}
            {pnlPercent.toFixed(2)}%
            {")"}
          </h5>

          <p>P&amp;L</p>
        </div>
      </div>

      {allHoldings.length > 0 && (
        <div className="mt-12">
          <VerticalGraph data={data} />
        </div>
      )}
    </div>
  );
}

export default Holdings;