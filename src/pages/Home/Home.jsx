import About from "../../components/Home/About";
import Banner from "../../components/Home/Banner";
import useScroll from "../../hooks/useScroll";

const Home = () => {
  useScroll();
  return (
    <div>
      <Banner />
      <About />
    </div>
  );
};

export default Home;
