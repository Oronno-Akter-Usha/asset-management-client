import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const AllRequestsDataRow = ({ request, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleUpdateStatus = async (status) => {
    setIsProcessing(true);
    try {
      const response = await axiosSecure.patch(`/all-requests/${request._id}`, {
        status,
      });
      if (response.status === 200) {
        toast.success(`Request ${status.toLowerCase()} successfully!`);
        refetch();
      } else {
        toast.error("Unexpected response from server.");
      }
    } catch (error) {
      console.error("Error updating request:", error);
      toast.error(
        `Failed to ${status.toLowerCase()} the request. ${error.message}`
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <tr key={request._id}>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        {request.asset?.name || "N/A"}
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        {request.asset?.product_type || "N/A"}
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        {request.requestedBy || "N/A"}
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        {request.requesterName || "N/A"}
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        {new Date(request.request_date).toLocaleDateString()}
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        {request.note || "N/A"}
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        {request.status}
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm ">
        <div className="flex justify-center items-center gap-2">
          <button
            onClick={() => handleUpdateStatus("Approved")}
            disabled={isProcessing || request.status !== "Pending"}
            className="mr-2 py-1 px-3 bg-green-500 text-white rounded-md disabled:opacity-50"
          >
            {isProcessing ? "Processing..." : "Approve"}
          </button>
          <button
            onClick={() => handleUpdateStatus("Rejected")}
            disabled={isProcessing || request.status !== "Pending"}
            className="py-1 px-3 bg-red-500 text-white rounded-md disabled:opacity-50"
          >
            {isProcessing ? "Processing..." : "Reject"}
          </button>
        </div>
      </td>
    </tr>
  );
};

export default AllRequestsDataRow;
