import React from "react";
import { FaHome, FaBox, FaShoppingCart, FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";

export const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-lg">
        <div className="p-4 text-xl font-bold text-center border-b">
          <span>EventEase</span>
        </div>
        <nav className="p-4 space-y-4">
          <Link
            to="/dashboard"
            className="flex items-center space-x-2 text-gray-700 hover:text-green-600">
            <FaHome /> <span>Home</span>
          </Link>
          {/* <Link
            to="/products"
            className="flex items-center space-x-2 text-gray-700 hover:text-green-600">
            <FaBox /> <span>My Listings</span>
          </Link>
          <Link
            to="/orders"
            className="flex items-center space-x-2 text-gray-700 hover:text-green-600">
            <FaShoppingCart /> <span>Bookings</span>
          </Link> */}
          <Link
            to="/users"
            className="flex items-center space-x-2 text-gray-700 hover:text-green-600">
            <FaUsers /> <span>Customers</span>
          </Link>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">Home</h1>
          <div></div>
        </header>

        <main className="p-6 overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* <StatCard label="Total Rentals" value="142" />
            <StatCard label="Listed Products" value="28" />
            <StatCard label="Active Users" value="65" /> */}
          </div>
        </main>
      </div>
    </div>
  );
};

const StatCard = ({ label, value }) => (
  <div className="bg-white rounded-xl shadow p-4">
    <div className="text-sm text-gray-500">{label}</div>
    <div className="text-2xl font-bold">{value}</div>
  </div>
);
