import { useParams } from "react-router-dom";
import { useGetData } from "../hooks/useGetData";

const Product = () => {
    const { id } = useParams();
    const {data: product} = useGetData(`http://localhost:3000/api/products/${id}`);

    return (
        <div className="bg-white shadow rounded-lg p-4">
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
            <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Add to Cart
            </button>
        </div>
    );
};

export default Product;
