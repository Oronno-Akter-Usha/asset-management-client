import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import PendingRequests from "./../../components/Home/Employee/PendingRequests";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import MonthlyRequests from "./../../components/Home/Employee/MonthlyRequests";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import PageLayout from "../../components/Shared/PageLayout";

const EmployeeHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const userEmail = user?.email;

  // Fetch employee home data
  const {
    data: employeeHomeData,
    refetch,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["employee-home", userEmail],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/home-employee/${userEmail}`);
      console.log(data);
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  if (isError) {
    return (
      <PageLayout>
        <div className="text-center text-red-600">
          <p>Failed to load employee home data.</p>
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

  // Ensure employeeHomeData is an object to avoid errors
  const employeeHomeDataObject = employeeHomeData || {};

  return (
    <PageLayout>
      <div className="mx-auto px-4 sm:px-8">
        {employeeHomeDataObject.pendingRequests && (
          <PendingRequests
            requests={employeeHomeDataObject.pendingRequests}
            refetch={refetch}
          />
        )}
        {employeeHomeDataObject.monthlyRequests && (
          <MonthlyRequests requests={employeeHomeDataObject.monthlyRequests} />
        )}
      </div>
    </PageLayout>
  );
};

export default EmployeeHome;
