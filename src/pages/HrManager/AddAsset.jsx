import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import PageLayout from "../../components/Shared/PageLayout";
import Button from "./../../components/Shared/Button/Button";
import { toast } from "react-hot-toast";

const AddAsset = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [startDate] = useState(new Date());

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const assetData = {
      name: form.productName.value,
      quantity: parseInt(form.productQuantity.value),
      product_type: form.productType.value,
      added_by_hrManager: user?.email,
      date: startDate.toISOString(),
    };

    try {
      const { data } = await axiosSecure.post("/asset", assetData);
      if (data.insertedId) {
        toast.success("Asset added successfully!");
        form.reset(); // Clear the form after submission
      } else {
        toast.error("Failed to add asset.");
      }
    } catch (error) {
      console.error("Error adding asset:", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <PageLayout>
      <div className="mx-auto md:w-2/5 bg-white rounded-lg p-5 md:p-10">
        <h2 className="font-bold text-2xl text-center text-secondary">
          Add an Asset
        </h2>
        <form onSubmit={handleSubmit} className="mx-auto mt-10">
          <div className="space-y-4">
            {/* Product Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Product Name</span>
              </label>
              <input
                type="text"
                name="productName"
                className="input border-gray-500"
                placeholder="Product Name"
                required
              />
            </div>

            {/* Product Quantity */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">
                  Product Quantity
                </span>
              </label>
              <input
                type="number"
                name="productQuantity"
                className="input border-gray-500"
                placeholder="Product Quantity"
                required
              />
            </div>

            {/* Product Type */}
            <div className="form-control space-y-3">
              <label className="label">
                <span className="label-text font-semibold">Product Type</span>
              </label>
              <div className="form-control">
                <label className="label cursor-pointer w-fit p-0">
                  <input
                    type="radio"
                    name="productType"
                    className="radio"
                    value="Returnable"
                    defaultChecked
                    required
                  />
                  <span className="ml-2">Returnable</span>
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer w-fit p-0">
                  <input
                    type="radio"
                    name="productType"
                    className="radio"
                    value="Non-Returnable"
                    required
                  />
                  <span className="ml-2">Non-Returnable</span>
                </label>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="form-control mt-10">
            <Button type="submit">Add</Button>
          </div>
        </form>
      </div>
    </PageLayout>
  );
};

export default AddAsset;
