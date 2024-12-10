import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import PageLayout from "../../components/Shared/PageLayout";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import MyTeamDataRow from "../../components/TableRows/MyTeamDataRow";

const MyTeam = () => {
  const { user } = useAuth(); // Logged-in employee
  const axiosSecure = useAxiosSecure();

  const {
    data: { team = [] } = {}, // Ensure 'team' is an empty array by default
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["team", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/myTeam", {
        params: { email: user?.email },
      });
      return data; // The API should return { team: [...] }
    },
    enabled: !!user?.email, // Ensure query runs only when user email is available
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 mt-8">
        <p>Failed to load your team. Please try again later.</p>
        <button
          onClick={refetch}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!team.length) {
    return (
      <div className="text-center text-gray-500 mt-8">
        <p>No team members found.</p>
        <img
          src="/empty-state.svg"
          alt="No Team"
          className="mx-auto mt-4 w-24 h-24"
        />
      </div>
    );
  }

  return (
    <PageLayout>
      <div className="mx-auto px-4 sm:px-8">
        <h3 className="text-center font-bold text-2xl text-secondary">
          My Team
        </h3>
        <div className="py-8">
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 bg-white border-b text-left text-sm uppercase font-normal">
                      Image
                    </th>
                    <th className="px-5 py-3 bg-white border-b text-left text-sm uppercase font-normal">
                      Name
                    </th>
                    <th className="px-5 py-3 bg-white border-b text-left text-sm uppercase font-normal">
                      Role
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {team.map((member) => (
                    <MyTeamDataRow
                      key={member._id}
                      member={member}
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

export default MyTeam;
