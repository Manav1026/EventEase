import React from "react";
import { Link } from "react-router-dom";

//TODO Decide if entire card is the link or if there is a button as a link(Don't put a button in the Link)

const ProductCard = ({ product }) => (
  //<Link to={`/products/${product._id}`}>
  <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all overflow-hidden flex flex-col">
    <div className="relative">
      <img
        src={product.mediaUrl? `http://localhost:3000${product?.mediaUrl}` : "/no_image.jpeg"}
        alt={product.name}
        className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
      />
      <span className="absolute top-2 left-2 bg-yellow-600 text-white text-xs font-medium px-3 py-1 rounded-full">
        {product.category}
      </span>
    </div>

    <div className="p-4 flex flex-col flex-1">
      <h2 className="text-lg font-bold text-gray-800 truncate">
        {product.name}
      </h2>
      <p className="text-sm text-gray-500 line-clamp-2 mt-1">
        {product.description}
      </p>

      <div className="mt-auto">
        <p className="text-green-600 font-semibold mt-3 text-lg">
          ${product.price}/day
        </p>
        <Link to={`/products/${product._id}`} className="block mt-3 w-full bg-sky-400 text-white py-2 text-center rounded-lg hover:bg-blue-700 transition"
        >
          View Details
        </Link>
      </div>
    </div>
  </div>
  //</Link>
);

export default ProductCard;

{
  /*<a
      href={product.link}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white rounded-lg shadow hover:shadow-md transition p-4"
    >
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full h-40 object-contain mb-4"
      />
      <h2 className="text-lg font-semibold text-gray-800">{product.title}</h2>
      {product.price && (
        <p className="text-blue-600 font-medium mt-1">{product.price}</p>
      )}
    </a>
  
  
   old format
   */
}
