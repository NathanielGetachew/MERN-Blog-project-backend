import React, { useState } from "react";

const CommentsList = () => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex space-x-4">
        <div className="flex-none">
          <img
            src="https://via.placeholder.com/50"
            alt="avatar"
            className="rounded-full h-12 w-12"
          />
        </div>
        <div className="flex-grow">
          <div className="bg-blue-50 px-4 py-3 sm:px-6 flex justify-between items-center">
            <div>
              <h4 className="text-sm font-medium text-blue-600">Jane Doe</h4>
              <p className="text-sm text-gray-500">July 14, 2021</p>
            </div>
          </div>
          <div className="bg-blue-50 px-4 py-3 sm:px-6">
            <p className="mt-1 text-sm text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              eget ipsum vitae libero rhoncus congue id id ante. Sed vel est
              ligula. Suspendisse pulvinar sapien at augue hendrerit, vel
              placerat elit iaculis.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentsList;
