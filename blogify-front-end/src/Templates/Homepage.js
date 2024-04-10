import React from "react";

const Homepage = () => {
  return (
    <div>
      <section
        className="relative bg-white overflow-hidden"
        style={{
          backgroundImage: 'url("flex-ui-assets/elements/pattern-white.svg")',
          backgroundPosition: "center",
        }}
      >
        <div className="bg-transparent">
          <div className="navbar-menu hidden fixed top-0 left-0 z-50 w-full h-full bg-coolGray-900 bg-opacity-50">
            <div className="fixed top-0 left-0 bottom-0 w-full w-4/6 max-w-xs bg-white">
              <a className="navbar-close absolute top-5 p-4 right-3" href="#">
                <svg
                  width={12}
                  height={12}
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.94004 6L11.14 1.80667C11.2656 1.68113 11.3361 1.51087 11.3361 1.33333C11.3361 1.1558 11.2656 0.985537 11.14 0.860002C11.0145 0.734466 10.8442 0.66394 10.6667 0.66394C10.4892 0.66394 10.3189 0.734466 10.1934 0.860002L6.00004 5.06L1.80671 0.860002C1.68117 0.734466 1.51091 0.663941 1.33337 0.663941C1.15584 0.663941 0.985576 0.734466 0.860041 0.860002C0.734505 0.985537 0.66398 1.1558 0.66398 1.33333C0.66398 1.51087 0.734505 1.68113 0.860041 1.80667L5.06004 6L0.860041 10.1933C0.797555 10.2553 0.747959 10.329 0.714113 10.4103C0.680267 10.4915 0.662842 10.5787 0.662842 10.6667C0.662842 10.7547 0.680267 10.8418 0.714113 10.9231C0.747959 11.0043 0.797555 11.078 0.860041 11.14C0.922016 11.2025 0.99575 11.2521 1.07699 11.2859C1.15823 11.3198 1.24537 11.3372 1.33337 11.3372C1.42138 11.3372 1.50852 11.3198 1.58976 11.2859C1.671 11.2521 1.74473 11.2025 1.80671 11.14L6.00004 6.94L10.1934 11.14C10.2554 11.2025 10.3291 11.2521 10.4103 11.2859C10.4916 11.3198 10.5787 11.3372 10.6667 11.3372C10.7547 11.3372 10.8419 11.3198 10.9231 11.2859C11.0043 11.2521 11.0781 11.2025 11.14 11.14C11.2025 11.078 11.2521 11.0043 11.286 10.9231C11.3198 10.8418 11.3372 10.7547 11.3372 10.6667C11.3372 10.5787 11.3198 10.4915 11.286 10.4103C11.2521 10.329 11.2025 10.2553 11.14 10.1933L6.94004 6Z"
                    fill="#556987"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="relative py-20 xl:pt-16 xl:pb-24">
          <div className="container px-4 mx-auto">
            <div className="flex flex-wrap items-center">
              <div className="w-full lg:w-1/2 mb-20 lg:mb-0">
                <span className="inline-block py-px px-2 mb-4 text-xs leading-5 text-white bg-green-500 font-medium uppercase rounded-9xl">
                  Header
                </span>
                <h1 className="mb-6 text-3xl md:text-5xl lg:text-6xl leading-tight text-coolGray-900 font-bold tracking-tight">
                  A small business is only as good as its tools.
                </h1>
                <p className="mb-8 text-lg md:text-xl leading-7 text-coolGray-500 font-medium">
                  Lorem ipsum dolor sit amet, consectetur adipisng.
                </p>
                <ul>
                  <li className="mb-6 flex items-center">
                    <img
                      className="mr-3"
                      src="flex-ui-assets/elements/checkbox-green.svg"
                    />
                    <p className="text-lg md:text-xl leading-7 text-coolGray-500 font-medium">
                      Lorem ipsum dolor sit amet, consectetur adipisng.
                    </p>
                  </li>
                  <li className="mb-6 flex items-center">
                    <img
                      className="mr-3"
                      src="flex-ui-assets/elements/checkbox-green.svg"
                    />
                    <p className="text-lg md:text-xl leading-7 text-coolGray-500 font-medium">
                      Suspendisse mollis tincidunt
                    </p>
                  </li>
                  <li className="flex items-center">
                    <img
                      className="mr-3"
                      src="flex-ui-assets/elements/checkbox-green.svg"
                    />
                    <p className="text-lg md:text-xl leading-7 text-coolGray-500 font-medium">
                      Praesent varius justo vel justo pulvinar
                    </p>
                  </li>
                </ul>
              </div>
              {/* Register Form */}
              <Register />
            </div>
          </div>
        </div>
      </section>
      {/* Home posts list */}
      {/* <HomePostsLists /> */}
    </div>
  );
};

export default Homepage;
