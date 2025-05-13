import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGetData } from "../hooks/useGetData";
import ProductCard from "./ProductCard";
import { auth } from "../firebase";
import { CgProfile } from "react-icons/cg";
import { signOut } from "firebase/auth";

const ProductsLandingPage = () => {
  //const navigate = useNavigate();
  const {
    data: products,
    loading,
    error,
  } = useGetData("http://localhost:3000/api/all-products");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const filteredProducts = (products || []).filter((product) => {
    const search = searchTerm.toLowerCase();
    return (
      product?.name && product.name.toString().toLowerCase().includes(search) 
      //product.category.toLowerCase().includes(search)
    );
  });
  const user = auth.currentUser;
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(
    startIdx,
    startIdx + itemsPerPage
  );

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className="bg-gray-100 min-h-screen px-4 sm:px-8 pb-10">
      <header className="flex justify-between items-center py-6 border-b border-gray-300">
        <h1 className="text-3xl font-bold text-blue-700">EventEase</h1>
        {user ? (
          <div className="flex items-center space-x-6">
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

      {/* Search Bar */}
      <div className="my-6 max-w-2xl mx-auto">
        <input
          type="text"
          placeholder="Search products by name.."
          className="w-full p-3 rounded shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // Reset to page 1 on search
          }}
        />
      </div>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">Error loading products.</p>
      ) : (
        <>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {paginatedProducts.length > 0 ? (
              paginatedProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            ) : (
              <p className="text-center col-span-full text-gray-600">
                No products match your search.
              </p>
            )}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-8 space-x-4">
              <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50">
                Previous
              </button>
              <span className="text-gray-700">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50">
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductsLandingPage;
