const MyTeamDataRow = ({ member }) => {
  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <span className="">
          <img
            src={member?.image_url}
            alt=""
            className="w-16 h-16 rounded-full"
          />
        </span>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
          {member.name || "No Name"}
          {member.isHR && (
            <span className="ml-2 text-xs text-blue-500">(HR)</span>
          )}
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
          {member.role || (member.isHR ? "HR Manager" : "Not Assigned")}
        </p>
      </td>
    </tr>
  );
};

export default MyTeamDataRow;
