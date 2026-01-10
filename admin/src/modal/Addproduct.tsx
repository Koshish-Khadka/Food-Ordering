import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addProduct, resetAddProductState } from "../store/slice/productSlice";

type Props = {
  onClose: () => void;
};

type ProductFormData = {
  productName: string;
  productStockQty: number;
  productPrice: number;
  productDescription: string;
  status: string;
};

const Addproduct = ({ onClose }: Props) => {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormData>();
  const { addProduct: addProductState } = useAppSelector(
    (state) => state.product
  );

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleFormSubmit = (data: ProductFormData) => {
    const formData = new FormData();

    formData.append("name", data.productName);
    formData.append("qty", data.productStockQty.toString());
    formData.append("price", data.productPrice.toString());
    formData.append("description", data.productDescription);
    formData.append("status", data.status);

    if (file) {
      formData.append("productImage", file);
    }

    dispatch(addProduct(formData));
    reset();
    onClose();
  };
  useEffect(() => {
    if (addProductState.success) {
      alert("Product added successfully");
      dispatch(resetAddProductState());
      onClose();
    }
  }, [addProductState.success]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white text-gray-600 w-full max-w-md mx-4 rounded-lg shadow-xl relative max-h-[90vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>

        {/* Scrollable Content */}
        <form
          className="p-6 overflow-y-auto scrollbar"
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
            Add Product
          </h2>

          {/* Product Name */}
          <label className="block text-sm mb-1">Product Name</label>
          <input
            type="text"
            className="w-full border rounded p-2 mb-3 outline-none focus:ring-2 focus:ring-blue-500"
            {...register("productName", {
              required: "Product name is required",
            })}
          />
          {errors.productName && (
            <p className="text-red-500 text-xs mb-2">
              {errors.productName.message}
            </p>
          )}

          {/* Quantity */}
          <label className="block text-sm mb-1">Quantity</label>
          <input
            type="number"
            className="w-full border rounded p-2 mb-3 outline-none focus:ring-2 focus:ring-blue-500"
            {...register("productStockQty", {
              required: "Quantity is required",
            })}
          />

          {/* Price */}
          <label className="block text-sm mb-1">Price</label>
          <input
            type="number"
            className="w-full border rounded p-2 mb-3 outline-none focus:ring-2 focus:ring-blue-500"
            {...register("productPrice", {
              required: "Price is required",
            })}
          />

          {/* Status */}
          <label className="block text-sm mb-1">Status</label>
          <select
            className="w-full p-2 mb-3 rounded-md bg-gray-50 border border-gray-200"
            {...register("status", { required: "Status is required" })}
          >
            <option value="">Choose</option>
            <option value="available">Available</option>
            <option value="unavailable">Unavailable</option>
          </select>

          {/* Description */}
          <label className="block text-sm mb-1">Description</label>
          <textarea
            rows={4}
            className="w-full border rounded p-2 resize-none outline-none focus:ring-2 focus:ring-blue-500"
            {...register("productDescription", {
              required: "Description is required",
            })}
          />

          {/* Image */}
          <div className="mt-4">
            <label className="block text-sm mb-1">Product Image</label>
            <input
              title="productImage"
              type="file"
              name="productImage"
              accept="image/*"
              onChange={handleImageChange}
              className="text-sm"
            />

            {preview && (
              <div className="mt-3 w-40 h-40 border rounded overflow-hidden">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded transition"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addproduct;
