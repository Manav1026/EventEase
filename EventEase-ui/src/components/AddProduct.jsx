import Papa from "papaparse";
import {
  FaHome,
  FaBox,
  FaShoppingCart,
  FaUsers,
  FaPlusCircle,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

const initialForm = {
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
  relatedProductId: "",
  media: null,
  mediaPreview: "",
};

export const AddProduct = () => {
  const userId = auth.currentUser?.uid;
  const [form, setForm] = useState(initialForm);
  //   const [name, setName] = useState("");
  //   const [sku, setSku] = useState("");
  //   const [description, setDescription] = useState("");
  //   const [price, setPrice] = useState("");
  //   const [media, setMedia] = useState("");
  //   const [status, setStatus] = useState("");
  //   const [quantity, setQuantity] = useState("");
  //   const [category, setCategory] = useState("");
  //   const [relatedProductId, setRelatedProductId] = useState("");
  //   const [mediaUrl, setMediaUrl] = useState("");
  //   const [mediaType, setMediaType] = useState("");
  const [csvFile, setCsvFile] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const isVideo = file.type.startsWith("video/");
    const previewUrl = URL.createObjectURL(file);

    setForm((prev) => ({
      ...prev,
      media: file,
      mediaPreview: previewUrl,
      mediaType: isVideo ? "video" : "image",
    }));
  };
  const handleDownloadSampleCSV = () => {
    const sampleData = `name,sku,description,price,discountedPrice,color,size,status,quantity,category,relatedProductId,vendorId
  Sample Product,SKU123,Example description,19.99,14.99,Red,M,in stock,100,Clothing,vendor123`;

    const blob = new Blob([sampleData], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "sample_products.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCsvUpload = (e) => {
    const file = e.target.files[0];
    if (file) setCsvFile(file);
  };

  const handleCsvImport = () => {
    if (!csvFile) return;

    Papa.parse(csvFile, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        for (const row of results.data) {
          const checkSkuExists = async () => {
            const res = await fetch(
              `http://localhost:3000/api/vendor/check-sku/${row.sku}`
            );
            const data = await res.json();
            return data.exists;
          };
          const skuExists = await checkSkuExists();
          if (skuExists) {
            alert("SKU already exists. Please enter a unique SKU.");
            return;
          }
          if (
            row.discountedPrice &&
            parseFloat(row.discountedPrice) > parseFloat(row.price)
          ) {
            alert(
              "Discounted price cannot be greater than the original price."
            );
            return;
          }
          const product = {
            ...row,
            price: parseFloat(row.price),
            discountedPrice: parseFloat(row.discountedPrice || 0),
            quantity: parseInt(row.quantity),
            mediaUrl: "",
            mediaType: "image",
            vendorId: userId,
          };
          const token = await auth.currentUser.getIdToken();
          await fetch("http://localhost:3000/api/vendor/addproduct", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(product),
          });
        }

        alert("CSV import complete.");
        navigate("/dashboard");
      },
    });
  };
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await auth.currentUser.getIdToken();
      const {
        name,
        sku,
        description,
        price,
        discountedPrice,
        color,
        size,
        status,
        quantity,
        category,
        relatedProductId,
        media,
        mediaType,
      } = form;

      if (!name || !sku || !price || !quantity || !category) {
        alert("Please fill in all required fields.");
        return;
      }

      const checkSkuExists = async () => {
        const res = await fetch(
          `http://localhost:3000/api/vendor/check-sku/${sku}`
        );
        const data = await res.json();
        return data.exists;
      };
      const skuExists = await checkSkuExists();
      if (skuExists) {
        alert("SKU already exists. Please enter a unique SKU.");
        return;
      }

      if (discountedPrice && parseFloat(discountedPrice) > parseFloat(price)) {
        alert("Discounted price cannot be greater than the original price.");
        return;
      }

      const formData = new FormData();
      formData.append("name", name);
      formData.append("sku", sku);
      formData.append("description", description);
      formData.append("price", parseFloat(price));
      formData.append("discountedPrice", parseFloat(discountedPrice || 0));
      formData.append("color", color || "");
      formData.append("size", size || "");
      formData.append("status", status || "in stock");
      formData.append("quantity", parseInt(quantity));
      formData.append("category", category);
      formData.append("relatedProductId", relatedProductId || "");
      formData.append("vendorId", userId);
      formData.append("mediaType", mediaType || "");

      if (media) {
        formData.append("media", media);
      }

      const res = await fetch("http://localhost:3000/api/vendor/addproduct", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      if (!res.ok) {
        const text = await res.text(); // <-- read as plain text instead of JSON
        console.error("Server response:", text);
        alert("Upload failed.");
        return;
      }

      if (res.ok) {
        navigate("/admin");
        setForm(initialForm);
      } else {
        const error = await res.json();
        alert(error.error || "Product upload failed.");
      }
    } catch (e) {
      console.log("Error:", e);
      alert("Failed to submit product. Try again.");
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
            <h2 className="text-2xl font-semibold mb-4">Add New Product</h2>

            <div className="mb-6 border rounded p-4">
              <h3 className="font-medium mb-2">Import Products via CSV</h3>
              <input type="file" accept=".csv" onChange={handleCsvUpload} />
              <button
                onClick={handleCsvImport}
                className="mt-2 bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700">
                Import CSV
              </button>
              <button
                type="button"
                onClick={handleDownloadSampleCSV}
                className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800">
                Download Sample CSV
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium">Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>
                <div>
                  <label className="block font-medium">SKU *</label>
                  <input
                    type="text"
                    name="sku"
                    value={form.sku}
                    onChange={handleChange}
                    required
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>

                <div>
                  <label className="block font-medium">Price ($) *</label>
                  <input
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    required
                    min="0"
                    step="0.01"
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>
                <div>
                  <label className="block font-medium">
                    Discounted Price ($)
                  </label>
                  <input
                    type="number"
                    name="discountedPrice"
                    value={form.discountedPrice}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>

                <div>
                  <label className="block font-medium">Color</label>
                  <input
                    type="text"
                    name="color"
                    value={form.color}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>
                <div>
                  <label className="block font-medium">Size</label>
                  <input
                    type="text"
                    name="size"
                    value={form.size}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>

                <div>
                  <label className="block font-medium">Quantity *</label>
                  <input
                    type="number"
                    name="quantity"
                    value={form.quantity}
                    onChange={handleChange}
                    required
                    min="0"
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>
                <div>
                  <label className="block font-medium">Category</label>
                  <input
                    type="text"
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>
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

              <div>
                <label className="block font-medium">Related Product ID</label>
                <input
                  type="text"
                  name="relatedProductId"
                  value={form.relatedProductId}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                />
              </div>

              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                Add Product
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
