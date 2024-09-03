import React, { useEffect, useState } from "react";
import CommentsList from "./CommentsList";
import { useDispatch, useSelector } from "react-redux";
import { createCommentAction } from "../HomePage/Redux/Slices/Comments/commentsSlice";
import PostDetails from "../Posts/PostDetails";


const AddComment = ( {postId,comments}) => {
  //! form data here

  const [formData, setFormData] = useState({
    message: "",
  });
const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(createCommentAction({...formData, postId}));

  };
//! get the comment from the store
const {success} = useSelector((state)=>state?.comments);
//reload
useEffect(() => {
if(success){
  window.location.reload();
}
},[dispatch,success])
// ! handle change
 const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  

  return (
    <div className="bg-white rounded shadow">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium leading-6 text-blue-600">
          Comments
        </h3>
        <div className="mt-5">
       
          <hr className="mt-5 border-gray-300" />
          <form className="mt-4" onSubmit={handleSubmit}>
            <div className="flex space-x-4">
              <div className="flex-none">
                <img
                  src="https://via.placeholder.com/50"
                  alt="avatar"
                  className="w-12 h-12 rounded-full"
                />
              </div>
              <div className="flex-grow">
                <div className="border rounded-lg shadow-sm">
                  <div className="p-3 border-b bg-gray-50">
                    <h4 className="text-sm font-medium text-blue-600">
                      Add a comment
                    </h4>
                  </div>
                  <div className="p-3">
                    <label htmlFor="comment" className="sr-only">
                      Comment
                    </label>
                    <textarea
                      id="comment"
                      rows={3}
                      className="block w-full mt-1 border-gray-300 rounded-md shadow-sm form-textarea focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                      placeholder="Your comment"
                      value={
                        formData.message
                      }
                      onChange={handleChange}
                      name="message"
                      defaultValue={""}
                    />
                  </div>
                  <div className="flex items-center justify-end px-3 py-2 rounded-b-lg bg-gray-50">
                    <button
                      type="submit"
                      className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
         {/* comment lists */}
         <CommentsList comments={comments}/>
    </div>
  );
};

export default AddComment;
