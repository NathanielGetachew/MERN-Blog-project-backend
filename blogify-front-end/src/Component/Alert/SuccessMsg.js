import React from "react"
import Swal from "sweetalert2"
import { resetSuccessAction } from "../HomePage/Redux/Slices/Global/globalSlice"
import { useDispatch } from "react-redux"

const SuccessMsg = ({ message }) => {
    const dispatch = useDispatch();
    Swal.fire({
      icon: "success",
      title: "Good Job",
      text: message,
    });
    dispatch((resetSuccessAction));
  };
export default SuccessMsg;