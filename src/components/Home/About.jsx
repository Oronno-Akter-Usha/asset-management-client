import Lottie from "lottie-react";
import about from "../../assets/about.json";

const About = () => {
  return (
    <div className="md:flex items-center gap-10">
      <div className="md:w-1/2">
        <Lottie animationData={about} loop={true} speed={0.5}></Lottie>
      </div>
      <div className="w-full md:w-1/2 md:mr-10 px-5">
        <h2 className="font-semibold text-2xl md:text-3xl mb-5 text-secondary">
          About Us
        </h2>
        <p className="mb-3">
          Welcome to Asset Orbit, your comprehensive solution for efficient
          asset tracking and management. Our platform is designed to help
          businesses of all sizes streamline their asset management processes,
          ensuring optimal utilization and accountability.
        </p>
        <p>
          At Asset Orbit, our mission is to simplify asset management through
          innovative technology. We aim to empower businesses with tools that
          make asset tracking effortless and accurate, supporting your company
          growth and operational efficiency.
        </p>
      </div>
    </div>
  );
};

export default About;
