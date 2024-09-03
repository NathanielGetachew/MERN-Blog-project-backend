import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import axios from "axios";
import { 
     resetErrorAction,
     resetSuccessAction,
} from "../Global/globalSlice"

// initial state
const INITIAL_STATE = {
    loading: false,
    error: null,
    comments: [],
    comment:null,
    success:false, 
};
 
// ! update post
export const createCommentAction = createAsyncThunk(
    "comment/create",
    async (payload, { rejectWithValue, getState, dispatch }) => {
      try {
        
        const token = getState().users?.userAuth?.userInfo?.token;
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await axios.post(
          `http://localhost:9080/api/v1/comments/${payload?.postId}`,
         {
            message: payload?.message
        },
          config
        );
        return data;
      } catch (error) {
        return rejectWithValue(error?.response?.data);
      }
    }
  );
  
  const commentSlice = createSlice({
    name: "comments",
    initialState: INITIAL_STATE,
    extraReducers: (builder) => {
      //! create comments
      builder.addCase(createCommentAction.pending, (state, action) => {
        state.loading = true;
      });
      // handle the fulfilled state
      builder.addCase(createCommentAction.fulfilled, (state, action) => {
        state.comment = action.payload;
       state.loading = false;
        state.error = null;
        state.success = true;
      });
      //* handle the rejection
      builder.addCase(createCommentAction.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  
  
  
      //! Reset Error Action
      builder.addCase(resetErrorAction.fulfilled, (state) => {
        state.error = null;
      });
  
      //! Reset Success Action
      builder.addCase(resetSuccessAction.fulfilled, (state) => {
        state.success = false;
      });
    },
  });
  
  
  
  
  
  //! Generate Reducers
  const commentReducer = commentSlice.reducer; 
  
  export default commentReducer;