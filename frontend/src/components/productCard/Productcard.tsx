import { Plus } from "lucide-react";
import image from "../../assets/heroimage.jpg";

const Productcard = () => {
  return (
    <div className="rounded-xl bg-white shadow-sm transition hover:shadow-md">
      <img
        src={image}
        alt="product"
        className="h-40 w-full object-cover rounded-3xl sm:h-44 md:h-56 transition hover:scale-105"
      />

      <div className="p-3">
        <h2 className="text-sm uppercase font-semibold line-clamp-3 md:text-base">
          Fire and Ice Pizza
        </h2>
        <div className="mt-2 flex justify-between">
          <p>PRICE :1200$</p>
          <button title="addtocart">
            <Plus className="h-8 w-8 rounded-full bg-amber-500 p-1 text-white hover:scale-110 duration-150" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Productcard;
