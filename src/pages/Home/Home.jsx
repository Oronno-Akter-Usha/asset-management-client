import About from "../../components/Home/About";
import Banner from "../../components/Home/Banner";
import Packages from "../../components/Home/Packages";
import useScroll from "../../hooks/useScroll";

const Home = () => {
  useScroll();
  return (
    <div className="space-y-32">
      <Banner />
      <About />
      <Packages />
    </div>
  );
};

export default Home;
