import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Fragment } from "react";
import PropTypes from "prop-types";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const UpdateModal = ({ closeModal, isOpen, assetData, refetch }) => {
  const axiosSecure = useAxiosSecure();
  // Create a mutation for updating the asset
  const { mutate: updateAsset, isLoading } = useMutation({
    mutationFn: async (updatedData) => {
      const response = await axiosSecure.put(
        `/assets/${updatedData.id}`,
        updatedData
      );
      return response.data;
    },
    onSuccess: () => {
      console.log("Asset updated successfully");
      closeModal(); // Close the modal on success
    },
    onError: (error) => {
      console.error("Error updating asset:", error);
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    // Collect updated data from the form
    const form = event.target;
    const updatedAssetData = {
      id: assetData._id, // Ensure you pass the asset ID
      name: form.productName.value,
      quantity: parseInt(form.productQuantity.value),
      product_type: form.productType.value,
    };

    // Call updateAsset mutation
    updateAsset(updatedAssetData);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <DialogTitle
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Update Asset
                </DialogTitle>
                <form onSubmit={handleSubmit} className="mt-4">
                  <div className="mb-4">
                    <label
                      htmlFor="productName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Product Name
                    </label>
                    <input
                      type="text"
                      id="productName"
                      name="productName"
                      defaultValue={assetData.name}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="productQuantity"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Quantity
                    </label>
                    <input
                      type="number"
                      id="productQuantity"
                      name="productQuantity"
                      defaultValue={assetData.quantity}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="productType"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Product Type
                    </label>
                    <div className="mt-1 space-y-2">
                      {["Returnable", "Non-Returnable"].map((type) => (
                        <div key={type} className="flex items-center">
                          <input
                            type="radio"
                            id={`productType-${type}`}
                            name="productType"
                            value={type}
                            defaultChecked={assetData.product_type === type}
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500 text-sm"
                            required
                          />
                          <label
                            htmlFor={`productType-${type}`}
                            className="ml-3 block text-sm  text-gray-700"
                          >
                            {type}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end gap-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      disabled={isLoading}
                      onClick={refetch()}
                    >
                      {isLoading ? "Updating..." : "Update"}
                    </button>
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

UpdateModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  assetData: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string,
    quantity: PropTypes.number,
    product_type: PropTypes.string,
    date: PropTypes.string,
  }).isRequired,
};

export default UpdateModal;
