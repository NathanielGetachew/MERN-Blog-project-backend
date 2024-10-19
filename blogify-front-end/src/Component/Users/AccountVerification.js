import { useEffect } from "react";
import { FiCheckCircle } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { VerifyAccAction } from "../HomePage/Redux/Slices/Users/usersSlice";
export default function AccountVerification() {
  //! get the token from the url
  const {token} = useParams();
  const dispatch = useDispatch();
  const {loading,error,isVerified,} = useSelector((state)=>state?.users)
  useEffect(()=>{
    if(token && !isVerified){
      dispatch(VerifyAccAction(token))
    }
    else{
      console.log("no token")
    }
  },[dispatch, token])      
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <FiCheckCircle className="text-green-500 text-9xl" />
        <h1 className="mt-4 text-3xl font-bold text-gray-700">
          Account Verified!
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          Thank you for verifying your email address. You may now proceed to
          login.
        </p>
        <button className="mt-8 px-8 py-3 text-white bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none">
          Log in
        </button>
      </div>
    </>
  );
}
