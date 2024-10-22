import React, { useState } from "react";
import { AiOutlineUser, AiOutlineMail } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "tailwindcss/tailwind.css";
import { updateUserProfileAction } from "../HomePage/Redux/Slices/Users/usersSlice";
import SuccessMsg from "../Alert/SuccessMsg";
import LoadingComponent from "../Alert/LoadingComponent";
import ErrorMsg from "../Alert/ErrorMessage";


const UpdateUser = () => {
// get the reset token from the params
const {token} = useParams();

//! Dispatch Instance
const dispatch = useDispatch();
const [formData, setFormData] = useState({
  username: "",
  email: "",
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
    updateUserProfileAction({
      username: formData.username,
      email: formData.email,
    })
  );
  //reset form
  setFormData({
    username: "",
    email:""
  });
};

//store data
const { loading, error, success } = useSelector((state) => state?.users);

  return (
    <form
    onSubmit={handleSubmit}
     className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="w-96 p-6 bg-white rounded-xl shadow-md">
     <h1 className="text-3xl font-bold text-gray-700 text-center mb-6">
          Update your Profile
        </h1>
        {success && (
          <SuccessMsg message="user profile update successfully" />
        )}

        {error && <ErrorMsg message={error.message} />}


        <div className="mb-4 relative">
          <AiOutlineUser className="absolute text-gray-500 text-2xl top-2 left-2" />
          <input
            name="username"
            value={formData.username}
            onChange={handleChange}
            type="text"
            placeholder="Update your username"
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-6 relative">
          <AiOutlineMail className="absolute text-gray-500 text-2xl top-2 left-2" />
          <input
           name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Update your email"
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        {loading ? ( <LoadingComponent/>):(<button className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none">
          Update Profile
        </button>)}
      </div>
    </form>
  );
};

export default UpdateUser;
