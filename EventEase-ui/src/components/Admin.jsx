import React, { useEffect, useState } from "react";
import { FaHome, FaBox, FaShoppingCart, FaUsers, FaPlusCircle } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const Admin = () => {
    const navigate = useNavigate();
    const [preview, setPreview] = useState(null);
    const [uploadStatus, setUploadStatus] = useState("");
    const [products, setProducts] = useState([]);
    const [selected, setSelected] = useState([]);
    const userId = auth.currentUser?.uid;
    //console.log(userId);

    useEffect(() => {
        if(!userId){
            navigate("/login");
        }
        const fetchProducts = async () => {
          const waitForUser = async () => {
            while (!auth.currentUser) {
              await new Promise((resolve) => setTimeout(resolve, 100)); 
            }
      
            const user = auth.currentUser;
            const token = await user.getIdToken();
            const userId = user.uid;
            console.log("Fetched user ID:", userId);
            
            try {
              const res = await fetch(`http://localhost:3000/api/vendor/products/${userId}`, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              });
      
              const data = await res.json();
              setProducts(Array.isArray(data) ? data : data.products || []);
            } catch (err) {
              console.error("Failed to fetch products", err);
            }
          };
      
          waitForUser();
        };
      
        fetchProducts();
      }, []);
      
  const handleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selected.length === products.length) {
      setSelected([]);
    } else {
      setSelected(products.map((p) => p._id));
    }
  };

  const handleBulkDelete = async () => {
    if (window.confirm(`Delete ${selected.length} products?`)) {
      await fetch("http://localhost:3000/api/vendor/products/bulk-delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: selected }),
      });
      setProducts((prev) => prev.filter((p) => !selected.includes(p._id)));
      setSelected([]);
    }
  };

  const handleDelete = async (id) => {
    if (!id || typeof id !== "string") {
      alert("Invalid product ID.");
      return;
    }
    if (!window.confirm("Delete this product?")) return;
    try {
      const response = await fetch(`http://localhost:3000/api/vendor/products/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error?.message || "Delete failed");
      }
      setProducts((prev) => prev.filter((p) => p._id !== id));
      alert("Product deleted successfully.");
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };
  
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
            <FaHome /> <span>Profile</span>
          </Link>
          <Link
            to="/orders"
            className="flex items-center space-x-3 hover:text-green-600">
            <FaShoppingCart /> <span>Bookings</span>
          </Link>
          <Link
            to="/addProduct"
            className="flex items-center space-x-3 hover:text-green-600">
            <FaPlusCircle /> <span>Add/Import Product</span>
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

          <div className="flex items-center space-x-4 ">
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
        <div className="p-6 max-w-7xl mx-auto" style={{overflowY: "auto"}}>
        <h1 className="text-3xl font-bold mb-4">Admin Product Listing</h1>
        <div className="flex justify-between items-center mb-4">
            {selected.length > 0 && (
            <button
                onClick={handleBulkDelete}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
                Delete Selected ({selected.length})
            </button>
            )}
        </div>
        {products.length > 0 ? (
            <div className="overflow-y rounded shadow border">
                <table className="min-w-full text-sm text-left">
                <thead className="bg-gray-100">
                    <tr>
                    <th className="px-4 py-2 border-r">
                        <input
                        type="checkbox"
                        checked={selected.length === products.length}
                        onChange={handleSelectAll}
                        />
                    </th>
                    <th className="px-4 py-2">#</th>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">SKU</th>
                    <th className="px-4 py-2">Price</th>
                    <th className="px-4 py-2">Discounted</th>
                    <th className="px-4 py-2">Quantity</th>
                    <th className="px-4 py-2">Status</th>
                    <th className="px-4 py-2">Category</th>
                    <th className="px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((prod, index) => (
                    <tr key={index} className="border-t">
                        <td className="px-4 py-2 border-r">
                        <input
                            type="checkbox"
                            checked={selected.includes(prod._id)}
                            onChange={() => handleSelect(prod._id)}
                        />
                        </td>
                        <td className="px-4 py-2">{index + 1}</td>
                        <td className="px-4 py-2">{prod.name}</td>
                        <td className="px-4 py-2">{prod.sku}</td>
                        <td className="px-4 py-2">${prod.price || 0}</td>
                        <td className="px-4 py-2">
                        ${prod.discountedPrice || prod.price}
                        </td>
                        <td className="px-4 py-2">{prod.quantity}</td>
                        <td className="px-4 py-2">{prod.status}</td>
                        <td className="px-4 py-2">{prod.category}</td>
                        <td className="px-4 py-2">
                        <button className="text-blue-600 hover:underline mr-2">
                            <Link to={`/editProduct/${prod._id}`}>Edit</Link>
                        </button>
                        <button
                            onClick={() => handleDelete(prod._id)}
                            className="text-red-600 hover:underline"
                        >
                            Delete
                        </button>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            ) : (
            <div className="text-center text-gray-500 text-lg mt-10">
                No products found.
            </div>
            )}
        </div>
      </div>
    </div>
  );
};