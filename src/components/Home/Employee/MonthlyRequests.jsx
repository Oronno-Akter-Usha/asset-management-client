import MonthlyRequestsDataRow from "./../../TableRows/MonthlyRequestsDataRow";
const MonthlyRequests = ({ requests }) => {
  return (
    <div className="mx-auto px-4 sm:px-8">
      <h3 className="text-center font-bold text-2xl text-secondary">
        My Monthly Requests
      </h3>
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
                    Request Quantity
                  </th>
                  <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                    Request Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {requests.map((request) => (
                  <MonthlyRequestsDataRow key={request._id} request={request} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthlyRequests;
