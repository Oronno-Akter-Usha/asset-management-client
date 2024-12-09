import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAxiosCommon from "./../../hooks/useAxiosCommon";

const SocialLogin = () => {
  const { signInWithGoogle, loading } = useAuth();
  const axiosCommon = useAxiosCommon();

  // navigation
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state || "/";

  const handleSocialLogin = (socialSignIn) => {
    socialSignIn()
      .then((result) => {
        const userData = {
          email: result.user?.email,
          name: result.user?.displayName,
          photo: result.user?.photoURL,
          role: "employee",
          company_name: "",
          added_by_hrManager: "",
        };
        axiosCommon.post("/user", userData).then(() => {
          navigate(from);
          toast.success("SignIn Successfully");
        });
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.response?.data?.message || "Something went wrong!");
      });
  };
  return (
    <div className="form-control mt-5">
      <button
        disabled={loading}
        onClick={() => handleSocialLogin(signInWithGoogle)}
        className="disabled:cursor-not-allowed flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer rounded-md"
      >
        <FcGoogle size={32} />
        <p>Continue with Google</p>
      </button>
    </div>
  );
};

export default SocialLogin;
