import PropTypes from "prop-types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const MyEmployeeDataRow = ({ team, refetch }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Define the remove mutation
  const { mutate: removeEmployee, isLoading: isRemoving } = useMutation({
    mutationFn: async () => {
      const { data } = await axiosSecure.delete(`/team/${team._id}`, {
        data: { hrEmail: user?.email }, // Correctly pass hrEmail in the request body
      });
      console.log(data);
      return data;
    },
    onSuccess: () => {
      toast.success("Employee removed from the team");
      if (refetch) {
        refetch(); // Refetch data to update the list
      }
    },
    onError: (error) => {
      console.error("Error removing employee:", error);
      toast.error("Failed to remove employee.");
    },
  });

  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <span className="">
          <img
            src={team?.image_url || "/default-avatar.png"}
            alt="Employee Image"
            className="w-20 h-20 rounded-full"
          />
        </span>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{team?.name}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{team?.email}</p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <button
          onClick={removeEmployee}
          disabled={isRemoving} // Disable the button while removing
          className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-red-900 leading-tight"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-red-300 opacity-50 rounded-md"
          ></span>
          <span className="relative">
            {isRemoving ? "Removing..." : "Remove"}
          </span>
        </button>
      </td>
    </tr>
  );
};

MyEmployeeDataRow.propTypes = {
  team: PropTypes.object.isRequired,
  refetch: PropTypes.func,
};

export default MyEmployeeDataRow;
