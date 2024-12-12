const MonthlyRequestsDataRow = ({ request }) => {
  console.log("Requests prop:", request);
  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{request.asset.name}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
          {request.asset.product_type}
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
          {request.asset.quantity > 0 ? "Available" : "Out of Stock"}
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p
          className={`whitespace-no-wrap ${
            request?.status === "Pending"
              ? "text-yellow-500"
              : request?.status === "Approved"
              ? "text-green-500"
              : request?.status === "Returned"
              ? "text-blue-500"
              : request?.status === "Cancelled"
              ? "text-red-500"
              : "text-gray-900"
          }`}
        >
          {request?.status}
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
          {new Date(request?.request_date).toLocaleDateString()}
        </p>
      </td>
    </tr>
  );
};

export default MonthlyRequestsDataRow;
