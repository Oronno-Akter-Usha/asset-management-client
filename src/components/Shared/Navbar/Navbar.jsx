import { Link } from "react-router-dom";
import NavLinks from "./NavLinks";
import Button from "../Button/Button";

const Navbar = () => {
  const navLinks = (
    <>
      <NavLinks title="Home" pathName="/"></NavLinks>
      <NavLinks title="Join as Employee" pathName="/JoinAsEmployee"></NavLinks>
      <NavLinks
        title="Join as HR Manager"
        pathName="/JoinAsHrManager"
      ></NavLinks>
    </>
  );

  return (
    <>
      <div className="navbar bg-white text-gray-800 shadow-xl">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navLinks}
            </ul>
          </div>
          <a className="btn-ghost btn text-xl text-primary">Asset Orbit</a>
        </div>

        <div className="navbar-end mr-5">
          <div className=" hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{navLinks}</ul>
          </div>

          <div className="text-black">
            <Link to={"/login"}>
              <Button> Login</Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
