import { Dialog, DialogTitle, DialogPanel } from "@headlessui/react";

const CancelModal = ({ isOpen, onClose, onCancel, assetName }) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* Background overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50" />

      {/* Modal content */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
          <DialogTitle className="text-xl font-semibold">
            Cancel Request
          </DialogTitle>
          <div className="my-2">
            Are you sure you want to cancel the request for{" "}
            <span className="font-bold">{assetName}</span>?
          </div>
          <div className="flex mt-4 justify-around">
            <button
              onClick={onClose}
              className="bg-gray-200 px-4 py-2 rounded-md text-gray-900 hover:bg-gray-300"
            >
              Close
            </button>
            <button
              onClick={onCancel}
              className="bg-red-500 px-4 py-2 rounded-md text-white hover:bg-red-600"
            >
              Confirm
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default CancelModal;
