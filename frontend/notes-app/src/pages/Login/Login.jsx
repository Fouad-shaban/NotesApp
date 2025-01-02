/* eslint-disable no-unused-vars */
import { useState } from "react";
import Passwordinput from "../../components/Input/Passwordinput";
import Navbar from "../../components/Navbar/Navbar";
import { Link } from "react-router-dom";
import { validateEmail } from "../../utils/helper";

const Login = () => {
const [email,setEmail]=useState('');
const [password,setPassword]=useState('');
const [error,setError]=useState(null);
const handleLogin=async(e)=>{
e.preventDefault();
if(!validateEmail(email)){
  setError('Please enter a valid email');
  return;
}
if(password.length<6){
  setError('Password must be at least 6 characters');
  return;
}
setError(null);
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

            <Passwordinput value={(e)=>setPassword(e.target.value)}/>
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

      {/* <div className='flex justify-center items-center h-screen'>
        <div className='w-96 bg-white p-6 rounded-lg shadow-lg'>
          <form className='space-y-4 mt-6'>
            <div>
              <label htmlFor='email' className='block text-sm font-medium text-gray-700'>Email</label>
              <input type='email' id='email' name='email' className='w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' />
            </div>
            <div>
              <label htmlFor='password' className='block text-sm font-medium text-gray-700'>Password</label>
              <input type='password' id='password' name='password' className='w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' />
            </div>
            <button type='submit' className='w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md shadow-md'>Login</button>
          </form>
        </div>
    </div> */}
    </div>
  );
};

export default Login;
