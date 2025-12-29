import { useState } from "react";
import Productcard from "../productCard/Productcard";
import { useAppSelector } from "../../store/hooks";

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
  const { data, loading, error } = useAppSelector((state) => state.product);
  const [isActivemenu, setIsActiveMenu] = useState("breakfast");

  const handleOptions = (data: categroy) => {
    setIsActiveMenu(data);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

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
        {data?.map((data) => {
          return (
            // <Link to={`products/${data._id}`} key={data._id} >
            <Productcard data={data} key={data._id} />
            // </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Product;
