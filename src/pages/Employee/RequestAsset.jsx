import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import AssetRequestModal from "../../components/Modal/AssetRequestModal";
import PageLayout from "../../components/Shared/PageLayout";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "./../../hooks/useAxiosSecure";
import RequestAssetDataRow from "../../components/TableRows/RequestAssetDataRow";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import SearchBar from "../../components/Shared/SearchBar";
import Filter from "../../components/Shared/Filter";

const RequestAsset = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");
  const [availability, setAvailability] = useState("");
  const [type, setType] = useState("");
  const [selectedAsset, setSelectedAsset] = useState(null);
  const userEmail = user?.email;

  const {
    data: assets = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["assets", search, availability, type, userEmail],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/assets", {
        params: { search, availability, type, userEmail },
      });
      return data;
    },
  });

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.search.value);
    e.target.search.value = "";
  };

  if (isLoading) return <LoadingSpinner />;

  const assetsList = Array.isArray(assets) ? assets : [];

  return (
    <PageLayout>
      <div>
        {selectedAsset && (
          <AssetRequestModal
            asset={selectedAsset}
            onClose={() => setSelectedAsset(null)}
            refetch={refetch}
          />
        )}

        <div className="mx-auto px-4 sm:px-8">
          <h3 className="text-center font-bold text-2xl text-secondary mb-10">
            Request an Asset
          </h3>

          <SearchBar handleSearch={handleSearch} />
          <Filter
            availability={availability}
            setAvailability={setAvailability}
            type={type}
            setType={setType}
          />
          <div className="pb-8">
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
                        Availability
                      </th>
                      <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {assetsList.map((asset) => (
                      <RequestAssetDataRow
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
      </div>
    </PageLayout>
  );
};

export default RequestAsset;
