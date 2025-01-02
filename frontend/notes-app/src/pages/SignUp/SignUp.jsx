import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Passwordinput from "../../components/Input/Passwordinput";
import { Link } from "react-router-dom";
import { validateEmail } from "../../utils/helper";

const SignUp = () => {
  const [name , setName]= useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [error,setError]=useState(null);

  const handleSignUp = async (e) => { 
    e.preventDefault();
    if(name.length<3){
      setError('Name must be at least 3 characters');
      return;
    }
    if(!validateEmail(email)){
      setError('Please enter a valid email');
      return;
    }
    if(password.length<6){
      setError('Password must be at least 6 characters');
      return;
    }

  };
  return (
    <div>
      <Navbar  />
      <div className="flex justify-center items-center h-screen">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={handleSignUp} className="flex flex-col space-y-4 ">
            <h4 className="text-xl font-medium text-gray-800">Sign UP </h4>
            <input
              type="text"
              placeholder="User Name"
              className="w-full px-5 py-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={name}
              onChange={(e)=>setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Email"
              className="w-full px-5 py-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
             <Passwordinput  value={(e)=>setPassword(e.target.value)}/>
             {error && <p className="text-red-500">{error}</p>}
             
             <button
              type="submit"
              className="bg-indigo-500 hover:bg-slate-100 hover:text-indigo-500 transition duration-500 text-white w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm  sm:text-sm "
            >
              Login
            </button>
            <p className="pt-2">
            Already have an Account !!{" "}
              <Link to="/login" className="text-indigo-500">
                Login
              </Link>
            </p>
          
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
