import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import PageLayout from "../../components/Shared/PageLayout";
import MyEmployeeDataRow from "./../../components/TableRows/MyEmolyeeDataRow";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";

const MyEmployee = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: team,
    isLoading,
    refetch,
    error,
  } = useQuery({
    queryKey: ["team", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/myEmployee", {
        params: { email: user?.email },
      });
      console.log("HR Team Data:", data);
      return data.team;
    },
  });

  if (isLoading) return <LoadingSpinner />;
  if (error) {
    console.error("Error fetching team:", error);
    toast.error("Failed to load team data.");
    return <p>Error loading team data.</p>;
  }

  if (!team || team.length === 0) return <p>No team data available.</p>;

  return (
    <PageLayout>
      <div className=" mx-auto px-4 sm:px-8">
        <h3 className="text-center font-bold text-2xl text-secondary">
          My Employee
        </h3>
        <div className="py-8">
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Image
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Email
                    </th>

                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {team.map((member) => (
                    <MyEmployeeDataRow
                      key={member._id}
                      team={member}
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

export default MyEmployee;
