import React, { useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { forgotPasswordAction } from "../HomePage/Redux/Slices/Users/usersSlice";
import LoadingComponent from "../Alert/LoadingComponent";
import SuccessMsg from "../Alert/SuccessMsg";

const PasswordResetRequest = () => {

 //! Dispatch Instance
const dispatch = useDispatch();
const [formData, setFormData] = useState({
  email:"",
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
  forgotPasswordAction ({
  email:formData.email,
  
})
)
  // reset form
  setFormData({
    email:"",
  });
};

  //store data
  const {loading,error,isEmailSent,emailMessage
  } = useSelector((state)=> state?.users);

  return (
    <form 
    onSubmit={handleSubmit}
    className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      
      <div className="w-96 p-6 bg-white rounded-xl shadow-md">
        <h1 className="text-3xl font-bold text-gray-700 text-center mb-6">
          Reset your password
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Enter your email address and we'll send you a link to reset your
          password.
        </p>
        {error && (<p className="text-red-600 text-center mb-6">
         {error.message}
        </p>)
        }
        {/* show succes message */}
     {isEmailSent && <p className="text-green-600 text-center mb-6">{emailMessage.message}</p> }            
        <div className="mb-6 relative">
          <AiOutlineMail className="absolute text-gray-500 text-2xl top-2 left-2" />
          <input
          name="email"
          value={formData.email}
          onChange={handleChange}
            type="email"
            placeholder="Enter your email"
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        {loading? <LoadingComponent/> : <button className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none">
          Send reset link
        </button> }
      </div>
    </form>
  );
};

export default PasswordResetRequest;
