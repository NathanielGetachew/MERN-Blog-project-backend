import React, { useState } from "react";
import { FiCalendar } from "react-icons/fi";

const SchedulePostTemp = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Selected Date: ${selectedDate}`);
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
          <button
            type="submit"
            className="w-full py-2 px-4 bg-green-500 text-white rounded-md"
          >
            Submit
          </button>
          <button className="flex items-center px-6 py-1 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-700 transition-colors duration-300 ease-in-out">
            <FiCalendar className="mr-2" /> Schedule Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default SchedulePostTemp;
