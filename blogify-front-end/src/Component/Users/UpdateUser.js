import React, { useState } from "react";
import { AiOutlineUser, AiOutlineMail } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "tailwindcss/tailwind.css";


const UpdateUser = () => {
// get the reset token from the params
const {token} = useParams();

//! Dispatch Instance
const dispatch = useDispatch();
const [formData, setFormData] = useState({
  password: "",
});

//handle form change
const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};

//handle form submit
const handleSubmit = (e) => {
  e.preventDefault();

  //! Dispatch the action
  // dispatch(
  //   PasswordResetAction({
  //     password: formData.password,
  //     resetToken: token,
  //   })
  // );
  // reset form
  setFormData({
    password: "",
  });
};

//store data
const { loading, error, success } = useSelector((state) => state?.users);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="w-96 p-6 bg-white rounded-xl shadow-md">
        <h1 className="text-3xl font-bold text-gray-700 text-center mb-6">
          Update your Profile
        </h1>
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
        <button className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none">
          Update Profile
        </button>
      </div>
    </div>
  );
};

export default UpdateUser;
