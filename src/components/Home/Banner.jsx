import { Link } from "react-router-dom";
import Button from "../Shared/Button/Button";

const Banner = () => {
  return (
    <div className="carousel w-full md:h-[750px]">
      <div id="slide1" className="carousel-item relative w-full">
        <img
          src="https://i.postimg.cc/hvW5hz9Z/pexels-kampus-8190808.jpg"
          className="w-full h-full"
        />

        <div className="absolute w-full flex items-center h-full bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0.00)]">
          <div className="text-white pl-5 md:pl-12 w-1/2">
            <h2 className="text-2xl md:text-5xl font-bold">
              Empower Your Workforce
            </h2>
            <p className="text-sm md:text-lg mb-7 mt-3 md:mt-5">
              Streamline asset management and monitor resource usage across your
              team effectively.
            </p>

            <Link to="/JoinAsHR">
              <Button>Join as HR Manager</Button>
            </Link>
          </div>
        </div>

        <div className="absolute flex justify-end gap-3 left-5 right-5 bottom-6 md:bottom-12 md:right-12">
          <a
            href="#slide2"
            className="btn border-none text-primary btn-xs md:btn-md"
          >
            ❮
          </a>
          <a
            href="#slide2"
            className="btn border-none text-primary btn-xs md:btn-md"
          >
            ❯
          </a>
        </div>
      </div>

      <div id="slide2" className="carousel-item relative w-full">
        <img
          src="https://i.postimg.cc/mrnqf6hs/pexels-karolina-grabowska-7681421.jpg"
          className="w-full"
        />
        <div className="absolute w-full flex items-center h-full bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0.00)]">
          <div className="text-white pl-5 md:pl-12 w-1/2">
            <h2 className="text-2xl md:text-5xl font-bold">
              Optimize Your Work
            </h2>
            <p className="text-sm md:text-lg mb-7 mt-3 md:mt-5">
              Access the resources you need to succeed and stay productive.
            </p>

            <Link to="/JoinAsEmployee">
              <Button>Join as an Employee</Button>
            </Link>
          </div>
        </div>

        <div className="absolute flex justify-end gap-3 left-5 right-5 bottom-6 md:bottom-12 md:left-12">
          <a
            href="#slide1"
            className="btn border-none text-primary btn-xs md:btn-md rounded-lg"
          >
            ❮
          </a>
          <a
            href="#slide1"
            className="btn border-none text-primary btn-xs md:btn-md rounded-lg"
          >
            ❯
          </a>
        </div>
      </div>
    </div>
  );
};

export default Banner;
