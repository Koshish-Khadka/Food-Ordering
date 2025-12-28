import Navbar from "../components/navbar/Navbar";
import Herosection from "../components/herosection/Herosection";
import Product from "../components/products/Product";
import Aboutus from "../components/aboutus/Aboutus";
import Footer from "../components/footer/Footer";


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
