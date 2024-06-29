import {configureStore} from "@reduxjs/toolkit";
import usersReducer from "../Slices/Users/usersSlice";
import postReducer from "../Slices/Posts/PostSlice ";


//! store
const store = configureStore({
    reducer:{
        users:usersReducer,
        posts:postReducer
    },
});

export default store;
