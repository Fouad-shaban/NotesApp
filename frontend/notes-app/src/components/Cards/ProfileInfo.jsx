import { gitInitials } from "../../utils/helper";
import PropTypes from 'prop-types';
const ProfileInfo = ({ userInfo, onLogout }) => {
  return (
      userInfo && <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 bg-slate-100 rounded-full px-4 py-2">
          {" "}
          {gitInitials(userInfo.fullName)}
        </div>
        <div>
          <p className="text-black">{userInfo.fullName}</p>
          <button className="text-slate-400 underline" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>
  );
};
ProfileInfo.propTypes = {
  userInfo: PropTypes.shape({
    fullName: PropTypes.string.isRequired,
  }).isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default ProfileInfo;
