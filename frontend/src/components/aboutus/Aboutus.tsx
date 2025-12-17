import image from "../../assets/res.jpg";
const Aboutus = () => {
  return (
    <div className="mt-16 relative h-80 ">
      <img
        src={image}
        alt="aboutusimage"
        className="w-full h-full object-cover absolute top-0 left-0 "
      />
      <div className="absolute inset-0 flex F flex-col items-center justify-center text-white ">
        <p className="text-3xl font-bold mb-6">About Us</p>
        <p className="mb-2">
          Foodmandu is the fastest, easiest and most convenient way to enjoy the
          best food of your favourite restaurants at home, at the office or
          wherever you want to.
        </p>
        <p>
          We know that your time is valuable and sometimes every minute in the
          day counts. Thatâ€™s why we deliver! So you can spend more time doing
          the things you love.
        </p>
      </div>
    </div>
  );
};

export default Aboutus;
