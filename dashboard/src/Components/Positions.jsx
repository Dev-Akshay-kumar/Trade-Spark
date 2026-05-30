import { positions } from "../Data/data";

function Positions() {

  const allPositions = positions;

  return (
    <>
      <div className="space-y-6 w-full max-w-4xl px-6 py-8">

        <h3 className="text-slate-500 text-lg font-semibold">
          Positions ({allPositions.length})
        </h3>

        <div className="overflow-x-auto">

          <table className="w-full max-w-7xl border-collapse text-center border-y border-gray-300">

            <thead>

              <tr className="bg-red-300 border border-gray-300 h-10">

                <th className="border-r border-gray-300">
                  Product
                </th>

                <th>Instrument</th>

                <th>Qty.</th>

                <th className="border-r border-gray-300">
                  Avg.
                </th>

                <th>LTP</th>

                <th>P&amp;L</th>

                <th>Chg.</th>

              </tr>

            </thead>

            <tbody>

              {allPositions.map((stock, index) => {

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

                const pnlClass =
                  pnl >= 0
                    ? "text-green-600"
                    : "text-red-600";

                const dayClass =
                  stock.isLoss
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

                    <td>{qty}</td>

                    <td className="border-r border-gray-300">
                      {avg.toFixed(2)}
                    </td>

                    <td>
                      {price.toFixed(2)}
                    </td>

                    <td className={pnlClass}>
                      {pnl.toFixed(2)}
                    </td>

                    <td className={dayClass}>
                      {stock.day}
                    </td>

                  </tr>
                );
              })}

            </tbody>

          </table>

        </div>

      </div>
    </>
  );
}

export default Positions;