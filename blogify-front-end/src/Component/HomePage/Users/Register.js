import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });

  //handle form change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // reset form
    setFormData({
      email: "",
      password: "",
      username: "",
    });
  };

  return (
    <form className="w-full lg:w-1/2">
      <div className="flex flex-col items-center p-10 xl:px-24 xl:pb-12 bg-white lg:max-w-xl lg:ml-auto rounded-4xl shadow-2xl">
        <img
          className="relative -top-2 -mt-16 mb-6 h-16"
          src="flex-ui-assets/logos/flex-circle-green.svg"
          alt
        />
        <h2 className="mb-4 text-2xl md:text-3xl text-coolGray-900 font-bold text-center">
          Join our community
        </h2>
        <h3 className="mb-7 text-base md:text-lg text-coolGray-500 font-medium text-center">
          Lorem ipsum dolor sit amet, consectetur adipisng.
        </h3>
        <label className="mb-4 flex flex-col w-full">
          <span className="mb-1 text-coolGray-800 font-medium">Username</span>
          <input
            className="py-3 px-3 leading-5 w-full text-coolGray-400 font-normal border border-coolGray-200 outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-lg shadow-sm"
            type="text"
            placeholder="Enter your username"
            value={formData.username}
            onChange={handleChange}
            name="username"
          />
        </label>
        <label className="mb-4 flex flex-col w-full">
          <span className="mb-1 text-coolGray-800 font-medium">Email</span>
          <input
            className="py-3 px-3 leading-5 w-full text-coolGray-400 font-normal border border-coolGray-200 outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-lg shadow-sm"
            placeholder="Enter your username"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <label className="mb-4 flex flex-col w-full">
          <span className="mb-1 text-coolGray-800 font-medium">Password</span>
          <input
            className="py-3 px-3 leading-5 w-full text-coolGray-400 font-normal border border-coolGray-200 outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-lg shadow-sm"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            name="password"
          />
        </label>
        <button
          className="mb-4 inline-block py-3 px-7 w-full leading-6 text-green-50 font-medium text-center bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md"
          type="submit"
        >
          Get Started
        </button>
        {/* <div className="flex items-center mb-4 w-full text-xs text-coolGray-400">
          <div className="flex-1 h-px bg-coolGray-100" />
          <span className="px-2 font-medium">OR</span>
          <div className="flex-1 h-px w-24 bg-coolGray-100" />
        </div>
        <a
          className="mb-4 w-full text-coolGray-500 hover:text-coolGray-600 font-medium text-center border border-coolGray-200 hover:border-coolGray-300 rounded-md shadow-sm"
          href="#"
        >
          <div className="flex items-center justify-center py-3 px-3 leading-5">
            <svg
              className="mr-3"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.6025 10.0039C22.5608 9.77329 22.4395 9.56462 22.2597 9.41434C22.0799 9.26405 21.853 9.18169 21.6186 9.18164H12.2002C12.0689 9.1816 11.9388 9.20745 11.8175 9.25769C11.6962 9.30793 11.5859 9.38159 11.493 9.47446C11.4002 9.56732 11.3265 9.67757 11.2763 9.79891C11.226 9.92026 11.2002 10.0503 11.2002 10.1816V14.0498C11.2002 14.1811 11.226 14.3112 11.2763 14.4325C11.3265 14.5539 11.4002 14.6641 11.493 14.757C11.5859 14.8498 11.6962 14.9235 11.8175 14.9737C11.9388 15.024 12.0689 15.0498 12.2002 15.0498H16.1626C15.8803 15.5264 15.4932 15.9324 15.0308 16.2373C14.1856 16.7731 13.2006 17.0464 12.2002 17.0225C11.1627 17.0106 10.1553 16.672 9.3212 16.0549C8.4871 15.4377 7.86873 14.5734 7.55398 13.5847L7.55369 13.583C7.20342 12.5564 7.20342 11.4426 7.55369 10.416L7.55393 10.4143C7.86891 9.42585 8.48736 8.56175 9.32145 7.94479C10.1555 7.32782 11.1628 6.98938 12.2002 6.97754C12.7766 6.96431 13.35 7.06508 13.8873 7.27406C14.4247 7.48304 14.9155 7.79612 15.3315 8.19531C15.5205 8.37587 15.7726 8.47533 16.0339 8.47241C16.2953 8.46949 16.5451 8.36443 16.73 8.17969L19.5981 5.31152C19.6931 5.21662 19.7681 5.10354 19.8184 4.97904C19.8687 4.85454 19.8935 4.72116 19.8911 4.58689C19.8887 4.45262 19.8593 4.3202 19.8046 4.19755C19.7499 4.0749 19.671 3.96453 19.5727 3.87305C17.5769 2.00175 14.936 0.97261 12.2002 0.999999C10.1602 0.993963 8.15897 1.55801 6.42235 2.62854C4.68572 3.69906 3.28272 5.23349 2.37156 7.05878L2.37009 7.06055C1.59761 8.59231 1.19683 10.2845 1.20022 12C1.20265 13.7148 1.60313 15.4057 2.37014 16.9394L2.37161 16.9412C3.28276 18.7665 4.68576 20.3009 6.42237 21.3714C8.15899 22.442 10.1602 23.006 12.2002 23C14.8856 23.068 17.4953 22.1067 19.4949 20.313L19.4956 20.3125L19.4964 20.3117L19.4966 20.3115L19.4967 20.3114C20.5805 19.2688 21.4343 18.011 22.0032 16.6188C22.5722 15.2266 22.8437 13.7309 22.8003 12.2275C22.8008 11.4819 22.7346 10.7378 22.6025 10.0039ZM12.2002 3C14.0713 2.98179 15.8982 3.56854 17.4087 4.67285L15.955 6.126C14.8528 5.36305 13.5406 4.96171 12.2002 4.97754C10.9764 4.98383 9.77645 5.31613 8.72375 5.94022C7.67105 6.56432 6.80368 7.45767 6.21091 8.52832L5.1417 7.69958L4.5567 7.24591C5.36147 5.94375 6.48668 4.8697 7.82486 4.12636C9.16303 3.38301 10.6695 2.99521 12.2002 3ZM3.67966 14.9033C3.04034 13.0206 3.04034 10.9794 3.67966 9.09668L5.46189 10.4785C5.23402 11.4797 5.23402 12.5193 5.46189 13.5205L3.67966 14.9033ZM12.2002 21C10.6694 21.0048 9.16298 20.6169 7.8248 19.8736C6.48661 19.1302 5.36139 18.0561 4.55662 16.7539L4.93503 16.4604L6.21091 15.4707C6.80341 16.5416 7.6707 17.4353 8.72344 18.0596C9.77618 18.6839 10.9763 19.0162 12.2002 19.0225C13.3459 19.0359 14.4785 18.7787 15.5059 18.2717L17.1976 19.585C15.7098 20.5436 13.9697 21.0363 12.2002 21ZM18.7261 18.2393L18.5431 18.0973L17.1657 17.028C17.8879 16.2477 18.3734 15.2782 18.5654 14.2325C18.5923 14.0881 18.587 13.9396 18.55 13.7976C18.5129 13.6555 18.4451 13.5233 18.3512 13.4104C18.2573 13.2975 18.1397 13.2067 18.0068 13.1444C17.8739 13.0821 17.7288 13.0498 17.582 13.0498H13.2002V11.1816H20.749C20.7832 11.5273 20.8003 11.8769 20.8003 12.2275C20.8588 14.4164 20.1218 16.5522 18.726 18.2393H18.7261Z"
                fill="black"
              />
            </svg>
            <span>Sign in with Google</span>
          </div>
        </a>
        <a
          className="mb-4 w-full text-coolGray-500 hover:text-coolGray-600 font-medium text-center border border-coolGray-200 hover:border-coolGray-300 rounded-md shadow-sm"
          href="#"
        >
          <div className="flex items-center justify-center py-3 px-3 leading-5">
            <svg
              className="mr-3"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.9 2H3.1C2.80826 2 2.52847 2.11589 2.32218 2.32218C2.11589 2.52847 2 2.80826 2 3.1V20.9C2 21.0445 2.02845 21.1875 2.08373 21.321C2.13901 21.4544 2.22004 21.5757 2.32218 21.6778C2.42433 21.78 2.54559 21.861 2.67905 21.9163C2.81251 21.9715 2.95555 22 3.1 22H12.68V14.25H10.08V11.25H12.68V9C12.6261 8.47176 12.6885 7.93813 12.8627 7.43654C13.0369 6.93495 13.3188 6.47755 13.6885 6.09641C14.0582 5.71528 14.5068 5.41964 15.0028 5.23024C15.4989 5.04083 16.0304 4.96225 16.56 5C17.3383 4.99521 18.1163 5.03528 18.89 5.12V7.82H17.3C16.04 7.82 15.8 8.42 15.8 9.29V11.22H18.8L18.41 14.22H15.8V22H20.9C21.0445 22 21.1875 21.9715 21.321 21.9163C21.4544 21.861 21.5757 21.78 21.6778 21.6778C21.78 21.5757 21.861 21.4544 21.9163 21.321C21.9715 21.1875 22 21.0445 22 20.9V3.1C22 2.95555 21.9715 2.81251 21.9163 2.67905C21.861 2.54559 21.78 2.42433 21.6778 2.32218C21.5757 2.22004 21.4544 2.13901 21.321 2.08373C21.1875 2.02845 21.0445 2 20.9 2Z"
                fill="#1877F2"
              />
            </svg>
            <span>Sign in with Facebook</span>
          </div>
        </a>
        <a
          className="mb-6 w-full text-coolGray-500 hover:text-coolGray-600 font-medium text-center border border-coolGray-200 hover:border-coolGray-300 rounded-md shadow-sm"
          href="#"
        >
          <div className="flex items-center justify-center py-3 px-3 leading-5">
            <svg
              className="mr-3"
              width={25}
              height={24}
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.4402 5.19C15.8182 4.75428 16.1065 4.24817 16.2884 3.70074C16.4703 3.1533 16.5422 2.57533 16.5002 2C15.3395 2.09369 14.2622 2.63956 13.5002 3.52C13.1353 3.94198 12.8587 4.43288 12.687 4.96364C12.5152 5.49441 12.4517 6.05424 12.5002 6.61C13.0663 6.61472 13.6259 6.4891 14.1358 6.24286C14.6456 5.99662 15.0919 5.63637 15.4402 5.19ZM17.9602 12.63C17.9669 11.8637 18.1687 11.1118 18.5466 10.4452C18.9245 9.77859 19.4661 9.21926 20.1202 8.82C19.7074 8.22524 19.1617 7.73483 18.5264 7.38767C17.8911 7.04052 17.1836 6.84615 16.4602 6.82C14.9002 6.66 13.4602 7.73 12.6302 7.73C11.8002 7.73 10.6302 6.84 9.33016 6.86C8.48028 6.888 7.65218 7.13578 6.9266 7.57919C6.20103 8.02259 5.60276 8.64648 5.19016 9.39C3.43016 12.45 4.74016 17 6.50016 19.47C7.30016 20.68 8.30016 22.05 9.62016 22C10.9402 21.95 11.3702 21.18 12.9002 21.18C14.4302 21.18 14.9002 22 16.2002 21.97C17.5002 21.94 18.4202 20.73 19.2602 19.52C19.8552 18.6415 20.32 17.6816 20.6402 16.67C19.8476 16.332 19.1715 15.7693 18.6952 15.0513C18.2189 14.3333 17.9634 13.4916 17.9602 12.63Z"
                fill="black"
              />
            </svg>
            <span>Sign in with Apple</span>
          </div>
        </a> */}
        <p className="text-sm text-coolGray-400 font-medium text-center">
          <span>Already have an account?</span>
          <Link className="text-green-500 hover:text-green-600" to="/login">
            Sign In
          </Link>
        </p>
      </div>
    </form>
  );
};

export default Register;
