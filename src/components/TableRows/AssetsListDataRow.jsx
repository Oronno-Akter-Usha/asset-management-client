import PropTypes from "prop-types";
const AssetsListDataRow = ({ asset, refetch }) => {
  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{asset?.name}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
          {asset?.product_type}
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{asset?.quantity}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
          {new Date(asset?.date).toLocaleDateString()}
        </p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <button
          // onClick={() => handleUpdateAsset(asset._id)}
          className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-green-300 opacity-50 rounded-md"
          ></span>
          <span className="relative">Update</span>
        </button>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <button
          // onClick={() => handleUpdateAsset(asset._id)}
          className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-red-900 leading-tight"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-red-300 opacity-50 rounded-md"
          ></span>
          <span className="relative">Delete</span>
        </button>
      </td>
    </tr>
  );
};

export default AssetsListDataRow;

AssetsListDataRow.propTypes = {
  asset: PropTypes.object.isRequired,
  refetch: PropTypes.func,
};
