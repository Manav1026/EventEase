import { useParams } from "react-router-dom";
import { useGetData } from "../hooks/useGetData";
import { auth } from "../firebase";
import { useContext, useState } from "react";
import { CartContext } from "./CartContextProvider";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { CgProfile, CgGlobeAlt, CgShoppingCart } from "react-icons/cg";

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // console.log(auth.currentUser)
  // const token = auth.currentUser.getIdToken();
  const { data: product, loading } = useGetData(
    `http://localhost:3000/api/products/${id}`
  );
  const { addToCart, cart } = useContext(CartContext);
  const [error, setError] = useState(false);
  const cartIds = cart.map((x) => x._id);

  const handleOrder = async (e) => {
    e.preventDefault();
    const orderQuantity = document.getElementById("orderQuantity").value;
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;
    if (new Date(endDate) >= new Date(startDate)) {
      setError(false);
      addToCart({
        _id: product._id,
        product,
        orderQuantity,
        startDate,
        endDate,
      });
      navigate("/");
    } else {
      setError(true);
    }
  };

  const user = auth.currentUser;
  console.log(user);
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
        {user ? (
          <div className="flex items-center space-x-6">
            <Link
              to="/"
              className="flex items-center text-blue-700 hover:text-blue-900 font-medium">
              <CgGlobeAlt size={22} className="mr-1" /> Home
            </Link>
            <Link
              to="/checkout"
              className="flex items-center text-blue-700 hover:text-blue-900 font-medium">
              <CgShoppingCart size={22} className="mr-1" /> Cart
              {cart.length > 0 && (
                <span className="relative -top-2 -right-2 bg-off-white-700 hover:bg-blue-900 text-black text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                  {cart.length > 99 ? '99+' : cart.length}
                </span>
              )}
            </Link>
            <Link
              to="/dashboard"
              className="flex items-center text-blue-700 hover:text-blue-900 font-medium">
              <CgProfile size={22} className="mr-1" /> Profile
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
        ) : (
          <div className="space-x-4">
            <Link
              to="/"
              className="flex items-center text-blue-700 hover:text-blue-900 font-medium">
              <CgGlobeAlt size={22} className="mr-1" /> Back to Browse
            </Link>
            <Link to="/login">
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Login
              </button>
            </Link>
            <Link to="/register">
              <button className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300">
                Sign Up
              </button>
            </Link>
          </div>
        )}
      </header>
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <div className="bg-white shadow-lg rounded-xl p-6 mt-8 max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
          <img
            src={product.mediaUrl? `http://localhost:3000${product?.mediaUrl}` : "/no_image.jpeg"}
            alt={product?.name}
            className="w-full h-64 object-cover rounded-lg border"
          />

          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-gray-800">
              {product?.name}
            </h2>
            <p className="text-sm text-blue-600 font-medium uppercase">
              {product?.category}
            </p>
            <p className="text-sm text-gray-500">{product?.description}</p>

            <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
              <p>
                <span className="font-semibold">Size:</span> {product?.size}
              </p>
              <p>
                <span className="font-semibold">Color:</span> {product?.color}
              </p>
              <p>
                <span className="font-semibold">Quantity:</span>{" "}
                {product?.quantity}
              </p>
              <p>
                <span className="font-semibold">Status:</span>{" "}
                <span
                  className={`${
                    product?.status === "in stock"
                      ? "text-green-600"
                      : "text-red-600"
                  } font-semibold`}>
                  {product?.status}
                </span>
              </p>
            </div>

            <p className="text-xl font-bold text-green-700 mt-4">
              ${product?.price}{" "}
              <span className="text-base font-normal text-gray-500">/day</span>
            </p>

            {!cartIds.includes(product?._id) &&
              user &&
              product?.status === "in stock" && (
                <form onSubmit={handleOrder} className="space-y-3 pt-4">
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="orderQuantity"
                      className="text-sm font-medium text-gray-700">
                      Quantity
                    </label>
                    <input
                      type="number"
                      id="orderQuantity"
                      placeholder="Quantity"
                      max={product?.quantity}
                      min={1}
                      required
                      className="border rounded px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="startDate"
                      className="text-sm font-medium text-gray-700">
                      Start Date
                    </label>
                    <input
                      type="date"
                      id="startDate"
                      min={new Date().toISOString().split("T")[0]}
                      required
                      className="border rounded px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="endDate"
                      className="text-sm font-medium text-gray-700">
                      End Date
                    </label>
                    <input
                      type="date"
                      id="endDate"
                      required
                      className="border rounded px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  {error && (
                    <p className="text-red-600 text-sm mt-2">
                      End Date must come after Start Date.
                    </p>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-blue-800 hover:bg-blue-700 text-white py-2 px-4 rounded mt-2 transition">
                    Add to Cart
                  </button>
                </form>
              )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
