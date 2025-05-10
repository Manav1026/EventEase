import React, { useEffect, useState } from "react";
import { FaBoxOpen, FaHeart, FaSignOutAlt, FaHome } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { SessionAuth } from "./SessionAuth";

export const Dashboard = () => {
  SessionAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("main");
  const [preview, setPreview] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [fullNameInput, setFullNameInput] = useState("");
  const [phoneInput, setPhoneInput] = useState("");
  const [addressInput, setAddressInput] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchUserInfo = async (uid) => {
    try {
      const token = await auth.currentUser.getIdToken();
      const res = await fetch(
        `http://localhost:3000/api/users/profile/${uid}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      if (res.ok) {
        setUserInfo(data);
        setFullNameInput(data.fullName || "");
        setPhoneInput(data.phoneNumber || "");
        setAddressInput(data.address || "");
        if (data.profilePicture) {
          setPreview(`http://localhost:3000${data.profilePicture}`);
        }
      }
    } catch (err) {
      console.error("Failed to load user info:", err);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/login");
      } else {
        fetchUserInfo(user.uid).finally(() => setLoading(false));
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  if (loading) return <div className="p-8">Checking authentication...</div>;

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleProfileSave = async (e) => {
    e.preventDefault();
    const token = await auth.currentUser.getIdToken();
    const formData = new FormData();
    formData.append("uid", auth.currentUser.uid);
    formData.append("fullName", fullNameInput);
    formData.append("email", auth.currentUser.email);
    formData.append("role", userInfo?.role || "user");
    formData.append("phoneNumber", phoneInput);
    formData.append("address", addressInput);

    try {
      const res = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setUserInfo(data.user);
        setFullNameInput(data.user.fullName || "");
        setPhoneInput(data.user.phoneNumber || "");
        setAddressInput(data.user.address || "");
        if (data.user.profilePicture) {
          setPreview(`http://localhost:3000${data.user.profilePicture}`);
        }
        setUploadStatus("Profile updated successfully!");
      } else {
        alert(data.error || "Update failed.");
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("Something went wrong.");
    }
  };

  const handleImageChange = async (e) => {
    const token = await auth.currentUser.getIdToken();
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
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
      const data = await res.json();
      if (res.ok) {
        setUploadStatus("Profile Picture updated successfully!");
      } else {
        setUploadStatus(data.error || "Upload failed.");
      }
    } catch (err) {
      console.error(err);
      setUploadStatus("Upload failed.");
    }
  };
  return (
    // <div className="flex h-screen bg-gray-100">
    //   <aside className="w-64 bg-white shadow-lg">
    //     <div
    //       className="p-6 text-2xl font-extrabold text-center text-green-600 border-b border-gray-200"
    //       style={{ marginTop: "7.7px" }}>
    //       EventEase
    //     </div>
    //     <nav className="p-4 space-y-4 text-gray-700">
    //       <Link
    //         to="/dashboard"
    //         className="flex items-center space-x-3 hover:text-green-600">
    //         <FaHome /> <span>Home</span>
    //       </Link>
    //       <Link
    //         to="/orders"
    //         className="flex items-center space-x-3 hover:text-green-600">
    //         <FaShoppingCart /> <span>Bookings</span>
    //       </Link>
    //     </nav>
    //   </aside>
    //   <div className="flex flex-col flex-1 overflow-hidden">
    //     <header className="flex items-center justify-between px-6 py-4 bg-white shadow">
    //       <div>
    //         <h2 className="text-2xl font-semibold text-gray-800">
    //           Welcome back, {auth.currentUser?.displayName}
    //         </h2>
    //         <p className="text-sm text-gray-500">{auth.currentUser?.email}</p>
    //       </div>

    //       <div className="flex items-center space-x-4">
    //         <label
    //           htmlFor="profile-pic"
    //           className="relative cursor-pointer group">
    //           <div className="h-14 w-14 rounded-full overflow-hidden ring-2 ring-green-500 hover:ring-green-400 transition">
    //             {preview ? (
    //               <img
    //                 src={preview}
    //                 alt="Profile"
    //                 className="h-full w-full object-cover"
    //               />
    //             ) : (
    //               <div className="h-full w-full flex items-center justify-center bg-gray-200 text-sm text-gray-500">
    //                 <CgProfile size={70} />
    //               </div>
    //             )}
    //           </div>
    //           <input
    //             id="profile-pic"
    //             type="file"
    //             accept="image/*"
    //             onChange={handleImageChange}
    //             className="hidden"
    //           />
    //         </label>
    //         {uploadStatus && (
    //           <span className="text-sm italic text-gray-500">
    //             {uploadStatus}
    //           </span>
    //         )}

    //         <button
    //           onClick={handleLogout}
    //           className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition">
    //           Logout
    //         </button>
    //       </div>
    //     </header>
    //     <main className="flex-1 p-6 overflow-y-auto">
    //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    //         <StatCard label="Total Rentals" value="142" />
    //         <StatCard label="Listed Products" value="28" />
    //         <StatCard label="Active Users" value="65" />
    //       </div>
    //     </main>
    //   </div>
    // </div>
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md">
        <div className="p-6 border-b text-2xl font-bold text-green-600 text-center">
          EventEase
        </div>
        <nav className="p-4 flex flex-col gap-4 text-gray-700 text-lg">
          <button
            onClick={() => setActiveTab("main")}
            className="flex items-center gap-2 hover:text-green-600">
            <FaHome size={20} /> Home
          </button>

          <button
            onClick={() => setActiveTab("account")}
            className="flex items-center gap-2 hover:text-green-600">
            <CgProfile size={20} /> Account
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className="flex items-center gap-2 hover:text-green-600">
            <FaBoxOpen size={20} /> Orders
          </button>
          <button
            onClick={() => setActiveTab("wishlist")}
            className="flex items-center gap-2 hover:text-green-600">
            <FaHeart size={20} /> Wishlist
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-500 hover:text-red-600">
            <FaSignOutAlt size={20} /> Logout
          </button>
        </nav>
      </aside>

      <main className="flex-1 p-8 bg-gray-50">
        {activeTab === "main" && userInfo && (
          <div className="bg-white p-8 rounded-lg shadow-md w-full">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Welcome, {userInfo.fullName?.split(" ")[0]} 👋
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 border rounded-lg shadow-sm bg-gray-50">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Your Info
                </h3>
                <p>
                  <strong>Email:</strong> {userInfo.email}
                </p>
                <p>
                  <strong>Role:</strong> {userInfo.role}
                </p>
                <p>
                  <strong>Phone:</strong> {userInfo.phoneNumber || "Not added"}
                </p>
                <p>
                  <strong>Address:</strong> {userInfo.address || "Not added"}
                </p>
              </div>

              <div className="p-6 border rounded-lg shadow-sm bg-gray-50 flex items-center gap-4">
                {userInfo.profilePicture ? (
                  <img
                    src={`http://localhost:3000${userInfo.profilePicture}`}
                    className="w-20 h-20 rounded-full object-cover ring-2 ring-green-500"
                    alt="Profile"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-4xl ring-2 ring-green-500">
                    <CgProfile />
                  </div>
                )}
                <div>
                  <p className="font-semibold text-gray-700">
                    {userInfo.fullName}
                  </p>
                  <p className="text-sm text-gray-500">
                    Member since{" "}
                    {new Date(userInfo.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        {activeTab === "account" && (
          <div className="bg-white p-8 rounded-lg shadow-md w-full">
            <h2 className="text-2xl font-bold mb-6 border-b pb-2 text-gray-800">
              Profile Overview
            </h2>
            <div className="mb-6 flex items-center gap-4">
              <label
                htmlFor="profile-upload"
                className="cursor-pointer relative group">
                {preview ? (
                  <img
                    src={preview}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover ring-2 ring-green-500 hover:ring-green-400 transition"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-4xl ring-2 ring-green-500">
                    <CgProfile />
                  </div>
                )}
                <input
                  id="profile-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>

              <div>
                {uploadStatus && (
                  <p className="text-sm italic text-gray-500">{uploadStatus}</p>
                )}
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-start gap-8">
              <form
                onSubmit={handleProfileSave}
                encType="multipart/form-data"
                className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800">
                {/* <div className="md:col-span-2 flex items-center gap-4">
                  <label
                    htmlFor="profile-pic"
                    className="cursor-pointer group relative">
                    <div className="h-24 w-24 rounded-full ring-2 ring-green-500 overflow-hidden hover:ring-green-400 transition">
                      {preview ? (
                        <img
                          src={preview}
                          alt="Profile"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full bg-gray-200 flex items-center justify-center text-gray-500 text-5xl">
                          <CgProfile />
                        </div>
                      )}
                    </div>
                    <input
                      id="profile-pic"
                      name="image"
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          setPreview(URL.createObjectURL(file));
                        }
                      }}
                      className="hidden"
                    />
                  </label>

                  {uploadStatus && (
                    <span className="text-sm italic text-gray-500">
                      {uploadStatus}
                    </span>
                  )}
                </div> */}

                <div>
                  <label className="text-sm text-gray-500 block mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={fullNameInput}
                    onChange={(e) => setFullNameInput(e.target.value)}
                    className="w-full border px-4 py-2 rounded-md shadow-sm focus:ring-green-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-500 block mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={userInfo?.email || ""}
                    disabled
                    className="w-full bg-gray-100 text-gray-600 border px-4 py-2 rounded-md shadow-sm"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-500 block mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phoneInput}
                    onChange={(e) => setPhoneInput(e.target.value)}
                    className="w-full border px-4 py-2 rounded-md shadow-sm focus:ring-green-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-500 block mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    value={addressInput}
                    onChange={(e) => setAddressInput(e.target.value)}
                    className="w-full border px-4 py-2 rounded-md shadow-sm focus:ring-green-500 focus:outline-none"
                  />
                </div>

                <div className="md:col-span-2 flex justify-end">
                  <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md shadow transition">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {activeTab === "orders" && (
          <div className="text-xl text-center text-gray-700">
            📦 Order details go here...
          </div>
        )}

        {activeTab === "wishlist" && (
          <div className="text-xl text-center text-gray-700">
            ❤️ Your wishlist is empty...
          </div>
        )}
      </main>
    </div>
  );
};

const StatCard = ({ label, value }) => (
  <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
    <div className="text-sm text-gray-500">{label}</div>
    <div className="mt-2 text-3xl font-bold text-green-600">{value}</div>
  </div>
);
