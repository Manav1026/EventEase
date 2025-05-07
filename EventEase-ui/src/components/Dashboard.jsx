import React, { useEffect, useState } from "react";
import { FaHome, FaBox, FaShoppingCart, FaUsers } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");

  useEffect(() => {
    const fetchProfileImage = async () => {
      if (!auth.currentUser?.uid) return;

      try {
        const res = await fetch(
          `http://localhost:3000/api/users/profile-picture/${auth.currentUser.uid}`
        );
        const data = await res.json();

        if (res.ok && data.profilePicture) {
          setPreview(`http://localhost:3000${data.profilePicture}`);
        }
      } catch (err) {
        console.error("Failed to load profile image:", err);
      }
    };

    fetchProfileImage();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file || !auth.currentUser?.uid) {
      setUploadStatus("No file selected or user not logged in.");
      return;
    }

    setPreview(URL.createObjectURL(file));
    setUploadStatus("Uploading...");

    const formData = new FormData();
    formData.append("uid", auth.currentUser.uid);
    formData.append("image", file);

    try {
      const res = await fetch(
        "http://localhost:3000/api/users/profile-picture",
        {
          method: "PATCH",
          body: formData,
        }
      );

      const data = await res.json();
      if (res.ok) {
        setUploadStatus("Upload successful!");
        setPreview(`http://localhost:3000${data.profilePicture}`);
      } else {
        setUploadStatus(data.error || "Upload failed.");
      }
    } catch (err) {
      console.error(err);
      setUploadStatus("Upload failed.");
    }
  };
  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-lg">
        <div
          className="p-6 text-2xl font-extrabold text-center text-green-600 border-b border-gray-200"
          style={{ marginTop: "7.7px" }}>
          EventEase
        </div>
        <nav className="p-4 space-y-4 text-gray-700">
          <Link
            to="/dashboard"
            className="flex items-center space-x-3 hover:text-green-600">
            <FaHome /> <span>Home</span>
          </Link>
          <Link
            to="/orders"
            className="flex items-center space-x-3 hover:text-green-600">
            <FaShoppingCart /> <span>Bookings</span>
          </Link>
        </nav>
      </aside>
      <div className="flex flex-col flex-1 overflow-hidden">
        <header className="flex items-center justify-between px-6 py-4 bg-white shadow">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              Welcome back, {auth.currentUser?.displayName}
            </h2>
            <p className="text-sm text-gray-500">{auth.currentUser?.email}</p>
          </div>

          <div className="flex items-center space-x-4">
            <label
              htmlFor="profile-pic"
              className="relative cursor-pointer group">
              <div className="h-14 w-14 rounded-full overflow-hidden ring-2 ring-green-500 hover:ring-green-400 transition">
                {preview ? (
                  <img
                    src={preview}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center bg-gray-200 text-sm text-gray-500">
                    <CgProfile size={70} />
                  </div>
                )}
              </div>
              <input
                id="profile-pic"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
            {uploadStatus && (
              <span className="text-sm italic text-gray-500">
                {uploadStatus}
              </span>
            )}

            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition">
              Logout
            </button>
          </div>
        </header>
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatCard label="Total Rentals" value="142" />
            <StatCard label="Listed Products" value="28" />
            <StatCard label="Active Users" value="65" />
          </div>
        </main>
      </div>
    </div>
  );
};

const StatCard = ({ label, value }) => (
  <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
    <div className="text-sm text-gray-500">{label}</div>
    <div className="mt-2 text-3xl font-bold text-green-600">{value}</div>
  </div>
);
