import PropTypes from "prop-types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const EmployeeDataRow = ({ employee, refetch }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  // **Mutation to add employee to HR's team**
  const { mutateAsync } = useMutation({
    mutationFn: async (employeeId) => {
      const { data } = await axiosSecure.patch("/add-employee", {
        hrEmail: user?.email,
        employeeId,
      });
      return data;
    },
    onSuccess: (data) => {
      console.log(data);
      refetch(); // Refresh the data
      toast.success("Employee added to the team successfully.");
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to add employee to the team."
      );
    },
  });

  const handleAddToTeam = async (employeeId) => {
    console.log("Attempting to add:", { hrEmail: user?.email, employeeId }); // Log API call data
    try {
      await mutateAsync(employeeId); // Ensure this passes only `employeeId`
    } catch (err) {
      console.error("Error in handleAddToTeam:", err.response?.data || err);
      toast.error(
        err.response?.data?.message || "Failed to add employee to the team."
      );
    }
  };

  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <span className="">
          <img
            src={employee?.image_url}
            alt=""
            className="w-20 h-20 rounded-full"
          />
        </span>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{employee?.name}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{employee?.email}</p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <button
          onClick={() => handleAddToTeam(employee._id)}
          className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-green-300 opacity-50 rounded-full"
          ></span>
          <span className="relative">Add to the team</span>
        </button>
      </td>
    </tr>
  );
};

EmployeeDataRow.propTypes = {
  employee: PropTypes.object,
  refetch: PropTypes.func,
};

export default EmployeeDataRow;
