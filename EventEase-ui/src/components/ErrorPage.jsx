import { Link } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";

export const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center text-center px-4">
      <div className="bg-white p-10 rounded-2xl shadow-xl max-w-md">
        <FaExclamationTriangle className="text-yellow-500 text-6xl mb-4 mx-auto" />
        <h1 className="text-4xl font-bold text-gray-800 mb-2">404</h1>
        <p className="text-lg text-gray-600 mb-6">
          Oops! The page you’re looking for doesn’t exist.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Back to Home
        </Link>
      </div>
    </div>
  );
};
