import { gitInitials } from "../../utils/helper";
/* eslint-disable react/prop-types */
const ProfileInfo = ({onLogout}) => {
  return (
    <div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 bg-slate-100 rounded-full px-4 py-2"> {gitInitials("fouad shaban")}</div>
          <div>
            <p className="text-black">fouad shaban</p>
            <button className="text-slate-400 underline" onClick={onLogout}>Logout</button> 
          </div>
        
      </div>
    </div>
  );
};

export default ProfileInfo;
