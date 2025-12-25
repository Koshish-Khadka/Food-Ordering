import Rating from "@mui/material/Rating";
import ReviewSection from "./ReviewSection";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchSingleProduct } from "../../store/productSlice";

const ProductDetail = () => {
  const { productId } = useParams();
  const value = 2;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (productId) {
      dispatch(fetchSingleProduct(productId));
    }
  }, [dispatch, productId]);

  const { selectedProduct, error, loading } = useAppSelector(
    (state) => state.product
  );

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <p className="text-center">Context loading....</p>;
      </div>
    );
  }
  if (error) {
    return (
      <div className="h-screen flex justify-center items-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="pt-20">
      <div className=" max-w-6xl m-auto ">
        {/* Image container */}
        <div className="flex flex-col md:flex-row gap-x-6">
          <div className="md:w-1/2 shrink-0 w-full h-64 md:h-96 flex items-center justify-center">
            <img
              src={selectedProduct?.productImage}
              alt="Product Image"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          {/* Description container */}
          <div className="w-full p-4">
            <h2 className="text-lg font-medium text-justify">
              {selectedProduct?.productName}
            </h2>

            <div className="py-3 space-y-2">
              <div className="flex gap-x-2">
                <Rating name="read-only" value={value} readOnly />
                <p>(23)</p>
              </div>
              <p className="text-base flex gap-x-12 py-3">
                {selectedProduct?.productDescription}
              </p>
              <p className="text-sm flex gap-x-12 py-3 items-center">
                Status{" "}
                <span className="font-medium text-green-600">
                  {selectedProduct?.productStatus}
                </span>
              </p>
              <p className="text-sm flex gap-x-12 py-3 items-center">
                Price{" "}
                <span className=" font-medium">
                  {selectedProduct?.productPrice}
                </span>
              </p>
            </div>
            <div className="">
              <button className="px-3 py-2 w-full rounded-md font-bold bg-amber-500 text-white transition-all hover:scale-105 duration-150 ease-in-out">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
      <ReviewSection />
    </div>
  );
};

export default ProductDetail;
