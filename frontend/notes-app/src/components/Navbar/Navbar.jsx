import { useState } from "react";
import PropTypes from 'prop-types';
import ProfileInfo from "../Cards/ProfileInfo";
import SearchBar from "../SearchBar/SearchBar";
import { useNavigate } from "react-router-dom";

const Navbar = ({userInfo }) => {
  const [search, setSearch] = useState("");

  const navigate = useNavigate() ;

  const onLogout = () => {
    localStorage.clear();
    navigate('/login')
  };
  const handleSearch = () => {}
const onClearSearch = () => {
  setSearch('')
}

  return (
    <div className="bg=white flex items-center justify-between px-6 py2=-2 drop-shadow">
      <h2 className="text-xl font-medium text-black py-2">Notes App</h2>
      <SearchBar
        value={search}
        onChange={({ target }) => {
          setSearch(target.value);
        }}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}
      />
      <div className="flex items-center space-x-4">
        <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
      </div>
    </div>
  );
};
Navbar.propTypes = {
  userInfo: PropTypes.object.isRequired,
};

export default Navbar;
