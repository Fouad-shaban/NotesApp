import NoteCard from "../../components/Cards/NoteCard";
import Navbar from "../../components/Navbar/Navbar";
import { FaPlus } from "react-icons/fa";

import AddEditNotes from "./AddEditNotes";
const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        <NoteCard
          title="Meeting"
          date="12/12"
          content="Meeeeeeeeeeeeting"
          tags="#meet"
          isPinned={true}
          onEdit={() => {}}
          onDelete={() => {}}
          onPinNote={() => {}}
        />
        
        <button className="fixed bottom-4 right-4 bg-indigo-500 text-white p-4 rounded-lg shadow-lg hover:bg-indigo-800"><FaPlus /></button>

      <AddEditNotes />


      </div>
    </div>
  );
};

export default Home;
