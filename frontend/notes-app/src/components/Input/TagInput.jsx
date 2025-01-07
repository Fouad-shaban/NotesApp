/* eslint-disable no-unused-vars */
import { useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";
import PropTypes from "prop-types";

const TagInput = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const addNewTag = () => {
    if (inputValue.trim() !== "") {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addNewTag();
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div>
      {tags?.length > 0 && (
        <div className=" flex flex-wrap gap-2 mt-3 ">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-500 text-sm px-2 py-1 rounded-full"
            >
              # {tag}
              <button
                className="ml-2"
                onClick={() => {
                  handleRemoveTag(tag);
                }}
              >
                <MdClose />
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="flex gap-2 mt-3">

        <input
          type="text"
          value={inputValue}
          className="text-slate-950 outline-none rounded "
          placeholder="#gym #workout #fitness"
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />

        <button
          className="hover:bg-indigo-500 p-2 rounded-lg"
          onClick={() => {
            addNewTag();
          }}
        >
          <MdAdd className="text-2xl text-slate-400 hover:text-white " />
        </button>
      </div>
    </div>
  );
};

TagInput.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  setTags: PropTypes.func.isRequired,
};

export default TagInput;
;
