import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { fetchCategoriesAction } from "../HomePage/Redux/Slices/Categories/category Slice";
import LoadingComponent from "../Alert/LoadingComponent";
import SuccessMsg from "../Alert/SuccessMsg";
import ErrorMsg from "../Alert/ErrorMessage";
import { ImFeed } from "react-icons/im";
import { uploadProfileImageAction } from "../HomePage/Redux/Slices/Users/usersSlice";

const UploadProfileImage = () => {
  // fetch categories
  const dispatch = useDispatch();
  //! Error Message
  const [errors, setErrors] = useState({});
  // get data from store
  useEffect(() => {}, [dispatch]);

  const { success, loading, error } = useSelector((state) => state?.users);
  //! form data here
  const [formData, setFormData] = useState({
    image: null,
  });
  //1. validate form
  const validateForm = (Data) => {
    let errors = {};

    if (!Data.image) errors.image = "Image is required";
    return errors;
  };
  //2. a handleBlur
  const handleBlur = (e) => {
    const { name, value } = e.target;
    const formErrors = validateForm(formData);
    setErrors({ ...errors, [name]: formErrors[name] });
  };

  //! handle image change
  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // dispatch action
    const errors = validateForm(formData);
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      dispatch(uploadProfileImageAction(formData));
      e.preventDefault();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full lg:w-1/2">
        <div className="flex flex-col items-center p-10 xl:px-24 xl:pb-12 bg-white lg:max-w-xl lg:ml-auto rounded-4xl shadow-2xl">
          <h2 className="mb-4 text-2xl md:text-3xl text-coolGray-900 font-bold text-center">
            Upload Profile Image
          </h2>
          {/* Error here */}
          {error && <ErrorMsg message={error?.message} />}
          {success && <SuccessMsg message="profile uploaded Successfuly" />}
          <h3 className="mb-7 text-base md:text-lg text-coolGray-500 font-medium text-center">
            upload or update profle image
          </h3>

          <label className="mb-4 flex flex-col w-full">
            <span className="mb-1 text-coolGray-800 font-medium">Image</span>
            <input
              className="py-3 px-3 leading-5 w-full text-coolGray-400 font-normal border border-coolGray-200 outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-lg shadow-sm"
              type="file"
              name="image"
              onChange={handleFileChange}
              onBlur={handleBlur}
            />
            {/* error here */}
            {errors?.image && <p className="text-red-500">{errors.image}</p>}
          </label>

          {/* button */}
          {loading ? (
            <LoadingComponent />
          ) : (
            <button
              className="mb-4 inline-block py-3 px-7 w-full leading-6 text-green-50 font-medium text-center bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md"
              type="submit"
            >
              upload
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default UploadProfileImage;
