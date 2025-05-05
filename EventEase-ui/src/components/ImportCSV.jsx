import React from "react";
import Papa from "papaparse";

const ImportCSV = ({ onBulkAdd }) => {
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const validRows = results.data
          .filter(row => row.name && row.sku && row.price && row.category)
          .map(row => ({
            id: Date.now(),
            name: row.name,
            sku: row.sku,
            description: row.description || "",
            price: parseFloat(row.price),
            discountedPrice: parseFloat(row.discountedPrice || 0),
            color: row.color || "",
            size: row.size || "",
            status: row.status?.toLowerCase() || "in stock",
            quantity: parseInt(row.quantity || "0"),
            category: row.category,
            review: row.review || "",
            relatedProductId: row.relatedProductId || "",
            mediaUrl: row.mediaUrl || "", // Expect image/video URLs in CSV
            mediaType: row.mediaType || "image"
          }));

        onBulkAdd(validRows);
      },
    });
  };

  return (
    <div className="my-6 p-4 bg-white shadow rounded">
      <h3 className="text-lg font-semibold mb-2">📁 Import Products from CSV</h3>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        className="border px-3 py-2 rounded w-full"
      />
    </div>
  );
};

export default ImportCSV;
