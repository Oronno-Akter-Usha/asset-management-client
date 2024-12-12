import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import PageLayout from "../../components/Shared/PageLayout";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import PendingRequests from "../../components/Home/HrManager/PendingRequests";

const HrManagerHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const userEmail = user?.email;

  // Fetch HR Manager home data
  const {
    data: hrHomeData,
    refetch,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["hr-home", userEmail],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/home-hr-manager/${userEmail}`);
      console.log(data);
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  if (isError) {
    return (
      <PageLayout>
        <div className="text-center text-red-600">
          <p>Failed to load HR Manager home data.</p>
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

  // Ensure hrHomeData is an object to avoid errors
  const hrHomeDataObject = hrHomeData || {};

  return (
    <PageLayout>
      <div className="mx-auto px-4 sm:px-8">
        {/* Pending Requests Section */}
        {hrHomeDataObject.pendingRequests && (
          <PendingRequests
            requests={hrHomeDataObject.pendingRequests}
            refetch={refetch}
          />
        )}
      </div>
    </PageLayout>
  );
};

export default HrManagerHome;
