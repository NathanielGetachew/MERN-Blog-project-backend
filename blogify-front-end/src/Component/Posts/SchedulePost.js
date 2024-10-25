import React, { useState } from "react";
import { FiCalendar } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { schedulePostAction } from "../HomePage/Redux/Slices/Posts/PostSlice ";
import { useParams } from "react-router-dom";
import LoadingComponent from "../Alert/LoadingComponent";
import ErrorMsg from "../Alert/ErrorMessage";
import SuccessMsg from "../Alert/SuccessMsg";

const SchedulePost = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
 const dispatch = useDispatch()
 const {postId} = useParams()
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };
  const {loading,error, success } = useSelector((state)=>state?.posts)

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(schedulePostAction({
      sheduledPublished: selectedDate,
      postId,

    }))
  };

  return (
    <div className="flex items-center justify-center h-screen bg-green-800">
      <div className="bg-white rounded-lg shadow-md p-6 w-96">
        <h1 className="text-2xl font-bold mb-4 text-green-500">
          Date Picker Form
        </h1>
        <p className="mb-6 text-gray-600">
          Please select a date from the date picker below
        </p>
      { error && <ErrorMsg message={error?.message} />}
      {success && <SuccessMsg message="post has been scheduled successfully" />}

        <form onSubmit={handleSubmit}>
          <label htmlFor="date" className="flex items-center mb-4">
            <FiCalendar className="mr-2 text-blue-500" />
            <input
              type="date"
              id="date"
              value={selectedDate}
              onChange={handleDateChange}
              className="border-2 border-blue-500 p-2 rounded-md w-full"
            />
          </label>
          
          {loading? <LoadingComponent/> : <button
          onClick={handleSubmit}
            type="submit"
            className="w-full py-2 px-4 bg-green-500 text-white rounded-md"
          >
            Submit
          </button>}
        </form>
      </div>
    </div>
  );
};

export default SchedulePost;
