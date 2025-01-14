import { LuCheck } from "react-icons/lu";
import { MdDeleteOutline } from "react-icons/md";

import PropTypes from 'prop-types';
import { useEffect } from "react";

const ToastMsg = ({ isShown, message, type, onClose }) => {

  useEffect(() => {
    const timeoutId = setTimeout(()=>{
      onClose();
    },3000)
  
    return () => {
      clearTimeout(timeoutId);
    }
  }, [onClose])
  

  return (
    <div className={`absolute top-20 right-6 transition-none duration-300 ${isShown?"opacity-100":"opacity-0"}`}>
      <div className={`min-w-52 bg-white border shadow-2xl rounded-md after:w-[5px] after:h-full ${type === "delete"? "after:bg-red-500":"after:bg-green-500"} after:absolute after:left-0 after:top-0 after:rounded-l-lg`}>
      <div className="flex items-center gap-3 py-2 px-4">
        <div
          className={`w-10 h-10 flex items-center justify-center rounded-full ${
            type === "delete"? "bg-red-100":"bg-green-100"
          }`}
        >
          { type ==="delete"?( <MdDeleteOutline className="text-xl text-red -400"/>): ( <LuCheck className="text-xl text-green-400" />)}
        </div>
        <p className="text-sm text-slate-800">{message}</p>
      </div>
    </div>
    </div>
  );
}
ToastMsg.propTypes = {
  isShown: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ToastMsg;

