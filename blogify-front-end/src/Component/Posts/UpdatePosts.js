import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { fetchCategoriesAction } from "../HomePage/Redux/Slices/Categories/category Slice";
import {updatePostAction} from "../HomePage/Redux/Slices/Posts/PostSlice ";
import LoadingComponent from "../Alert/LoadingComponent";
import SuccessMsg from "../Alert/SuccessMsg";
import ErrorMsg from "../Alert/ErrorMessage";
import { ImFeed } from "react-icons/im";
import { useParams } from "react-router-dom";

const UpdatePost = () => {

//! get the post id from the params
  const {postId} = useParams();
 



  // fetch categories
  const dispatch = useDispatch();
  //! Error Message
  const [errors, setErrors] = useState({});
  // get data from store
  const { categories } = useSelector((state) => state?.categories);

  const options = categories?.categories?.map((category) => {
    return {
      value: category?._id,
      label: category?.name,
    };
  });
  // get post from the store
  const { post, error, loading, success } = useSelector(
    (state) => state?.posts
  );

  useEffect(() => {
    dispatch(fetchCategoriesAction());
  }, [dispatch]);
  //! form data here

  const [formData, setFormData] = useState({
    title: "",
    image: null,
    category: null,
    content: "",
  });
  //1. validate form
  const validateForm = (Data) => {
    let errors = {};
    if (!Data.title) errors.title = "Title is required";
    if (!Data.image) errors.image = "Image is required";
    if (!Data.category) errors.category = "Category is required";
    if (!Data.content) errors.content = "Content is required";
    return errors;
  };
 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  //! React Select handel change
  const handleSelectChange = (selectedOption) => {
    setFormData({ ...formData, category: selectedOption.value });
  };
  //! handle image change
  const handleFileChange = (e) => {
    console.log(e);
    setFormData({ ...formData, image: e.target.files[0] });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // dispatch action
    
  dispatch(updatePostAction({...formData, postId}));
      e.preventDefault();

      setFormData({
        title: "",
        image: null,
        category: null,
        content: "",
      });
    
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full lg:w-1/2">
        <div className="flex flex-col items-center p-10 xl:px-24 xl:pb-12 bg-white lg:max-w-xl lg:ml-auto rounded-4xl shadow-2xl">
          <h2 className="mb-4 text-2xl md:text-3xl text-coolGray-900 font-bold text-center">
            Update Post
          </h2>
          {/* Error here */}
          {error && <ErrorMsg message={error?.message} />}
          {success && <SuccessMsg message="Post updated Successfuly" />}
          <h3 className="mb-7 text-base md:text-lg text-coolGray-500 font-medium text-center">
            Share your thoughts and ideas with the community
          </h3>
          <label className="mb-4 flex flex-col w-full">
            <span className="mb-1 text-coolGray-800 font-medium">Title</span>
            <input
              className="py-3 px-3 leading-5 w-full text-coolGray-400 font-normal border border-coolGray-200 outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-lg shadow-sm"
              type="text"
              placeholder="Enter the post title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              
            />
            
          </label>
          <label className="mb-4 flex flex-col w-full">
            <span className="mb-1 text-coolGray-800 font-medium">Image</span>
            <input
              className="py-3 px-3 leading-5 w-full text-coolGray-400 font-normal border border-coolGray-200 outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-lg shadow-sm"
              type="file"
              name="image"
              onChange={handleFileChange}
          
            />
            
          </label>
          {/* category here */}
          <label className="mb-4 flex flex-col w-full">
            <span className="mb-1 text-coolGray-800 font-medium">category</span>
            <Select
              options={options}
              name="category"
              onChange={handleSelectChange}
              
            />
            
          </label>

          <label className="mb-4 flex flex-col w-full">
            <span className="mb-1 text-coolGray-800 font-medium">Content</span>
            <textarea
              className="py-3 px-3 leading-5 w-full text-coolGray-400 font-normal border border-coolGray-200 outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-lg shadow-sm"
              placeholder="Write your post content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              
            />
            
          </label>

          {/* button */}
          {loading ? (
            <LoadingComponent />
          ) : (
            <button
              className="mb-4 inline-block py-3 px-7 w-full leading-6 text-green-50 font-medium text-center bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md"
              type="submit"
            >
              Update
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default UpdatePost;
