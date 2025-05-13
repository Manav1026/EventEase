import { useContext, useMemo, useState } from "react";
import CreditCard from "./CreditCard";
import { CartContext } from "./CartContextProvider";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { CgProfile, CgGlobeAlt } from "react-icons/cg";



const Checkout = () => {
    const { cart, removeFromCart } = useContext(CartContext);
    const totalCost = useMemo(
        () => cart.reduce((acc, x) => acc + (x.product.price*((new Date(x.endDate)-new Date(x.startDate))/ (1000 * 60 * 60 * 24))), 0),
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
    console.log(cart);

    return (
        <div className="bg-gray-100 min-h-screen px-4 sm:px-8 pb-10">
            <header className="flex justify-between items-center py-6 border-b border-gray-300">
                <h1 className="text-3xl font-bold text-blue-700">EventEase</h1>
                    <div className="flex items-center space-x-6">
                    <Link to="/"
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
            <div className="bg-white shadow rounded-lg p-4">
                <h1 className="text-lg font-semibold mt-2">Welcome to Checkout</h1>
                <h2 className="text-lg font-semibold mt-2">Items in Cart:</h2>
                {cart.length!==0?cart.map((productPlus) => (
                    <div key={productPlus.product._id}>
                        <ProductCard product={productPlus.product} />
                        <h2 className="text-lg font-semibold mt-2">{productPlus.orderQuantity}</h2>
                        <h2 className="text-lg font-semibold mt-2">From: {productPlus.startDate}</h2>
                        <h2 className="text-lg font-semibold mt-2">To: {productPlus.endDate}</h2>
                        <button
                            className="mt-3 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                            onClick={() => removeFromCart(productPlus._id)}
                        >
                            Remove
                        </button>
                    </div>
                )):<h2 className="text-red-600 text-lg font-semibold mt-2">Cart is Empty</h2>}
                <h1 className="text-lg font-semibold mt-2">Total: ${totalCost.toFixed(2)}</h1>
                <CreditCard />
            </div>
        </div>
    );
};

export default Checkout;
