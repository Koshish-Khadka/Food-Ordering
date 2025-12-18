import { Plus } from "lucide-react";
import type { productType } from "../products/Product";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cartSlice";

type propsType = {
  data: productType;
};

const Productcard = ({ data }: propsType) => {
  const dispatch = useDispatch();
  const addToCartHandler = (data: productType) => {
    dispatch(addToCart(data));
  };
  return (
    <div className="rounded-xl bg-white shadow-sm transition hover:shadow-md">
      <img
        src={data.productImage}
        alt="product"
        className="h-40 w-full object-cover rounded-3xl sm:h-44 md:h-56 transition hover:scale-105"
      />

      <div className="p-3">
        <h2 className="text-sm uppercase font-semibold line-clamp-3 md:text-base">
          {data.productName}
        </h2>
        <div className="mt-2 flex justify-between">
          <p>PRICE :{data.productPrice}$</p>
          <button title="addtocart" onClick={() => addToCartHandler(data)}>
            <Plus className="h-8 w-8 rounded-full bg-amber-500 p-1 text-white hover:scale-110 duration-150" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Productcard;
