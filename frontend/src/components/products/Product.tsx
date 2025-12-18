import React, { useEffect, useState } from "react";
import Productcard from "../productCard/Productcard";
import axios from "axios";

type categroy = "breakfast" | "maincourse" | "drinks";
export type productType = {
  _id: string;
  productName: string;
  productDescription: string;
  productStockQty: number;
  productPrice: number;
  productStatus: string;
  productImage: string;
};

const Product = () => {
  const [isActivemenu, setIsActiveMenu] = useState("breakfast");
  const [products, setProducts] = useState<productType[]>([]);

  const handleOptions = (data: categroy) => {
    setIsActiveMenu(data);
  };

  // fetch products

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/products/getAllProducts"
      );
      if (response.status === 200) {
        setProducts(response.data.data);
      } else {
        console.log("Error fetching products:", response.data.message);
      }
    } catch (error) {
      console.log("Failed to fetch product", error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    // <div className="max-w-7xl m-auto mt-8">
    <div
      className="
                mx-auto 
                mt-8
                sm:max-w-md
                md:max-w-5xl
                lg:max-w-7xl
                px-4
                "
    >
      <h2 className="font-medium text-xl text-center">
        <span className="border-b-2 border-amber-500 pb-2">
          FEATURED PRODUCTS
        </span>
      </h2>
      <div className="flex justify-center items-center mt-8">
        <div className="border border-gray-300 shadow-md p-1 rounded-2xl flex gap-x-1">
          <button
            className={` p-2 rounded-2xl transition-all duration-300 ${
              isActivemenu === "breakfast" ? " bg-amber-500 text-white" : ""
            }`}
            onClick={() => handleOptions("breakfast")}
          >
            Breakfast
          </button>
          <button
            className={` p-2 rounded-2xl transition-all duration-300 ${
              isActivemenu === "maincourse" ? " bg-amber-500 text-white" : ""
            }`}
            onClick={() => handleOptions("maincourse")}
          >
            Main Course
          </button>
          <button
            className={` p-2 rounded-2xl transition-all duration-300 ${
              isActivemenu === "drinks" ? " bg-amber-500 text-white" : ""
            }`}
            onClick={() => handleOptions("drinks")}
          >
            Drinks
          </button>
        </div>
      </div>
      {/* products cards */}
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {products.map((data) => {
          return <Productcard data={data} key={data._id} />;
        })}
      </div>
    </div>
  );
};

export default Product;
