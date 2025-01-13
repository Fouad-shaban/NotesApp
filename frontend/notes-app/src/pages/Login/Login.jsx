/* eslint-disable no-unused-vars */
import { useState } from "react";
import Passwordinput from "../../components/Input/Passwordinput";
import Navbar from "../../components/Navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance.js";

const Login = () => {
const [email,setEmail]=useState('');
const [password,setPassword]=useState('');
const [error,setError]=useState(null);

const navigate = useNavigate()


const handleLogin=async(e)=>{
e.preventDefault();

if(!validateEmail(email)){
  setError('Please enter a valid email');
  return;
}
if(!password){
  setError('Please enter the password');
  return;
}
setError("");

try {
  const response = await axiosInstance.post("/login",{
    email:email,
    password:password
  });
  if(response.data && response.data.accessToken){
    localStorage.setItem("token", response.data.accessToken);
    navigate('/dashboard');
  }
} catch (error) {
  if (error.response) {
    // أخطاء الخادم
    if (error.response.status === 401) {
      setError("Invalid email or password. Please try again.");
    } else if (error.response.status === 500) {
      setError("Server error. Please try again later.");
    } else if (error.response.data && error.response.data.message) {
      setError(error.response.data.message); // رسالة الخطأ المرسلة من الخادم
    }else if (error.message === "Network Error") {
      // أخطاء الشبكة
      setError("Unable to connect to the server. Please check your connection.");
    } else {
      setError(`Unexpected error: ${error.response.status}`);
    }
  }else{
    setError(`An unexpected error occurred. Please try again.`)
  }
}
}



  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center h-screen">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={handleLogin} className="flex flex-col space-y-4 ">
            <h4 className="text-xl font-medium text-gray-800">Login</h4>
            <input
              type="text"
              placeholder="Email"
              className="w-full px-5 py-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />

            <Passwordinput value={password} onchange={(e)=>setPassword(e.target.value)}/>
              {error && <p className="text-red-500">{error}</p>}
            <button
              type="submit"
              className="bg-indigo-500 hover:bg-slate-100 hover:text-indigo-500 transition duration-500 text-white w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm  sm:text-sm "
            >
              Login
            </button>
            <p className="pt-2">
              Not register yet?{" "}
              <Link to="/signup" className="text-indigo-500">
                Create an Account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
