import { Link } from "react-router-dom";
import NavLinks from "./NavLinks";
import useAuth from "../../../hooks/useAuth";

const EmployeeNavbar = () => {
  const { user, logOut } = useAuth();
  const navLinks = (
    <>
      <NavLinks title="Home" pathName="/"></NavLinks>
      <li className="mr-9 z-20">
        <details className="bg-transparent">
          <summary className="p-0"> Assets</summary>
          <ul className=" bg-base-100 rounded-t-none">
            <NavLinks
              title=" My Requested Assets"
              pathName="/my-requested-assets"
            />
            <br />
            <NavLinks title="Request for an Asset" pathName="/request-asset" />
          </ul>
        </details>
      </li>
      <NavLinks title="My Team" pathName="/my-team"></NavLinks>
    </>
  );
  return (
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
        <div className=" hidden lg:flex items-center">
          <ul className="menu menu-horizontal px-1">{navLinks}</ul>
        </div>

        <div className="text-black">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar ">
              <div className="w-10 rounded-full ">
                <img
                  src={
                    user?.photoURL ||
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStCJpmc7wNF8Ti2Tuh_hcIRZUGOc23KBTx2A&s"
                  }
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <button className="">
                  {user?.displayName || "user name not found"}
                </button>
              </li>
              <li>
                <Link to={"/profile"}>
                  <button className="">Profile</button>
                </Link>
              </li>

              <li>
                <button onClick={logOut} className="">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeNavbar;
