import React from "react";
import { Link } from "react-router-dom";

//TODO Decide if entire card is the link or if there is a button as a link(Don't put a button in the Link)

const ProductCard = ({ product, compact = false }) => (
  //<Link to={`/products/${product._id}`}>
  <div
    className={`${
      compact ? "flex items-center gap-4" : "flex flex-col"
    } bg-white rounded-2xl shadow-md hover:shadow-lg transition-all overflow-hidden`}>
    <div
      className={`${
        compact ? "w-32 h-24" : "w-full h-40"
      } relative shrink-0 bg-gray-100`}>
      <img
        src={
          product.mediaUrl
            ? `http://localhost:3000${product.mediaUrl}`
            : "/no_image.jpeg"
        }
        alt={product.name}
        className={`${
          compact ? "w-full h-full object-cover" : "w-full h-full object-cover"
        } rounded-t-2xl`}
      />
      {!compact && (
        <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded-full">
          {product.category}
        </span>
      )}
    </div>

    <div
      className={`p-4 ${
        compact ? "flex-1" : "flex flex-col flex-1"
      } space-y-1`}>
      <h2 className="text-lg font-bold text-gray-800 truncate">
        {product.name}
      </h2>
      <p
        className={`text-sm text-gray-500 ${
          compact ? "line-clamp-2" : "line-clamp-3"
        }`}>
        {product.description}
      </p>
      <p className="text-green-600 font-semibold text-base">
        ${product.price}/day
      </p>

      {!compact && (
        <Link to={`/products/${product._id}`}>
          <button className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
            View Details
          </button>
        </Link>
      )}
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
