import PropTypes from "prop-types";
import { HashLoader } from "react-spinners";

const LoadingSpinner = () => {
  return (
    <div
      className="
     flex justify-center items-center h-screen "
    >
      <HashLoader size={70} color="#0077B5" />
    </div>
  );
};

LoadingSpinner.propTypes = {
  smallHeight: PropTypes.bool,
};

export default LoadingSpinner;
