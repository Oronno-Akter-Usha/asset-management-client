import toast from "react-hot-toast";
import CancelModal from "./../Modal/CancelModal";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
const PendingRequestsDataRow = ({ request, refetch }) => {
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  //   const [isReturning, setIsReturning] = useState(false);
  const axiosSecure = useAxiosSecure();

  // Cancel request mutation
  const cancelRequest = useMutation({
    mutationFn: async () => {
      const response = await axiosSecure.patch(
        `/cancel-request/${request._id}`
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success("Request cancelled successfully!");
      setIsCancelModalOpen(false);
      refetch();
    },
    onError: (error) => {
      console.error("Error cancelling request:", error);
      toast.error("Failed to cancel the request.");
    },
  });
  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{request.asset.name}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
          {request.asset.product_type}
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
          {request.asset.quantity > 0 ? "Available" : "Out of Stock"}
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
          {new Date(request?.request_date).toLocaleDateString()}
        </p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
        {request?.status === "Pending" && (
          <button
            onClick={() => setIsCancelModalOpen(true)}
            className="bg-red-500 text-white py-1 px-2 rounded-md"
          >
            Cancel Request
          </button>
        )}

        {/* Cancel Modal */}
        <CancelModal
          isOpen={isCancelModalOpen}
          onClose={() => setIsCancelModalOpen(false)}
          onCancel={() => cancelRequest.mutate()}
          assetName={request?.asset?.name}
        />
      </td>
    </tr>
  );
};

export default PendingRequestsDataRow;
