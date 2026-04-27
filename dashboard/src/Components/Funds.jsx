import { Link } from "react-router-dom";

function Funds() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 w-full max-w-4xl px-4 md:px-6 py-6 md:py-8 gap-6">
        <div className="w-full col-span-1">
          <h2 className="text-gray-600 text-lg font-semibold mb-3">Equity</h2>

          <div className="border rounded-md p-4 md:p-5 space-y-3 bg-white shadow-sm">
            <div className="flex justify-between text-gray-700">
              <p>Available margin</p>
              <p className="font-medium text-gray-900">4,043.10</p>
            </div>
            <div className="flex justify-between text-gray-700">
              <p>Used margin</p>
              <p className="font-medium text-gray-900">3,757.30</p>
            </div>
            <div className="flex justify-between text-gray-700">
              <p>Available cash</p>
              <p className="font-medium text-gray-900">4,043.10</p>
            </div>

            <hr className="border-gray-200" />

            <div className="flex justify-between text-gray-700">
              <p>Opening Balance</p>
              <p>4,043.10</p>
            </div>
            <div className="flex justify-between text-gray-700">
              <p>Opening Balance</p>
              <p>3736.40</p>
            </div>
            <div className="flex justify-between text-gray-700">
              <p>Payin</p>
              <p>4064.00</p>
            </div>
            <div className="flex justify-between text-gray-700">
              <p>SPAN</p>
              <p>0.00</p>
            </div>
            <div className="flex justify-between text-gray-700">
              <p>Delivery margin</p>
              <p>0.00</p>
            </div>
            <div className="flex justify-between text-gray-700">
              <p>Exposure</p>
              <p>0.00</p>
            </div>
            <div className="flex justify-between text-gray-700">
              <p>Options premium</p>
              <p>0.00</p>
            </div>

            <hr className="border-gray-200" />

            <div className="flex justify-between text-gray-700">
              <p>Collateral (Liquid funds)</p>
              <p>0.00</p>
            </div>
            <div className="flex justify-between text-gray-700">
              <p>Collateral (Equity)</p>
              <p>0.00</p>
            </div>
            <div className="flex justify-between text-gray-700">
              <p>Total Collateral</p>
              <p>0.00</p>
            </div>
          </div>
        </div>

        <div className="col-span-1 md:col-span-2 space-y-8">
          <div className="space-y-4">
            <p className="text-gray-500">
              Instant, zero-cost fund transfers with UPI
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link className="bg-orange-500 text-white px-3 py-2 rounded-md text-center">
                Add funds
              </Link>
              <Link className="bg-orange-500 text-white px-3 py-2 rounded-md text-center">
                Withdraw
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-gray-500">You don't have a commodity account</p>
            <Link className="bg-orange-500 text-white px-3 py-2 rounded-md inline-block text-center">
              Open Account
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Funds;
