/* eslint-disable no-unused-vars */
import { useState } from "react";
import PropTypes from "prop-types";
import TagInput from "../../components/Input/TagInput";
import { MdClose } from "react-icons/md";

const AddEditNotes = ({ noteData, type, onClose }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);

  const [error, setError]=useState(null)

    //ADD Note
    const addNewNote = async ()=>{}

    //Edit Note
    const editNote = async ()=>{}




  const handleAddNote = ()=>{
    if(!title){
      setError("Please enter the Title")
      return;
    }
    if(!content){
      setError("Please enter the Content")
      return;
    }
setError("")

if(type ==="edit"){
editNote()
}else{
  addNewNote()
}
  }

  return (
    <div className="relative">
      <button
        className="flex items-center justify-center absolute top-2 right-2 p-2 rounded-full bg-white shadow-lg hover:bg-indigo-500"
        onClick={onClose}
      >
        <MdClose className="text-slate-400 " />
      </button>
      <h1 className="text-3xl font-bold text-slate-950 m-5">Add New Note</h1>
      <div className=" flex flex-col gap-2">
        <label className="input-label">Title</label>
        <input
          type="text"
          className="text-slate-950 text-2xl outline-none rounded-md p-2 focus:bg-slate-50"
          placeholder="Go To GYM at 5pm"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div className=" flex flex-col gap-2">
        <label className="input-label">Content</label>
        <textarea
          className="text-slate-950 outline-none rounded-md p-2 focus:bg-slate-50"
          placeholder="Write your content here"
          rows={6}
          value={content}
          onChange={({ target }) => {
            setContent(target.value);
          }}
        />
      </div>
      <div className="mt-3">
        <label className="input-label">TAGS</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>
      {error && <p className="text-red-600">{error}</p>}
        <button className="bg-indigo-500 w-full  text-white p-2 rounded-lg shadow-lg m-auto hover:bg-indigo-800 mt-10" onClick={handleAddNote}>
          ADD NEW NOTE
        </button>
    </div>
  );
};

AddEditNotes.propTypes = {
  noteData: PropTypes.object,
  type: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AddEditNotes;
