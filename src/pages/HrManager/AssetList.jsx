import { useQuery } from "@tanstack/react-query";
import PageLayout from "../../components/Shared/PageLayout";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import AssetsListDataRow from "../../components/TableRows/AssetsListDataRow";
import Filter from "./../../components/Shared/Filter";
import SearchBar from "./../../components/Shared/SearchBar";
import { useState } from "react";

const AssetList = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");
  const [availability, setAvailability] = useState("");
  const [type, setType] = useState("");
  const userEmail = user?.email;

  // Fetch assets data with filters
  const {
    data: assets = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["assets", search, availability, type, userEmail],
    queryFn: async () => {
      console.log("Querying assets with filters:", {
        search,
        availability,
        type,
        userEmail,
      });
      const { data } = await axiosSecure.get(`/assets`, {
        params: { search, availability, type, userEmail },
      });
      console.log("Fetched Assets:", data);
      return data;
    },
    enabled: !!user?.email,
  });

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.search.value);
    e.target.search.value = "";
  };

  // Handle loading state
  if (isLoading) return <LoadingSpinner />;

  // Handle error state
  if (error) {
    return (
      <PageLayout>
        <div className="text-center text-red-500">
          Failed to load assets. Please try again later.
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="mx-auto px-4 sm:px-8">
        <h3 className="text-center font-bold text-2xl text-secondary">
          Asset List
        </h3>

        <SearchBar handleSearch={handleSearch} />
        <Filter
          availability={availability}
          setAvailability={setAvailability}
          type={type}
          setType={setType}
        />
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
                      Product Quantity
                    </th>
                    <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                      Date
                    </th>
                    <th
                      colSpan="2"
                      className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800  text-sm uppercase font-normal text-center"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {assets.map((asset) => (
                    <AssetsListDataRow
                      key={asset._id}
                      asset={asset}
                      refetch={refetch}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default AssetList;
