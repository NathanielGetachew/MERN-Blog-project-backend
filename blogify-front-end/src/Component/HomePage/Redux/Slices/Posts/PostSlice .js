import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { resetErrorAction, resetSuccessAction } from "../Global/globalSlice";



// intitialize
const INTITIAL_STATE = {
  loading: false,
  error: null,
  posts: [],
  post: null,
  success:false,
};

//! Fetch Public posts

export const fetchPublicPostsAction = createAsyncThunk(
    "posts/fetch-public-posts",
    async (payload, { rejectWithValue, getState, dispatch }) => {
      // make request
      try {
        const { data } = await axios.get(
          "http://localhost:9080/api/v1/posts/public",
          
        );
      
        return data;
      } catch (error) {
        return rejectWithValue(error?.response?.data);
      }
    }
  );

  const publicPostSlice = createSlice({
    name: "posts",
    initialState: INTITIAL_STATE,
    extraReducers: (builder) => {
      //fetch public posts
      builder.addCase(fetchPublicPostsAction.pending, (state, action) => {
        state.loading = true;
      });
      // handle the fulfilled state
      builder.addCase(fetchPublicPostsAction.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.success = true;
        state.loading = false;
        state.error = null;
      });
      //* handle the rejection
      builder.addCase(fetchPublicPostsAction.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  
      
      //! Reset Error Action
      builder.addCase(resetErrorAction.fulfilled,(state)=>{
        state.error=null;
      })
  
      //! Reset Success Action
      builder.addCase(resetSuccessAction.fulfilled,(state)=>{
        state.success=false;
      })
  
    },
  });
  
  //! Generate Reducers
  const postReducer = publicPostSlice.reducer;
  
  export default postReducer;
  