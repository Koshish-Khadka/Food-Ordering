import React, { useState } from "react";
import "../../src/index.css";
type props = {
  onClose: () => void;
};

const Addproduct = ({ onClose }: props) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [, setFile] = useState<File | null>(null);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) return;

    setFile(selectedFile);

    const imageUrl = URL.createObjectURL(selectedFile);
    setPreview(imageUrl);
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      {/* Modal box */}
      {/* <div className="bg-white text-gray-600 w-full max-w-md mx-4 p-6 rounded-lg shadow-xl relative"> */}
      <div className="bg-white text-gray-600 w-full max-w-md mx-4 p-6 rounded-lg shadow-xl relative max-h-[90vh] flex flex-col">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
        <div className="p-6 overflow-y-auto scrollbar">
          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
            Add Product
          </h2>

          <label className="block text-sm mb-1">ProductName</label>
          <input
            className="w-full border border-gray-300 rounded p-2 mb-3 outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Enter ProductName"
          />
          <label className="block text-sm mb-1">Quantity</label>
          <input
            className="w-full border border-gray-300 rounded p-2 mb-3 outline-none focus:ring-2 focus:ring-blue-500"
            type="number"
            placeholder="Enter Product Quantity"
          />
          <label className="block text-sm mb-1">Price</label>
          <input
            className="w-full border border-gray-300 rounded p-2 mb-3 outline-none focus:ring-2 focus:ring-blue-500"
            type="number"
            placeholder="Enter Product Price"
          />
          <div>
            <label className="block text-sm mb-1">Status</label>
            <select
              title="status"
              name="status"
              id="status"
              className="p-2 rounded-md bg-gray-50 border border-gray-200"
            >
              <option value="">Choose</option>
              <option value="available">available</option>
              <option value="unavailable">unavailable</option>
            </select>
          </div>

          <label className="block text-sm mb-1">Description</label>
          <textarea
            className="w-full border border-gray-300 rounded p-2 resize-none outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            placeholder="Product Description..."
          />
          <div className="flex flex-col gap-3">
            <label className="block text-sm mb-1">Product Image</label>
            <input
              title="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-fit text-sm"
            />
            {preview && (
              <div className="w-40 h-40 border rounded overflow-hidden">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
          <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded transition">
            Update Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Addproduct;
