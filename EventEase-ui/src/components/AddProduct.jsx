import React, { useState } from "react";

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

export const AddProduct = ({ onAdd }) => {
  const [form, setForm] = useState(initialForm);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      name, sku, description, price, discountedPrice,
      color, size, status, quantity, category,
        relatedProductId, media, mediaPreview
    } = form;

    if (!name || !sku || !description || !price || !media || !quantity || !category) {
      alert("Please fill in all required fields.");
      return;
    }

    const newProduct = {
      id: Date.now(),
      name,
      sku,
      description,
      price: parseFloat(price),
      discountedPrice: parseFloat(discountedPrice || 0),
      color,
      size,
      status,
      quantity: parseInt(quantity),
      category,
      relatedProductId,
      mediaUrl: mediaPreview,
      mediaType: form.mediaType,
    };

    onAdd(newProduct);
    setForm(initialForm);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-semibold mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">Name / Title *</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
          </div>
          <div>
            <label className="block font-medium">ID / SKU *</label>
            <input type="text" name="sku" value={form.sku} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
          </div>

          <div>
            <label className="block font-medium">Price ($) *</label>
            <input type="number" name="price" value={form.price} onChange={handleChange} required min="0" step="0.01" className="w-full border px-3 py-2 rounded" />
          </div>
          <div>
            <label className="block font-medium">Discounted Price ($)</label>
            <input type="number" name="discountedPrice" value={form.discountedPrice} onChange={handleChange} min="0" step="0.01" className="w-full border px-3 py-2 rounded" />
          </div>

          <div>
            <label className="block font-medium">Color</label>
            <input type="text" name="color" value={form.color} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
          </div>
          <div>
            <label className="block font-medium">Size</label>
            <input type="text" name="size" value={form.size} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
          </div>

          <div>
            <label className="block font-medium">Quantity *</label>
            <input type="number" name="quantity" value={form.quantity} onChange={handleChange} required min="0" className="w-full border px-3 py-2 rounded" />
          </div>
          <div>
            <label className="block font-medium">Category *</label>
            <input type="text" name="category" value={form.category} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
          </div>
        </div>

        <div>
          <label className="block font-medium">Status</label>
          <select name="status" value={form.status} onChange={handleChange} className="w-full border px-3 py-2 rounded">
            <option value="in stock">In Stock</option>
            <option value="out of stock">Out of Stock</option>
          </select>
        </div>

        <div>
          <label className="block font-medium">Description *</label>
          <textarea name="description" value={form.description} onChange={handleChange} required rows={4} className="w-full border px-3 py-2 rounded" />
        </div>

        <div>
          <label className="block font-medium">Upload Image or Video *</label>
          <input type="file" accept="image/*,video/*" onChange={handleMediaChange} required className="w-full" />
          {form.mediaPreview && (
            <div className="mt-2">
              {form.mediaType === "video" ? (
                <video src={form.mediaPreview} controls className="w-full h-64 rounded border" />
              ) : (
                <img src={form.mediaPreview} alt="Preview" className="w-full h-64 object-cover rounded border" />
              )}
            </div>
          )}
        </div>

        <div>
          <label className="block font-medium">Related Product ID</label>
          <input type="text" name="relatedProductId" value={form.relatedProductId} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
        </div>

        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
