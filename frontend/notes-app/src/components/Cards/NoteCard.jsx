/* eslint-disable react/prop-types */
import moment from "moment";
import { MdOutlinePushPin, MdCreate, MdDelete } from "react-icons/md";

const NoteCard = ({
  title,
  date,
  content,
  tags,
  isPinned,
  onEdit,
  onDelete,
  onPinNote,
}) => {
  return (
    <div>
      <div className=" bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition duration-300 h-full">
        <div>
            <div className="flex justify-self-start">
          <MdOutlinePushPin
            className={` icon-btn  ${
                isPinned ? "text-indigo-800" : "text-slate-400"
            }`}
            onClick={onPinNote}
            />
            <h6 className={`font-bold text-lg ${isPinned?"text-indigo-500":"text-black"} `}>{title} </h6>
            </div>
        </div>
        <span className="text-xs text-gray-500">{moment(date).format('Do MMM YYYY')}</span>
        <p className="text-gray-600 text-sm mt-2 overflow-hidden">
          {content?.slice(0, 60)}
        </p>
        <div>
          <span className="text-xs text-gray-400">{tags.map((item)=>`#${item}`)}</span>
        </div>
        <div className="flex justify-end gap-4">
          <MdCreate
            className="item-btn hover:text-indigo-400"
            onClick={onEdit}
          />
          <MdDelete
            className="item-btn hover:text-red-500"
            onClick={onDelete}
          />
        </div>
        </div>
      </div>

  );
};

export default NoteCard;
