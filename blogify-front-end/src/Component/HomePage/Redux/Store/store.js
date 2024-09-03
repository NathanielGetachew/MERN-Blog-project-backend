import {configureStore} from "@reduxjs/toolkit";
import usersReducer from "../Slices/Users/usersSlice";
import postReducer from "../Slices/Posts/PostSlice ";
import categoryReducer from "../Slices/Categories/category Slice";
import commentReducer from "../Slices/Comments/commentsSlice";

//! store
const store = configureStore({
    reducer:{
        users:usersReducer,
        posts:postReducer,
        categories: categoryReducer,
        comments: commentReducer,
    },
});

export default store;
