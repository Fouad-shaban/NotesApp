import NoteCard from "../../components/Cards/NoteCard";
import Navbar from "../../components/Navbar/Navbar";
import { FaPlus } from "react-icons/fa";
import AddEditNotes from "./AddEditNotes";
import { useState } from "react";
import Modal from "react-modal";


const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown : false,
    type: 'add',
    data: null
  });

  return (
    <div>
      
      <Navbar />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        <NoteCard
          title="Meeting"
          date="12/12"
          content="Meeting"
          tags="#meet"
          isPinned={true}
          onEdit={() => {}}
          onDelete={() => {}}
          onPinNote={() => {}}
        />
        
        <button onClick={()=>{
          setOpenAddEditModal({
            isShown: true,
            type: 'add',
            data: null
          })
        }} className="fixed bottom-4 right-4 bg-indigo-500 text-white p-4 rounded-lg shadow-lg hover:bg-indigo-800"><FaPlus /></button>

<Modal
isOpen = { openAddEditModal.isShown}
onRequestClose = {()=>{}}
style = {{
  overlay:{
    backgroundColor: 'rgba(0,0,0,0.4)'
  }
}}
contentLabel = "Add Edit Note Modal"
className="w-[50%] h-[70%] bg-white rounded-md shadow-lg p-4 overflow-auto mx-auto mt-24"
>
  <AddEditNotes 
  type={openAddEditModal.type}
  noteData={openAddEditModal.data}
  
  onClose={()=>{
    setOpenAddEditModal({
      isShown: false,
      type: 'add',
      data: null
    })
  }}
  
  />
</Modal>

      </div>
    </div>
  );
};

export default Home;
