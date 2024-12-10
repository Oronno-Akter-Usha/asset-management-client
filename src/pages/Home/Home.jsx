import About from "../../components/Home/About";
import Banner from "../../components/Home/Banner";
import Packages from "../../components/Home/Packages";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";
import useScroll from "../../hooks/useScroll";
import EmployeeHome from "./EmployeeHome";
import HrManagerHome from "./HrManagerHome";

const Home = () => {
  useScroll();
  const { loading } = useAuth();
  const [role, isLoading] = useRole();
  if (loading) return <LoadingSpinner />;
  if (isLoading) return <LoadingSpinner />;

  if (role === "employee") {
    return <EmployeeHome />;
  }
  if (role === "hrManager") {
    return <HrManagerHome />;
  }
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
