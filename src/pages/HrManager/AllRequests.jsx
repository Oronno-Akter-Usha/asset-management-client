import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import PageLayout from "../../components/Shared/PageLayout";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import AllRequestsDataRow from "../../components/TableRows/AllRequestsDataRow";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import SearchBar from "../../components/Shared/SearchBar";
import useAuth from "../../hooks/useAuth";

const AllRequests = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");

  const {
    data: requests = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["all-requests", user?.email, search],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/all-requests/${user?.email}`, {
        params: { search },
      });
      return data;
    },
  });

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.search.value);
  };

  if (isLoading) return <LoadingSpinner />;

  const requestList = Array.isArray(requests) ? requests : [];

  return (
    <PageLayout>
      <div>
        <div className="mx-auto px-4 sm:px-8">
          <h3 className="text-center font-bold text-2xl text-secondary mb-10">
            All Asset Requests
          </h3>

          <SearchBar handleSearch={handleSearch} />
          <div className="pb-8">
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                        Asset Name
                      </th>
                      <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                        Asset Type
                      </th>
                      <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                        Requester Email
                      </th>
                      <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                        Requester Name
                      </th>
                      <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                        Request Date
                      </th>
                      <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                        Note
                      </th>
                      <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                        Status
                      </th>
                      <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {requestList.map((request) => (
                      <AllRequestsDataRow
                        key={request._id}
                        request={request}
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

export default AllRequests;
