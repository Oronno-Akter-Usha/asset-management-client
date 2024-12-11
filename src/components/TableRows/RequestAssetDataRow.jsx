import { useState } from "react";
import AssetRequestModal from "../Modal/AssetRequestModal";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const RequestAssetDataRow = ({ asset, refetch }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleRequest = async (asset, note) => {
    console.log(asset, note);
    const request = {
      asset: asset,
      note,
      request_date: new Date().toISOString(),
      approval_date: "",
      requestedBy: user?.email,
      status: "Pending",
    };
    try {
      await axiosSecure.post("/request", request);
      toast.success("Request submitted successfully!");
      refetch();
    } catch (error) {
      toast.error("Failed to submit request:", error);
    }
  };

  return (
    <tr key={asset._id}>
      {/* Asset Name */}
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{asset?.name}</p>
      </td>

      {/* Asset Type */}
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{asset.product_type}</p>
      </td>

      {/* Asset Availability */}
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
          {asset.quantity > 0 ? "Available" : "Out of Stock"}
        </p>
      </td>

      {/* Request Button */}
      <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
        <button
          onClick={() => setIsOpen(true)}
          disabled={asset.quantity <= 0}
          className={`py-1 px-2 ${
            asset.quantity > 0
              ? "bg-primary text-white"
              : "bg-gray-300 text-gray-600 cursor-not-allowed"
          } rounded-md`}
        >
          Request
        </button>

        {/* Asset Request Modal */}
        {isOpen && (
          <AssetRequestModal
            asset={asset}
            closeModal={closeModal}
            refetch={refetch}
            handleRequest={handleRequest}
          />
        )}
      </td>
    </tr>
  );
};

export default RequestAssetDataRow;
