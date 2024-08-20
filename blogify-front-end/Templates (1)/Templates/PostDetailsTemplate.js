import React from "react";

const PostDetailsTemplate = () => {
  return (
    <section
      className="py-16 bg-white md:py-24"
      style={{
        backgroundImage: 'url("flex-ui-assets/elements/pattern-white.svg")',
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center top",
      }}
    >
      <div className="container px-4 mx-auto">
        <div className="mx-auto mb-12 text-center md:max-w-2xl">
          <div className="inline-block px-3 py-1 mb-6 text-xs font-medium leading-5 text-green-500 uppercase bg-green-100 rounded-full shadow-sm">
            Technology
          </div>
          <div className="flex items-center justify-center">
            <p className="inline-block font-medium text-green-500">John Doe</p>
            <span className="mx-1 text-green-500">•</span>
            <p className="inline-block font-medium text-green-500">
              19 Jan 2022
            </p>
          </div>
          <h2 className="mb-4 text-3xl font-bold leading-tight tracking-tighter md:text-5xl text-darkCoolGray-900">
            Lorem ipsum dolor sit amet
          </h2>
          <p className="mb-10 text-lg font-medium md:text-xl text-coolGray-500">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
          <div className="flex items-center justify-center -mx-2 text-left">
            <div className="w-auto px-2">
              <img
                className="w-12 h-12 rounded-full"
                src="https://cdn.pixabay.com/photo/2015/01/08/18/29/entrepreneur-593358_1280.jpg"
                alt
              />
            </div>
            <div className="w-auto px-2">
              <h4 className="text-base font-bold md:text-lg text-coolGray-800">
                John Doe
              </h4>
              <p className="text-base md:text-lg text-coolGray-500">
                12 October 2021
              </p>
            </div>
          </div>
        </div>
      </div>
      <img
        className="w-full mx-auto mb-4 mb-10"
        src="https://cdn.pixabay.com/photo/2023/02/21/20/37/dandelion-7805073_960_720.jpg"
        alt
      />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        {/* Posts stats */}
      </div>
      <div className="container px-4 mx-auto">
        <div className="mx-auto md:max-w-3xl">
          <p className="pb-10 mb-8 text-lg font-medium border-b md:text-xl text-coolGray-500 border-coolGray-100">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            ullamcorper mattis lorem non. Ultrices praesent amet ipsum justo
            massa. Eu dolor aliquet risus gravida nunc at feugiat consequat
            purus. Non massa enim vitae duis mattis. Vel in ultricies vel
            fringilla.
          </p>
          <div className="flex justify-end mb-4">
            <button className="p-2 mr-2 text-gray-500 hover:text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </button>
          </div>
          <h3 className="mb-4 text-2xl font-semibold md:text-3xl text-coolGray-800">
            Add a comment
          </h3>

          {/* Comment form */}
        </div>
      </div>
    </section>
  );
};

export default PostDetailsTemplate;
