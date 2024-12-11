import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import PdfPrint from "../Employee/PdfPrint";
import { useState } from "react";
import CancelModal from "../Modal/CancelModal";
import useAuth from "../../hooks/useAuth";
import { PDFDownloadLink } from "@react-pdf/renderer"; // Import PDFDownloadLink

const MyRequestedAssetsDataRow = ({ requestedAsset, refetch }) => {
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isReturning, setIsReturning] = useState(false);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  // Cancel request mutation
  const cancelRequest = useMutation({
    mutationFn: async () => {
      const response = await axiosSecure.patch(
        `/cancel-request/${requestedAsset._id}`
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

  // Return asset mutation
  const returnAsset = useMutation({
    mutationFn: async () => {
      await axiosSecure.patch(`/return-asset/${requestedAsset._id}`);
    },
    onSuccess: () => {
      // Optimistically update the status in the local data
      queryClient.setQueryData(["requested-assets", user?.email], (oldData) => {
        if (!oldData) return oldData;

        return oldData.map((asset) => {
          if (asset._id === requestedAsset._id) {
            return { ...asset, status: "Returned" };
          }
          return asset;
        });
      });

      toast.success("Asset returned successfully!");
      setIsReturning(false);
    },
    onError: (error) => {
      console.error("Error returning asset:", error);
      toast.error("Failed to return the asset.");
      setIsReturning(false);
    },
  });

  return (
    <tr key={requestedAsset?._id}>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
          {requestedAsset?.asset?.name}
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
          {requestedAsset?.asset?.product_type}
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
          {new Date(requestedAsset?.request_date).toLocaleDateString()}
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
          {requestedAsset?.approval_date
            ? new Date(requestedAsset?.approval_date).toLocaleDateString()
            : ""}
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p
          className={`whitespace-no-wrap ${
            requestedAsset?.status === "Pending"
              ? "text-yellow-500"
              : requestedAsset?.status === "Approved"
              ? "text-green-500"
              : requestedAsset?.status === "Returned"
              ? "text-blue-500"
              : requestedAsset?.status === "Cancelled"
              ? "text-red-500"
              : "text-gray-900"
          }`}
        >
          {requestedAsset?.status}
        </p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        {requestedAsset?.status === "Pending" && (
          <button
            onClick={() => setIsCancelModalOpen(true)}
            className="bg-red-500 text-white py-1 px-2 rounded-md"
          >
            Cancel Request
          </button>
        )}
        {requestedAsset?.status === "Approved" && (
          <>
            <PDFDownloadLink
              document={<PdfPrint asset={requestedAsset} />}
              fileName={`${requestedAsset.asset.name}-information.pdf`}
            >
              {({ loading }) =>
                loading ? (
                  <button className="bg-primary text-white py-1 px-2 rounded-md">
                    Loading...
                  </button>
                ) : (
                  <button className="bg-primary text-white py-1 px-2 rounded-md">
                    Print
                  </button>
                )
              }
            </PDFDownloadLink>

            {requestedAsset?.asset?.product_type === "Returnable" && (
              <button
                onClick={() => {
                  setIsReturning(true);
                  returnAsset.mutate();
                }}
                disabled={isReturning}
                className="ml-2 bg-yellow-400 text-white py-1 px-2 rounded-md"
              >
                {isReturning ? "Returning..." : "Return Asset"}
              </button>
            )}
          </>
        )}
      </td>

      {/* Cancel Modal */}
      <CancelModal
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        onCancel={() => cancelRequest.mutate()}
        assetName={requestedAsset?.asset?.name}
      />
    </tr>
  );
};

export default MyRequestedAssetsDataRow;
