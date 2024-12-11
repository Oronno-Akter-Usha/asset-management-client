const Filter = ({ availability, setAvailability, type, setType }) => {
  return (
    <div className="mt-8 flex gap-5 justify-center">
      {/* Availability Dropdown */}
      <select
        value={availability}
        onChange={(e) => setAvailability(e.target.value)}
        className="border p-2 rounded-md"
      >
        <option value="">All</option>
        <option value="available">Available</option>
        <option value="out-of-stock">Out of Stock</option>
      </select>

      {/* Type Dropdown */}
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="border p-2 rounded-md"
      >
        <option value="">All Types</option>
        <option value="Returnable">Returnable</option>
        <option value="Non-Returnable">Non-Returnable</option>
      </select>
    </div>
  );
};

export default Filter;
