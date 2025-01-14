import NoteCard from "../../components/Cards/NoteCard";
import Navbar from "../../components/Navbar/Navbar";
import { FaPlus } from "react-icons/fa";
import AddEditNotes from "./AddEditNotes";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import ToastMsg from "../../components/ToastMessage/ToastMsg";
import EmptyCard from "../../components/EmptyCard/EmptyCard";
import AddNotesImg from "../../assets/images/addNote.svg";
import NoDataImg from "../../assets/images/noData.svg";

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [showToastMsg, setToastMsg] = useState({
    isShown: false,
    message: "",
    type: "add",
  });

  const [allNotes, setAllNotes] = useState([]);
  const [userInfo, setUserInfo] = useState(" ");

  const [isSearch, setIsSearch] = useState(false);

  const navigate = useNavigate();

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({ isShown: true, data: noteDetails, type: "edit" });
  };

  const showToastMessage = (message, type) => {
    setToastMsg({
      isShown: true,
      message,
      type,
    });
  };

  const handleCloseTostMsg = () => {
    setToastMsg({
      isShown: false,
      message: "",
    });
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

  //Get all Notes
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

  // Delete Notes
  const deleteNote = async (noteData) => {
    try {
      const noteId = noteData._id;
      const response = await axiosInstance.delete("delete-note/" + noteId);
      if (response.data && !response.data.error) {
        showToastMessage("Note Deleted Successfully", "delete");
        getAllNotes();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        console.log(`${error}An unexpected error occurred. Please try again.`);
      }
    }
  };

  //Search Note
  const onSearchNote = async (query) => {
    try {
      const response = await axiosInstance.get("/search-notes", {
        params: { query },
      });
      if (response.data && response.data.notes) {
        setAllNotes(true);
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateIsPinned = async (noteData) => {
    const noteId = noteData._id;
    try {
      const response = await axiosInstance.put("update-note-pinned/" + noteId, {
        isPinned: noteId.isPinned,
      });
      if (response.data && response.data.note) {
        showToastMessage("Note Updated Successfully");
        getAllNotes();
        
      }
    } catch (error) {
      console.log(error)
    }
  };

  const handleClearSearch = () => {
    setIsSearch(false);
    getAllNotes();
  };
  useEffect(() => {
    getAllNotes();
    getUserInfo();
    return () => {};
  }, []);

  return (
    <div>
      <Navbar
        userInfo={userInfo}
        onSearchNote={onSearchNote}
        handleClearSearch={handleClearSearch}
      />
      <div className="container mx-auto">
        {allNotes.length > 0 ? (
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
                onDelete={() => deleteNote(item)}
                onPinNote={() => updateIsPinned(item)}
              />
            ))}
          </div>
        ) : (
          <EmptyCard
            imgSrc={!isSearch ? NoDataImg : AddNotesImg}
            message={
              !isSearch
                ? `Oops! No Notes `
                : `Start creating your first note! Click the 'Add' button jot down your Thoughts, Ideas, and Reminders. Lets get Started`
            }
          />
        )}

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
            showToastMessage={showToastMessage}
          />
        </Modal>
      </div>
      <ToastMsg
        isShown={showToastMsg.isShown}
        message={showToastMsg.message}
        type={showToastMsg.type}
        onClose={handleCloseTostMsg}
      />
    </div>
  );
};

export default Home;
