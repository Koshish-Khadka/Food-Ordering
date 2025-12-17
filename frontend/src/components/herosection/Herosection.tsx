import image from "../../assets/heroimage.jpg";
const Herosection = () => {
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
        <h1 className="text-4xl font-normal ">
          From kitchens near you to your table.
        </h1>
        <div className="mt-6 flex w-full max-w-xl">
          <input
            placeholder="Cusine / Restaurant / Dish"
            type="text"
            className="flex-1 p-2 bg-amber-50 rounded-l-md border text-black border-gray-300 focus:outline-none"
          />
          <button className="bg-red-500 text-white p-2 rounded-r-md hover:bg-red-600">
            Search
          </button>
        </div>
 
      </div>
    </div>
  );
};

export default Herosection;
