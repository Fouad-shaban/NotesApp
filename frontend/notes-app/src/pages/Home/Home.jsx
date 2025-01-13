import NoteCard from "../../components/Cards/NoteCard";
import Navbar from "../../components/Navbar/Navbar";
import { FaPlus } from "react-icons/fa";
import AddEditNotes from "./AddEditNotes";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [allNotes, setAllNotes] = useState([]);
  const [userInfo, setUserInfo] = useState(" ");

  const navigate = useNavigate();

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({ isShown: true, data: noteDetails, type: "edit" });
  };

  //Get user Info
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("all-notes");
      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log(`${error}An unexpected error occurred. Please try again.`);
    }
  };

  useEffect(() => {
    getAllNotes();
    getUserInfo();
    return () => {};
  }, []);

  return (
    <div>
      <Navbar userInfo={userInfo} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        {allNotes.map((item) => (
          <NoteCard
            key={item._id}
            title={item.title}
            date={item.createdOn}
            content={item.content}
            tags={item.tags}
            isPinned={item.isPinned}
            onEdit={() => handleEdit(item)}
            onDelete={() => {}}
            onPinNote={() => {}}
          />
        ))}

        <button
          onClick={() => {
            setOpenAddEditModal({
              isShown: true,
              type: "add",
              data: null,
            });
          }}
          className="fixed bottom-4 right-4 bg-indigo-500 text-white p-4 rounded-lg shadow-lg hover:bg-indigo-800"
        >
          <FaPlus />
        </button>

        <Modal
          isOpen={openAddEditModal.isShown}
          onRequestClose={() => {}}
          style={{
            overlay: {
              backgroundColor: "rgba(0,0,0,0.4)",
            },
          }}
          contentLabel="Add Edit Note Modal"
          className="w-[50%] h-[70%] bg-white rounded-md shadow-lg p-4 overflow-auto mx-auto mt-24"
        >
          <AddEditNotes
            type={openAddEditModal.type}
            noteData={openAddEditModal.data}
            onClose={() => {
              setOpenAddEditModal({
                isShown: false,
                type: "add",
                data: null,
              });
            }}
            getAllNotes={getAllNotes}
          />
        </Modal>
      </div>
    </div>
  );
};

export default Home;
