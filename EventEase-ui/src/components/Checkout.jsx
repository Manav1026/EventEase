import { useContext, useMemo, useState } from "react";
import CreditCard from "./CreditCard";
import { CartContext } from "./CartContextProvider";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";


const Checkout = () => {
    const { cart, removeFromCart } = useContext(CartContext);
    const totalCost = useMemo(
        () => cart.reduce((acc, x) => acc + x.price, 0),
        [cart]
    );

    console.log(cart);

    return (
        <div className="bg-white shadow rounded-lg p-4">
            <Link to="/">Keep Browsing</Link>
            <h1 className="text-lg font-semibold mt-2">Checkout</h1>
            <h2 className="text-lg font-semibold mt-2">Items in Cart</h2>
            {cart.map((product) => (
                <div key={product._id}>
                    <ProductCard product={product} />
                    <button
                        className="mt-3 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                        onClick={() => removeFromCart(product._id)}
                    >
                        Remove
                    </button>
                </div>
            ))}
            <h1 className="text-lg font-semibold mt-2">Total: ${totalCost}</h1>
            <CreditCard />
        </div>
    );
};

export default Checkout;
