import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { auth } from "../firebase";
import { FaHome, FaShoppingCart, FaPlusCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";

export const EditProduct = () => {
  const { id } = useParams();
  const [form, setForm] = useState({
    name: "",
    sku: "",
    description: "",
    price: "",
    discountedPrice: "",
    color: "",
    size: "",
    status: "in stock",
    quantity: "",
    category: "",
    media: null,
    mediaPreview: "",
    mediaType: "image",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = await auth.currentUser.getIdToken();
        const res = await fetch(
          `http://localhost:3000/api/vendor/editProduct/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        console.log(data);

        setForm((prev) => ({
          ...prev,
          ...data,
          mediaPreview: data.mediaUrl
            ? `http://localhost:3000${data.mediaUrl}`
            : "",
          mediaType: data.mediaType || "image",
        }));
      } catch (err) {
        console.log(err + "Failed to load product.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const isVideo = file.type.startsWith("video/");
      const preview = URL.createObjectURL(file);
      setForm((prev) => ({
        ...prev,
        media: file,
        mediaPreview: preview,
        mediaType: isVideo ? "video" : "image",
      }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      for (const key in form) {
        if (key === "media" && form.media instanceof File) {
          formData.append("media", form.media);
        } else {
          formData.append(key, form[key]);
        }
      }

      const token = await auth.currentUser.getIdToken();

      const res = await fetch(
        `http://localhost:3000/api/vendor/editProduct/${id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (res.ok) {
        alert("Product updated successfully.");
        navigate("/admin");
      }
    } catch (e) {
      console.error(e);
      setError("Failed to update product. Try again.");
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
  if (loading) return <p className="p-6">Loading product...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;

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
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition">
              Logout
            </button>
          </div>
        </header>
        <div className="p-6 max-w-7xl mx-auto" style={{ overflowY: "auto" }}>
          <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded">
            <h2 className="text-2xl font-semibold mb-4">Edit Product</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "name",
                  "sku",
                  "price",
                  "discountedPrice",
                  "color",
                  "size",
                  "quantity",
                  "category",
                ].map((field) => (
                  <div key={field}>
                    <label className="block font-medium capitalize">
                      {field.replace(/([A-Z])/g, " $1")} *
                    </label>
                    <input
                      type={
                        ["price", "discountedPrice", "quantity"].includes(field)
                          ? "number"
                          : "text"
                      }
                      name={field}
                      value={form[field]}
                      onChange={handleChange}
                      required={[
                        "name",
                        "sku",
                        "price",
                        "quantity",
                        "category",
                      ].includes(field)}
                      className="w-full border px-3 py-2 rounded"
                    />
                  </div>
                ))}
              </div>

              <div>
                <label className="block font-medium">Status</label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded">
                  <option value="in stock">In Stock</option>
                  <option value="out of stock">Out of Stock</option>
                </select>
              </div>

              <div>
                <label className="block font-medium">Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full border px-3 py-2 rounded"
                />
              </div>

              <div>
                <label className="block font-medium">
                  Upload Image or Video
                </label>
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleMediaChange}
                  className="w-full"
                />
                {form.mediaPreview && (
                  <div className="mt-2">
                    {form.mediaType === "video" ? (
                      <video
                        src={form.mediaPreview}
                        controls
                        className="w-full h-64 rounded border"
                      />
                    ) : (
                      <img
                        src={form.mediaPreview}
                        alt="Preview"
                        className="w-full h-64 object-cover rounded border"
                      />
                    )}
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                Update Product
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
