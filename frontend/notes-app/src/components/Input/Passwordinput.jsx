import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

// eslint-disable-next-line react/prop-types
const Passwordinput = ({ onchange, placeholder, value }) => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="flex items-center bg-transparent  border px-2 border-gray-300 rounded-md shadow-sm ">
      <input
        type={showPassword ? "text" : "password"}
        onChange={onchange}
        placeholder={placeholder || "Password"}
        value={value}
        className="w-full px-3 py-2 mt-1  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
      {showPassword ? (
        <FaRegEye
          size={22}
          onClick={() => {
            togglePassword();
          }}
          className="cursor-pointer"
        />
      ) : (
        <FaRegEyeSlash
          size={22}
          onClick={() => {
            togglePassword();
          }}
          className="cursor-pointer text-gray-400"
        />
      )}
    </div>
  );
};

export default Passwordinput;
