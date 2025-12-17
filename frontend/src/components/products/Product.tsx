import React from "react";
import Productcard from "../productCard/Productcard";

const Product = () => {
  const product = [1, 2, 3, 4, 5, 6, 7, 8];
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
      <h2 className="font-medium text-xl">
        <span className="border-b-2 border-amber-500 pb-2">FEATURED PRODUCTS</span>
      </h2>
      {/* products cards */}
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {product.map((items, index) => {
          return <Productcard key={index} />;
        })}
      </div>
    </div>
  );
};

export default Product;
