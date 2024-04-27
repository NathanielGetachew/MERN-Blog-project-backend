import {configureStore} from "@reduxjs/toolkit";
import usersReducer from "../Slices/Users/usersSlice";

//! store
const store = configureStore({
    reducer:{
        users:usersReducer
    },
});

export default store;
