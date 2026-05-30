import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:3000/orders",{withCredentials:true});
        // adjust this depending on backend
        setOrders(res.data.data || res.data);
      } catch (error) {
        console.error("Failed to fetch orders", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading orders...</p>;
  }

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-76 space-y-4">
        <p>You haven't placed any orders today</p>
        <Link
          to="/"
          className="bg-orange-500 px-5 py-2 text-white rounded-md"
        >
          Get started
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-lg font-semibold mb-4">Orders</h2>

        <div className="border rounded-md overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Stock</th>
                <th className="px-4 py-2 text-left">Qty</th>
                <th className="px-4 py-2 text-left">Price</th>
                <th className="px-4 py-2 text-left">Type</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{order.name}</td>
                  <td className="px-4 py-2">{order.qty}</td>
                  <td className="px-4 py-2">₹{order.price}</td>
                  <td
                    className={`px-4 py-2 font-medium ${
                      order.mode === "BUY"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {order.mode}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Orders;
