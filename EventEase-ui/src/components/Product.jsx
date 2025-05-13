import { useParams } from "react-router-dom";
import { useGetData } from "../hooks/useGetData";
import { auth } from "../firebase";
import { useContext, useState } from "react";
import { CartContext } from "./CartContextProvider";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { CgProfile, CgGlobeAlt, CgShoppingCart } from "react-icons/cg";
import { useNavigate } from "react-router-dom";



const Product = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    // console.log(auth.currentUser)
    // const token = auth.currentUser.getIdToken();
    const {data: product} = useGetData(`http://localhost:3000/api/products/${id}`);
    const { addToCart, cart } = useContext(CartContext);
    const [ error, setError ] = useState(false);
    const cartIds = cart.map((x) => x._id);

    const handleOrder = async (e) => {
      e.preventDefault();
      const orderQuantity = document.getElementById("orderQuantity").value;
      const startDate = document.getElementById("startDate").value;
      const endDate = document.getElementById("endDate").value;
      if(new Date(endDate)>=new Date(startDate)) {
        setError(false);
        addToCart({
          _id: product._id,
          product,
          orderQuantity,
          startDate,
          endDate,
        });
        navigate('/');
      } else {
        setError(true);
      }
    }


    const user = auth.currentUser;
    console.log(user)
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
                <h1 className="text-3xl font-bold text-blue-700">EventEase</h1>
                {user ? (
                  <div className="flex items-center space-x-6">
                    <Link to="/"
                      className="flex items-center text-blue-700 hover:text-blue-900 font-medium">
                      <CgGlobeAlt size={22} className="mr-1" />
                      Back to Browse
                    </Link>
                    <Link to="/checkout"
                        className="flex items-center text-blue-700 hover:text-blue-900 font-medium">
                        <CgShoppingCart size={22} className="mr-1" />
                        Cart
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
                ) : (
                  <div className="space-x-4">
                    <Link to="/"
                      className="flex items-center text-blue-700 hover:text-blue-900 font-medium">
                      <CgGlobeAlt size={22} className="mr-1" />
                      Back to Browse
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

        <div className="bg-white shadow rounded-lg p-4">
            <img
                src={product?.image}
                alt={product?.name}
                className="w-full h-40 object-cover rounded"
            />
            <h2 className="text-lg font-semibold mt-2">{product?.name}</h2>
            <p className="text-gray-500">{product?.category}</p>
            <p className="text-sm mt-1">{product?.status}</p>
            <p className="text-sm mt-1">{product?.description}</p>
            <p className="text-sm mt-1">{product?.size}</p>
            <p className="text-sm mt-1">{product?.color}</p>
            <p className="text-sm mt-1">{product?.quantity}</p>
            <p className="font-bold mt-2">${product?.price}/day</p>
            {(!cartIds.includes(product?._id) && user) && 
            <div>
                <form onSubmit={handleOrder}>
                    <input type="number" id="orderQuantity" placeholder="Quantity" max={product?.quantity} min={1} required/>
                    <br/>
                    <input type="date" id="startDate" min={new Date().toISOString().split('T')[0]} required/>
                    {" "}
                    <input type="date" id="endDate" required/>
                    <br/>
                    {error&&<h2 className="text-red-600">End Date must come after Start Date</h2>}
                    <button type="submit" className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                        Add to Cart
                    </button>
                </form>
            </div>}
        </div>
      </div>
    );
};

export default Product;
