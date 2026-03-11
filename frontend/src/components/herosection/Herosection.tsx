import { useState } from "react";
import image from "../../assets/heroimage.jpg";
import { useAppSelector } from "../../store/hooks";
import { Link } from "react-router-dom";
const Herosection = () => {
  const [input, setInput] = useState("");
  const { data } = useAppSelector((state) => state.product);

  const searchProduct = data.filter((item) =>
    item.productName.toLowerCase().includes(input.toLowerCase()),
  );
  // console.log(searchProduct);
  return (
    <div className="relative h-screen w-full">
      <img
        src={image}
        alt="heroimage"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Optional dark overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Hero content (optional) */}
      <div className="relative z-10 flex flex-col h-full items-center justify-center text-white">
        <h1 className="text-xl md:text-4xl md:font-medium font-normal ">
          From kitchens near you to your table.
        </h1>
        <div className="mt-6 hidden md:flex w-full max-w-xl">
          <input
            placeholder="Cusine / Restaurant / Dish"
            type="text"
            className="flex-1 p-2 bg-amber-50 rounded-l-md border text-black border-gray-300 focus:outline-none"
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="bg-red-500 text-white p-2 rounded-r-md hover:bg-red-600">
            Search
          </button>
        </div>
        {input && (
          <div className="bg-white p-2 w-full max-w-xl flex flex-col gap-y-2">
            {searchProduct.map((product) => (
              <p
                key={product._id}
                className="text-black text-xl font-normal hover:font-bold"
              >
                <Link to={`/products/${product._id}`}>
                  {product.productName}
                </Link>
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Herosection;
