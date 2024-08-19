import {configureStore} from "@reduxjs/toolkit";
import usersReducer from "../Slices/Users/usersSlice";
import postReducer from "../Slices/Posts/PostSlice ";
import categoryReducer from "../Slices/Categories/category Slice";

//! store
const store = configureStore({
    reducer:{
        users:usersReducer,
        posts:postReducer,
        categories: categoryReducer,
    },
});

export default store;
