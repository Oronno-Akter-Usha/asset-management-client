import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import PageLayout from "../../components/Shared/PageLayout";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import MyRequestedAssetsDataRow from "../../components/TableRows/MyRequestedAssetsDataRow";
import SearchBar from "../../components/Shared/SearchBar";
import Filter from "../../components/Shared/Filter";
import { useState } from "react";

const MyRequestedAssets = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");
  const [availability, setAvailability] = useState("");
  const [type, setType] = useState("");
  const userEmail = user?.email;

  // Fetch requested-assets data
  const {
    data: requestedAssets,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["requested-assets", search, availability, type, userEmail],
    queryFn: async () => {
      console.log("Request Parameters:", {
        search,
        availability,
        type,
        userEmail,
      });
      const { data } = await axiosSecure.get(
        `/requested-assets/${user?.email}`,
        {
          params: { search, availability, type },
        }
      );
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  if (isError) {
    return (
      <PageLayout>
        <div className="text-center text-red-600">
          <p>Failed to load requested assets.</p>
          <p>
            Error:
            {error?.response?.data?.message ||
              error?.message ||
              "Unknown error"}
          </p>
        </div>
      </PageLayout>
    );
  }

  // Ensure requestedAssets is an array to avoid errors
  const assetsArray = Array.isArray(requestedAssets) ? requestedAssets : [];

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.search.value);
    e.target.search.value = "";
  };

  return (
    <PageLayout>
      <div className="mx-auto px-4 sm:px-8">
        <h3 className="text-center font-bold text-2xl text-secondary mb-4">
          Asset List
        </h3>
        <SearchBar handleSearch={handleSearch} />
        <Filter
          availability={availability}
          setAvailability={setAvailability}
          type={type}
          setType={setType}
        />
        {assetsArray.length === 0 ? (
          <div className="text-center text-gray-500 py-4">
            <p>No assets found.</p>
          </div>
        ) : (
          <div className="py-8">
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                        Product Name
                      </th>
                      <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                        Product Type
                      </th>
                      <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                        Request Date
                      </th>
                      <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                        Approval Date
                      </th>
                      <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                        Request Status
                      </th>
                      <th
                        colSpan="2"
                        className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {assetsArray.map((requestedAsset) => (
                      <MyRequestedAssetsDataRow
                        key={requestedAsset._id}
                        requestedAsset={requestedAsset}
                        refetch={refetch}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default MyRequestedAssets;
