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
export const UnblockUserAction = createAsyncThunk(
  "users/unblock-user",
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
       `http://localhost:9080/api/v1/users/unblock/${userId}`,
       {},
       config,
        
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

//! get user private profile
export const privateProfileAction = createAsyncThunk(
  "users/private-profile",
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
       `http://localhost:9080/api/v1/users/profile/`,config,
        
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

//!Follow User Action
export const followUserAction = createAsyncThunk(
  "users/follow-user",
  async (userId, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        `http://localhost:9080/api/v1/users/Following/${userId}`,
        {},
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//!UnFollow User Action
export const unFollowUserAction = createAsyncThunk(
  "users/unfollow-user",
  async (userId, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        `http://localhost:9080/api/v1/users/UnFollowing/${userId}`,
        {},
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// ! upload cover image
export const uploadCoverImageAction = createAsyncThunk(
  "users/upload-cover-image",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      //convert the payload to formdata
      const formData = new FormData();
      formData.append("file", payload?.image);

      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        `http://localhost:9080/api/v1/users/upload-cover-image`,
        formData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);



// ! upload profile image
export const uploadProfileImageAction = createAsyncThunk(
  "users/upload-profile-image",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      //convert the payload to formdata
      const formData = new FormData();
      formData.append("file", payload?.image);
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        `http://localhost:9080/api/v1/users/upload-profile-image`,
        formData,
        config
      );
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

    //user unblocking slice
    builder.addCase(UnblockUserAction.pending, (state, action) => {
      state.loading = true;
    });
    // handle the fulfilled state
    builder.addCase(UnblockUserAction.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });
    //* handle the rejection
    builder.addCase(UnblockUserAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
     

     

     //get public profile
     builder.addCase(publicProfileAction.pending, (state, action) => {
      state.loading = true;
    });
    // handle the fulfilled state
    builder.addCase(publicProfileAction.fulfilled, (state, action) => {
      state.user = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });
    //* handle the rejection
    builder.addCase(publicProfileAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

     //get private profile
     builder.addCase(privateProfileAction.pending, (state, action) => {
      state.loading = true;
    });
    // handle the fulfilled state
    builder.addCase(privateProfileAction.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });
    //* handle the rejection 
    builder.addCase(privateProfileAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });


  //! upload user profile image
   builder.addCase(uploadProfileImageAction.pending, (state, action) => {
    state.loading = true;
  });
  builder.addCase(uploadProfileImageAction.fulfilled, (state, action) => {
    state.profile = action.payload;
    state.isProfileImgUploaded = true;
    state.loading = false;
    state.error = null;
  });
  builder.addCase(uploadProfileImageAction.rejected, (state, action) => {
    state.error = action.payload;
    state.loading = false;
    state.isProfileImgUploaded = false;
  });


  //! upload user cover image
  builder.addCase(uploadCoverImageAction.pending, (state, action) => {
    state.loading = true;
  });
  builder.addCase(uploadCoverImageAction.fulfilled, (state, action) => {
    state.profile = action.payload;
    state.isCoverImageUploaded = true;
    state.loading = false;
    state.error = null;
  });
  builder.addCase(uploadCoverImageAction.rejected, (state, action) => {
    state.error = action.payload;
    state.loading = false;
    state.isCoverImageUploaded = false;
  });

    //! Reset Error Action
    builder.addCase(resetErrorAction.fulfilled,(state)=>{
      state.error=null;
    })

    //! Reset Success Action
    builder.addCase(resetSuccessAction.fulfilled,(state)=>{
      state.success=false;
    })

     //follow user
     builder.addCase(followUserAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(followUserAction.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(followUserAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    //unfollow user
    builder.addCase(unFollowUserAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(unFollowUserAction.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(unFollowUserAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

  },
});

//! Generate Reducers
const usersReducer = userSlice.reducer;

export default usersReducer;
