import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// intitialize
const INTITIAL_STATE = {
  loading: false,
  error: null,
  users: [],
  users: null,
  success:false,
  isUpdated: false,
  isDeleted: false,
  isEmailSent: false,
  isPasswordReset: false,
  profile: {},
  userAuth: {
    error: null,
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
};
//! login Action
export const loginAction = createAsyncThunk(
  "users/login",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    // make request
    try {
      const { data } = await axios.post(
        "http://localhost:9080/api/v1/users/login",
        payload
      );
      //! save the user into local storage
      localStorage.setItem("userInfo", JSON.stringify(data));

      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//! users Slices

const userSlice = createSlice({
  name: "users",
  initialState: INTITIAL_STATE,
  extraReducers: (builder) => {
    //login
    builder.addCase(loginAction.pending, (state, action) => {
      state.loading = true;
    });
    // handle the fulfilled state
    builder.addCase(loginAction.fulfilled, (state, action) => {
      state.userAuth.userInfo = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });
    //* handle the rejection
    builder.addCase(loginAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
  },
});

//! Generate Reducers
const usersReducer = userSlice.reducer;

export default usersReducer;
