import { Link } from "react-router-dom";

export default function HomeInfo() {
  const isLoggedIn = true; // later you can replace with auth state

  return (
    <div className="p-10 max-w-4xl">
      {/* HERO SECTION */}
      <h1 className="text-3xl font-semibold mb-3">
        Welcome to TradeSpark Dashboard
      </h1>

      <p className="text-gray-600 mb-6">
        TradeSpark is a modern stock trading dashboard designed to help users
        track markets, manage trades, and analyze investments efficiently.
      </p>

      {/* CTA BUTTONS */}
      <div className="flex gap-4 mb-10">
        {!isLoggedIn && (
          <Link
            to="/login"
            className="px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-500-700 transition"
          >
            Login
          </Link>
        )}

        {isLoggedIn && (
          <Link
            to="/dashboard"
            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          >
            Let’s Trade 🚀
          </Link>
        )}
      </div>

      {/* FEATURE GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Feature title="📊 Dashboard">
          Live prices, charts, and real-time market insights.
        </Feature>

        <Feature title="📑 Orders">
          Track buy & sell orders with instant status updates.
        </Feature>

        <Feature title="💼 Holdings">
          Long-term investments with profit/loss tracking.
        </Feature>

        <Feature title="📈 Positions">
          Monitor intraday & open positions effectively.
        </Feature>

        <Feature title="💰 Funds">
          View margins, balance, and fund details.
        </Feature>

        <Feature title="🧩 Apps">
          Smart tools and extensions for better trading.
        </Feature>
      </div>
    </div>
  );
}

/* Reusable Feature Card */
function Feature({ title, children }) {
  return (
    <div className="border rounded-lg p-5 shadow-sm hover:shadow-md transition">
      <h2 className="font-semibold mb-2">{title}</h2>
      <p className="text-sm text-gray-600">{children}</p>
    </div>
  );
}
