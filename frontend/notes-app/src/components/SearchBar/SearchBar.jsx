import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

// eslint-disable-next-line react/prop-types
const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
  return (
    <div className="flex items-center space-x-4">
      <div className=" w-80 border-gray-300 border  w-70 m-2 p-2 rounded-md flex items-center px-4">
        <input
          type="text"
          placeholder="Search..."
          onChange={onChange}
          value={value}
          className="bg-transparent w-full focus:outline-none focus:bg-slate-200 p-1"
        />
        {value && (
          <IoMdClose className=" text-slate-400 " onClick={onClearSearch} />
        )}
      </div>
      <FaMagnifyingGlass
        className=" text-slate-400 bg-transparent "
        onClick={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
