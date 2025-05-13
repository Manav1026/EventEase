import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white shadow rounded-lg p-4">
    <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded" />
    <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
    <p className="text-gray-500">{product.category}</p>
    <p className="text-sm mt-1">{product.description}</p>
    <p className="font-bold mt-2">${product.price}/day</p>
   {/* <Link to={`/products/${product._id}`}>
      <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full">
        View Details
      </button>
    </Link>  */}
  </div>
  );
}

export default ProductCard;
  
{/*<a
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
   */}