import { useContext, useMemo } from "react";
import CreditCard from "./CreditCard";
import { CartContext } from "./CartContextProvider";
import ProductCard from "./ProductCard";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { CgProfile, CgGlobeAlt } from "react-icons/cg";
import { auth } from "../firebase";

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart } = useContext(CartContext);
  const totalCost = useMemo(
    () =>
      cart.reduce(
        (acc, x) =>
          acc +
          x.product.price *
            ((new Date(x.endDate) - new Date(x.startDate)) /
              (1000 * 60 * 60 * 24)),
        0
      ),
    [cart]
  );

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen px-4 sm:px-8 pb-10">
      <header className="flex justify-between items-center py-6 border-b border-gray-300">
        <h1 className="text-3xl font-bold text-blue-700">
          <Link to={"/"}>EventEase</Link>
        </h1>
        <div className="flex items-center space-x-6">
          <Link
            to="/"
            className="flex items-center text-blue-700 hover:text-blue-900 font-medium">
            <CgGlobeAlt size={22} className="mr-1" />
            Back to Browse
          </Link>
          <Link
            to="/dashboard"
            className="flex items-center text-blue-700 hover:text-blue-900 font-medium">
            <CgProfile size={22} className="mr-1" />
            Profile
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-gray-700 hover:text-blue-700 transition font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 11-4 0v-1m0-8V7a2 2 0 114 0v1"
              />
            </svg>
            Logout
          </button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto bg-white shadow rounded-2xl p-6 sm:p-10 mt-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Checkout</h1>

        {cart.length !== 0 ? (
          <div className="space-y-8">
            {cart.map((productPlus) => (
              <div
                key={productPlus.product._id}
                className="bg-white border border-gray-300 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div className="flex items-center gap-4 w-full sm:w-3/4">
                  <img
                    src={`http://localhost:3000${productPlus.product.mediaUrl}`}
                    alt={productPlus.product.name}
                    className="w-28 h-20 object-cover rounded-md shadow-sm"
                  />

                  <div className="flex flex-col justify-between">
                    <h2 className="text-lg font-semibold text-gray-800">
                      {productPlus.product.name}
                    </h2>
                    <p className="text-gray-500 text-sm">
                      {productPlus.product.description}
                    </p>
                    <p className="text-green-600 font-bold text-base mt-1">
                      ${productPlus.product.price}/day
                    </p>

                    <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 text-sm text-gray-700 gap-2">
                      <p>
                        <span className="font-medium">Qty:</span>{" "}
                        {productPlus.orderQuantity}
                      </p>
                      <p>
                        <span className="font-medium">From:</span>{" "}
                        {productPlus.startDate}
                      </p>
                      <p>
                        <span className="font-medium">To:</span>{" "}
                        {productPlus.endDate}
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 w-full sm:w-auto"
                  onClick={() => removeFromCart(productPlus._id)}>
                  Remove
                </button>
              </div>
            ))}

            <div className="border-t pt-6 text-right">
              <h2 className="text-xl font-semibold text-gray-800">
                Total: ${totalCost.toFixed(2)}
              </h2>
            </div>

            <div className="mt-6">
              <CreditCard />
            </div>
          </div>
        ) : (
          <h2 className="text-red-600 text-lg font-semibold mt-2">
            Your cart is currently empty.
          </h2>
        )}
      </div>
    </div>
  );
};

export default Checkout;
