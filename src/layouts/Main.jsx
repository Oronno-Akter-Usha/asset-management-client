import { Outlet } from "react-router-dom";
import Navbar from "./../components/Shared/Navbar/Navbar";
const Main = () => {
  return (
    <div className="bg-[#f5f5f5]">
      {/* navbar */}
      <Navbar />

      <div className="pb-20">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Main;
