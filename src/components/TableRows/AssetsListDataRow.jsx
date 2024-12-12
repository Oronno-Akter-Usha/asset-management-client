import PropTypes from "prop-types";
import DeleteModal from "./../Modal/DeleteModal";
import { useState } from "react";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import UpdateModal from "./../Modal/UpdateModal";
const AssetsListDataRow = ({ asset, refetch }) => {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);

  const openUpdateModal = (asset) => {
    setSelectedAsset(asset);
    setIsUpdateModalOpen(true);
  };

  const closeUpdateModal = () => setIsUpdateModalOpen(false);

  const handleUpdate = (updatedAssetData) => {
    console.log("Updated Asset Data:", updatedAssetData);
    // Call your update API here
  };

  console.log(asset);
  const axiosSecure = useAxiosSecure();
  // for delete modal
  let [isOpen, setIsOpen] = useState(false);
  const closeModal = () => {
    setIsOpen(false);
  };

  // delete
  const { mutateAsync } = useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosSecure.delete(`/asset/${id}`);
      return data;
    },
    onSuccess: (data) => {
      console.log(data);
      refetch();
      toast.success("Successfully deleted.");
    },
  });

  // Handle Delete
  const handleDelete = async (id) => {
    console.log(id);
    try {
      await mutateAsync(id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{asset?.name}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
          {asset?.product_type}
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{asset?.quantity}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
          {new Date(asset?.date).toLocaleDateString()}
        </p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <button
          onClick={() => openUpdateModal(asset)}
          className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-green-300 opacity-50 rounded-md"
          ></span>
          <span className="relative">Update</span>
        </button>
        <UpdateModal
          isOpen={isUpdateModalOpen}
          closeModal={closeUpdateModal}
          handleUpdate={handleUpdate}
          refetch={refetch}
          assetData={selectedAsset || {}}
        />
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <button
          onClick={() => setIsOpen(true)}
          className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-red-900 leading-tight"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-red-300 opacity-50 rounded-md"
          ></span>
          <span className="relative">Delete</span>
        </button>
        {/* Delete modal */}
        <DeleteModal
          isOpen={isOpen}
          closeModal={closeModal}
          handleDelete={handleDelete}
          id={asset?._id}
        />
      </td>
    </tr>
  );
};

export default AssetsListDataRow;

AssetsListDataRow.propTypes = {
  asset: PropTypes.object.isRequired,
  refetch: PropTypes.func,
};
