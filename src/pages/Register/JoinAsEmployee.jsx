import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { imageUpload } from "../../api/utils";
import Button from "../../components/Shared/Button/Button";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useState } from "react";
import axios from "axios";
import useScroll from "../../hooks/useScroll";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const JoinAsEmployee = () => {
  useScroll();
  const [imagePreview, setImagePreview] = useState();
  const [imageText, setImageText] = useState("Upload Image");
  const [startDate, setStartDate] = useState(new Date());
  const {
    createUser,
    signInWithGoogle,
    updateUserProfile,
    loading,
    setLoading,
  } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const image = form.image.files[0];
    const role = "employee";
    const company_name = "";
    const added_by_hrManager = "";

    try {
      setLoading(true);

      // Upload image
      const image_url = await imageUpload(image);
      console.log("Image uploaded:", image_url);

      // Firebase User Registration
      const result = await createUser(email, password);
      console.log("Firebase User:", result);

      // Update Firebase Profile
      await updateUserProfile(name, image_url);

      // Prepare user data for database
      const userData = {
        name,
        email,
        role,
        company_name,
        added_by_hrManager,
        image_url,
        date_of_birth: startDate,
      };

      // Save user in database
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/user`,
        userData
      );
      console.log(response);

      if (response.data.insertedId) {
        toast.success("SignUp Successful");
        navigate(from);
      } else {
        toast.error(response.data.message || "User already exists");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  // handle google signin
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate(from);
      toast.success("SignUp Successful");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  // handle image change
  const handleImage = (image) => {
    setImagePreview(URL.createObjectURL(image));
    setImageText(image.name);
  };

  return (
    <div className="flex justify-center items-center min-h-screen mt-10">
      <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10  text-gray-900 bg-white border border-primary">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold text-secondary">
            Join As Employee
          </h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            {/* name input */}
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                placeholder="Enter Your Name Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-primary bg-gray-100 text-gray-900"
                data-temp-mail-org="0"
              />
            </div>

            {/* user image input */}
            <div>
              <label htmlFor="image" className="block mb-2 text-sm">
                Select Image:
              </label>
              <div className="  bg-gray-100 w-full  m-auto rounded-lg">
                <div className="file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg w-full">
                  <div className="flex flex-col w-max mx-auto text-center">
                    {imagePreview && (
                      <img
                        src={imagePreview}
                        className="w-[280px] h-[65px] mb-1"
                      />
                    )}

                    <label>
                      <input
                        className="text-sm cursor-pointer w-36 hidden"
                        type="file"
                        onChange={(e) => handleImage(e.target.files[0])}
                        name="image"
                        id="image"
                        accept="image/*"
                        hidden
                      />
                      <div className="bg-white text-primary border border-primary font-semibold cursor-pointer p-1 px-3 rounded">
                        {imageText.length > 20
                          ? imageText.split(".")[0].slice(0, 15) +
                            "....." +
                            imageText.split(".")[1]
                          : imageText}
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/*date of birth input */}
            <div className="w-full">
              <label htmlFor="email" className="block mb-2 text-sm">
                Date of birth
              </label>
              <DatePicker
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-primary bg-gray-100 text-gray-900"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                wrapperClassName="w-full"
              />
            </div>

            {/* email input */}
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Email address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                placeholder="Enter Your Email Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-primary bg-gray-100 text-gray-900"
                data-temp-mail-org="0"
              />
            </div>

            {/* password input */}
            <div>
              <div className="flex justify-between">
                <label htmlFor="password" className="text-sm mb-2">
                  Password
                </label>
              </div>
              <input
                type="password"
                name="password"
                autoComplete="new-password"
                id="password"
                required
                placeholder="*******"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-primary bg-gray-100 text-gray-900"
              />
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="bg-primary w-full rounded-md py-3 text-white"
            >
              {loading ? (
                <AiOutlineLoading3Quarters className="animate-spin m-auto" />
              ) : (
                " Continue"
              )}
            </Button>
          </div>
        </form>
        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
          <p className="px-3 text-sm dark:text-gray-400">
            Signup with social accounts
          </p>
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
        </div>

        {/* google login */}
        <button
          disabled={loading}
          onClick={handleGoogleSignIn}
          className="disabled:cursor-not-allowed flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer rounded-md"
        >
          <FcGoogle size={32} />

          <p>Continue with Google</p>
        </button>
        <p className="px-6 text-sm text-center text-gray-400">
          Already have an account?
          <Link
            to="/login"
            className="hover:underline hover:text-primary text-gray-600"
          >
            Login
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default JoinAsEmployee;
