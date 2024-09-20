import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { resetErrorAction, resetSuccessAction } from "../Global/globalSlice";




// intitialize
const INTITIAL_STATE = {
  loading: false,
  error: null,
  users: [],
  user: null,
  success:false,
  profile: {},
  userAuth: {
    error: null,
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
};
//! Register user Action
export const registerAction = createAsyncThunk(
  "users/register",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    // make request
    try {
      const { data } = await axios.post(
        "http://localhost:9080/api/v1/users/register",
        payload
      );
    
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//! block use aciton
export const blockUserAction = createAsyncThunk(
  "users/block-user",
  async (userId, { rejectWithValue, getState, dispatch }) => {
    // make request
    try {
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.put(
       `http://localhost:9080/api/v1/users/block/${userId}`,
       {},
       config,
        
      );
    
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//! get user public profile
export const publicProfileAction = createAsyncThunk(
  "users/public-profile",
  async (userId, { rejectWithValue, getState, dispatch }) => {
    // make request
    try {
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(
       `http://localhost:9080/api/v1/users/public-profile/${userId}`,config,
        
      );
    
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

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
//! logout action
export const logoutAction = createAsyncThunk("users/logout",async()=>{
  // remove token from the localstorage
  localStorage.removeItem("userInfo");
  return true;
})

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

    //Rgister
    builder.addCase(registerAction.pending, (state, action) => {
      state.loading = true;
    });
    // handle the fulfilled state
    builder.addCase(registerAction.fulfilled, (state, action) => {
      state.user = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });
    //* handle the rejection
    builder.addCase(registerAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    //user blocking slice
    builder.addCase(blockUserAction.pending, (state, action) => {
      state.loading = true;
    });
    // handle the fulfilled state
    builder.addCase(blockUserAction.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });
    //* handle the rejection
    builder.addCase(blockUserAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
     

     //get public profile
     builder.addCase(publicProfileAction.pending, (state, action) => {
      state.loading = true;
    });
    // handle the fulfilled state
    builder.addCase(publicProfileAction.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });
    //* handle the rejection
    builder.addCase(publicProfileAction.rejected, (state, action) => {
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
const usersReducer = userSlice.reducer;

export default usersReducer;
