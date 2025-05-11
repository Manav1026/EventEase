import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useGetData } from "../hooks/useGetData";
import ProductCard from "./ProductCard";

const ProductsLandingPage = () => {
  const { data: products, loading, error} = useGetData("http://localhost:3000/api/all-products");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = (products || []).filter((product) => {
    const search = searchTerm.toLowerCase();
    return (
      product.name.toLowerCase().includes(search) ||
      product.category.toLowerCase().includes(search)
    );
  });

  return (
    <div className="bg-gray-100 min-h-screen px-4 sm:px-8 pb-10">
      <header className="flex justify-between items-center py-6 border-b border-gray-300">
        <h1 className="text-3xl font-bold text-blue-700">EventEase</h1>
        <div className="space-x-4">
          <Link to="/login">
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Login</button>
          </Link>
          <Link to="/register">
            <button className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300">Sign Up</button>
          </Link>
        </div>
      </header>

      {/* Search Bar */}
      <div className="my-6 max-w-2xl mx-auto">
        <input
          type="text"
          placeholder="Search items by name or category..."
          className="w-full p-3 rounded shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">Error loading products.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => <ProductCard key={product._id} product={product} />)
          ) : (
            <p className="text-center col-span-full text-gray-600">No products match your search.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductsLandingPage;
