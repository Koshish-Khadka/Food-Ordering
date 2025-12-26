import Navbar from "./navbar/Navbar";
import Herosection from "./herosection/Herosection";
import Product from "./products/Product";
import Aboutus from "./aboutus/Aboutus";
import Footer from "./footer/Footer";


const Home = () => {


  return (
    <div className="relative">
      <header>
        <Navbar />
      </header>
      <main>
        <Herosection />
        <Product />
        <Aboutus />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Home;
