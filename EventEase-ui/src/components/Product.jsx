import { useParams } from "react-router-dom";
import { useGetData } from "../hooks/useGetData";
import { auth } from "../firebase";
import { useContext } from "react";
import { CartContext } from "./CartContextProvider";
import { Link } from "react-router-dom";

const Product = () => {
    const { id } = useParams();
    // console.log(auth.currentUser)
    // const token = auth.currentUser.getIdToken();
    const {data: product} = useGetData(`http://localhost:3000/api/products/${id}`);
    const { addToCart, cart } = useContext(CartContext);


    return (
        <div className="bg-white shadow rounded-lg p-4">
            <Link to="/checkout">Checkout</Link>
            {" "}
            <Link to="/">Back to Browse</Link>
            {/* <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded"
            /> */}
            <h2 className="text-lg font-semibold mt-2">{product?.name}</h2>
            <p className="text-gray-500">{product?.category}</p>
            <p className="text-sm mt-1">{product?.status}</p>
            <p className="text-sm mt-1">{product?.description}</p>
            <p className="text-sm mt-1">{product?.size}</p>
            <p className="text-sm mt-1">{product?.color}</p>
            <p className="text-sm mt-1">{product?.quantity}</p>
            <p className="font-bold mt-2">${product?.price}/day</p>
            {!cart.includes(product) && <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={() => addToCart(product)}>
                Add to Cart
            </button>}
        </div>
    );
};

export default Product;
