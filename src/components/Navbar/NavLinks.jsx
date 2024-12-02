import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const NavLinks = ({ pathName, title }) => {
  return (
    <NavLink
      to={pathName}
      className={({ isActive }) =>
        isActive ? "font-bold mr-9 text-primary" : "mr-9"
      }
    >
      {title}
    </NavLink>
  );
};

NavLink.propTypes = {
  pathName: PropTypes.string,
  title: PropTypes.string,
};

export default NavLinks;
