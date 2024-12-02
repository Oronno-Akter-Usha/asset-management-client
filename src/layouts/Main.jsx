import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <div className="bg-[#f5f5f5]">
      {/* navbar */}
      <div className="pb-20">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Main;
