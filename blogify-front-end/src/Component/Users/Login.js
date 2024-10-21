import React, { useEffect, useState } from "react";
import {useDispatch,useSelector} from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginAction } from "../HomePage/Redux/Slices/Users/usersSlice";
import LoadingComponent from "../Alert/LoadingComponent";
import ErrorMsg from "../Alert/ErrorMessage";
import SuccessMsg from "../Alert/SuccessMsg";


const Login = () => {
  //! Navigation hook
  const navigate = useNavigate();
//! Dispatch Instance
const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    password: "12345",
    username: "Natty Gech",
  });

        //handle form change
        const handleChange = (e) => {
          setFormData({ ...formData, [e.target.name]: e.target.value });
        };

  //handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    
  //! Dispatch the action
  dispatch(
    loginAction ({
    username:formData.username,
    password:formData.password,
  })
)
    // reset form
    setFormData({
      password: "",
      username: "",
    });
  };
  //store data
 const {userAuth,loading,error,success} = useSelector((state)=> state?.users);
 //! Redirect
 useEffect(()=>{
   if(userAuth?.userInfo?.token){
     navigate("/user-profile");
   }},
   [userAuth?.userInfo?.token]
)

  return (
    <section className="py-16 xl:pb-56 bg-white overflow-hidden">
      <div className="container px-4 mx-auto">
        <div className="text-center max-w-md mx-auto">
          <a className="mb-36 inline-block" href="#">
            <img src="flaro-assets/logos/flaro-logo-black-xl.svg" alt />
          </a>
          <h2 className="mb-4 text-6xl md:text-7xl text-center font-bold font-heading tracking-px-n leading-tight">
            Login to your account
          </h2>
          <p className="mb-12 font-medium text-lg text-gray-600 leading-normal">
            Enter your details below.
          </p>
          {/* Display Error here */}
          { error && <ErrorMsg message= {error?.message}/>}
          {/* Display the success here */}
          { success && <SuccessMsg message= "Logged in Successfully"/>}
          <form onSubmit={handleSubmit}>
            <label className="block mb-5">
              <input
                className="px-4 py-3.5 w-full text-gray-500 font-medium placeholder-gray-500 bg-white outline-none border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300"
                id="signUpInput2-1"
                type="text"
                placeholder="Enter Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </label>

            <label className="block mb-5">
              <input
                className="px-4 py-3.5 w-full text-gray-500 font-medium placeholder-gray-500 bg-white outline-none border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300"
                id="signUpInput2-3"
                type="password"
                placeholder="Enter your Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </label>
            {loading? (<LoadingComponent/>):(<button
              className="mb-8 py-4 px-9 w-full text-white font-semibold border border-indigo-700 rounded-xl shadow-4xl focus:ring focus:ring-indigo-300 bg-indigo-600 hover:bg-indigo-700 transition ease-in-out duration-200"
              type="submit"
            >
              Login Account
            </button>) }

            <p className="font-medium">
              <span className="m-2">Forgot Password?</span>
              <Link
                className="text-indigo-600 hover:text-indigo-700"
                to="/forgot-password"
              >
                Reset Password
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
