
export default function Summary({
  data = {
    equity: {
      value: "3.74k",
      caption: "Margin available",
      marginsUsed: "0",
      openingBalance: "3.74k",
    },
    holdings: {
      value: "1.55k",
      pnlPercent: "+5.20%",
      caption: "P&L",
      currentValue: "31.43k",
      investment: "29.88k",
      count: 13,
    },
  },
}) {
  const { equity, holdings } = data;

  return (
    <section className="w-full max-w-4xl px-6 py-8">
      {/* Greeting */}
      <div className="mb-6">
        <h6 className="text-lg font-medium text-gray-700">Hi, User!</h6>
        <div className="mt-4 border-t border-gray-200" />
      </div>

      {/* --- Card: Equity --- */}
      <div className="mb-8 bg-white">
        <p className="text-sm text-gray-500 mb-6">Equity</p>

        <div className="flex flex-col md:flex-row md:items-center">
          {/* Left: large number */}
          <div className="md:flex-1">
            <h3 className="text-5xl font-extrabold text-gray-800 tracking-tight leading-tight">
              {equity.value}
            </h3>
            <p className="text-xs text-gray-400 mt-2">{equity.caption}</p>
          </div>

          {/* Vertical divider */}
          <div className="hidden md:block w-px h-16 bg-gray-100 mx-8" />

          {/* Right: small stats */}
          <div className="md:w-72 mt-6 md:mt-0">
            <div className="text-sm text-gray-500 mb-3">
              <div className="flex justify-between">
                <span>Margins used</span>
                <span className="text-gray-700">{equity.marginsUsed}</span>
              </div>
            </div>

            <div className="text-sm text-gray-500">
              <div className="flex justify-between">
                <span>Opening balance</span>
                <span className="text-gray-700">{equity.openingBalance}</span>
              </div>
            </div>
          </div>
        </div>

        {/* thin divider */}
        <div className="mt-6 border-t border-gray-100" />
      </div>

      {/* --- Card: Holdings --- */}
      <div className="bg-white">
        <p className="text-sm text-gray-500 mb-6">
          Holdings <span className="text-gray-400">({holdings.count})</span>
        </p>

        <div className="flex flex-col md:flex-row md:items-center">
          {/* Left */}
          <div className="md:flex-1">
            <h3 className="text-5xl font-extrabold text-green-500 tracking-tight leading-tight">
              {holdings.value}{" "}
              <span className="text-base text-gray-400 font-normal ml-2">
                <small>{holdings.pnlPercent}</small>
              </span>
            </h3>
            <p className="text-xs text-gray-400 mt-2">{holdings.caption}</p>
          </div>

          {/* Vertical divider */}
          <div className="hidden md:block w-px h-16 bg-gray-100 mx-8" />

          {/* Right */}
          <div className="md:w-72 mt-6 md:mt-0">
            <div className="text-sm text-gray-500 mb-3">
              <div className="flex justify-between">
                <span>Current Value</span>
                <span className="text-gray-700">{holdings.currentValue}</span>
              </div>
            </div>

            <div className="text-sm text-gray-500">
              <div className="flex justify-between">
                <span>Investment</span>
                <span className="text-gray-700">{holdings.investment}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 border-t border-gray-100" />
      </div>
    </section>
  );
}
