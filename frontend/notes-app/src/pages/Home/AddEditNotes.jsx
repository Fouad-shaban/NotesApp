import { useState } from "react";
import PropTypes from 'prop-types';
import TagInput from "../../components/Input/TagInput";
import { MdClose } from "react-icons/md";

const AddEditNotes = ({onClose}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);

  
  return (
    <div className="relative">
      <button
                      className="flex items-center justify-center absolute top-2 right-2 p-2 rounded-full bg-white shadow-lg hover:bg-indigo-500"
                      onClick={() => {onClose}}
                    >
                      
                      <MdClose className="text-slate-400 "/>
                    </button>
      <h1 className="text-3xl font-bold text-slate-950 m-5">Add New Note</h1>
      <div className=" flex flex-col gap-2">
        <label className="input-label">Title</label>
        <input
          type="text"
          className="text-slate-950 text-2xl outline-none"
          placeholder=" Go To GYM at 5pm"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div className=" flex flex-col gap-2">
        <label className="input-label">Content</label>
        <textarea
          className="text-slate-950 outline-none"
          placeholder="Write your content here"
          rows={6}
          value={content}
          onChange={({ target }) => {
            setContent(target.value);
          }}
        />
      </div>
      <div className=" flex flex-col gap-2">
        <TagInput tags={tags} setTags={setTags} />
      </div>
      <div className="mt-3">
        <label className="input-label"></label>
        <button className="bg-indigo-500 w-full  text-white p-2 rounded-lg shadow-lg m-auto hover:bg-indigo-800 mt-10">
          ADD NEW NOTE
        </button>
      </div>
    </div>
  );
};
AddEditNotes.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default AddEditNotes;

