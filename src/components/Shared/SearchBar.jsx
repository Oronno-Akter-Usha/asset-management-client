/* eslint-disable react/prop-types */
import { IoSearchSharp } from "react-icons/io5";

const SearchBar = ({ handleSearch }) => {
  return (
    <form onSubmit={handleSearch}>
      <div className="border border-black rounded-md flex items-center justify-between">
        <input
          type="text"
          placeholder="Search Product"
          name="search"
          className="p-3 bg-white w-full"
        />
        <button className="btn bg-gray-300">
          <IoSearchSharp size={20} />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
