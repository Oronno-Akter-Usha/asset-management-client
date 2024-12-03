import About from "../../components/Home/About";
import Banner from "../../components/Home/Banner";
import Packages from "../../components/Home/Packages";
import useScroll from "../../hooks/useScroll";

const Home = () => {
  useScroll();
  return (
    <div className="space-y-14 md:space-y-32">
      <Banner />
      <div className="space-y-14 md:space-y-32 mx-10">
        <About />
        <Packages />
      </div>
    </div>
  );
};

export default Home;
