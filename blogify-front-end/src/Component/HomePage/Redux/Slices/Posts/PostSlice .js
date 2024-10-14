import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { resetErrorAction, resetSuccessAction } from "../Global/globalSlice";

// intitialize
const INTITIAL_STATE = {
  loading: false,
  error: null,
  posts: [],

  post: null,
  success: false,
};
  
//! Fetch Public posts

export const fetchPublicPostsAction = createAsyncThunk(
  "posts/fetch-public-posts",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    // make request
    try {
      const { data } = await axios.get(
        "http://localhost:9080/api/v1/posts/home/public"
      );

      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
//! Fetch Private posts
export const fetchPrivatePostsAction = createAsyncThunk(
  "posts/fetch-private-posts",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    // make request
    
    try {
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(
        "http://localhost:9080/api/v1/posts",config
      );

      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//! Delete post
export const deletePostsAction = createAsyncThunk(
  "posts/delete-post",
  async (postId, { rejectWithValue, getState, dispatch }) => {
    // make request
    
    try {

      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      
      const { data } = await axios.delete(
        `http://localhost:9080/api/v1/posts/${postId}`,config
      );

      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//! view a  post
export const postViewCountAction = createAsyncThunk(
  "posts/post-views",
  async (postId, { rejectWithValue, getState, dispatch }) => {
    // make request
    
    try {

      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      
      const { data } = await axios.put(
        `http://localhost:9080/api/v1/posts/${postId}/post-views-count`,{},config
      );

      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//! Like post
export const likePostAction = createAsyncThunk(
  "posts/like",
  async (postId, { rejectWithValue, getState, dispatch }) => {
    // make request
    
    try {

      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      
      const { data } = await axios.put(
        `http://localhost:9080/api/v1/posts/likes/${postId}`,{},config
      );

      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//! disike post
export const dislikePostAction = createAsyncThunk(
  "posts/dislike",
  async (postId, { rejectWithValue, getState, dispatch }) => {
    // make request
    
    try {

      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      
      const { data } = await axios.put(
        `http://localhost:9080/api/v1/posts/dislikes/${postId}`,{},config
      );

      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//! clap for a  post
export const clapPostAction = createAsyncThunk(
  "posts/clap",
  async (postId, { rejectWithValue, getState, dispatch }) => {
    // make request
    
    try {

      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      
      const { data } = await axios.put(
        `http://localhost:9080/api/v1/posts/claps/${postId}`,{},config
      );

      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);


//! create post
export const addPostActionAction = createAsyncThunk(
  "post/create",
  async (payload, { rejectWithValue, getState, dispatch }) => { 
    
    try {
      // convert the payload to formData
   const formData = new FormData();
   formData.append("title",payload?.title)
   formData.append("content",payload?.content)
   formData.append("categoryId",payload?.category)
   formData.append("file",payload?.image)
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
      }
    }
      const { data } = await axios.post(
        "http://localhost:9080/api/v1/posts/",
        formData,
        config
      );
    
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
// ! update post
export const updatePostAction = createAsyncThunk(
  "post/update",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      //convert the payload to formdata
      const formData = new FormData();
      formData.append("title", payload?.title);
      formData.append("content", payload?.content);
      formData.append("categoryId", payload?.category);
      formData.append("file", payload?.image);

      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        `http://localhost:9080/api/v1/posts/${payload?.postId}`,
        formData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);


//! Fetch single post

export const getPostAction = createAsyncThunk(
  "posts/get-post",
  async (postId, { rejectWithValue, getState, dispatch }) => {
    // make request
    try {
      const { data } = await axios.get(
        `http://localhost:9080/api/v1/posts/${postId}`
      );

      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);





const PostSlice = createSlice({
  name: "posts",
  initialState: INTITIAL_STATE,
  extraReducers: (builder) => {
    //! fetch public posts
    builder.addCase(fetchPublicPostsAction.pending, (state, action) => {
      state.loading = true;
    });
    // handle the fulfilled state
    builder.addCase(fetchPublicPostsAction.fulfilled, (state, action) => {
      state.posts = action.payload;
     state.loading = false;
      state.error = null;
    });
    //* handle the rejection
    builder.addCase(fetchPublicPostsAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

//! fetch private posts
builder.addCase(fetchPrivatePostsAction.pending, (state, action) => {
  state.loading = true;
});
// handle the fulfilled state
builder.addCase(fetchPrivatePostsAction.fulfilled, (state, action) => {
  state.posts = action.payload;
  state.loading = false;
  state.error = null;
});
//* handle the rejection
builder.addCase(fetchPrivatePostsAction.rejected, (state, action) => {
  state.error = action.payload;
  state.loading = false;
});


    
    //! add post 
    builder.addCase(addPostActionAction.pending, (state, action) => {
      state.loading = true;
    });
    // handle the fulfilled state
    builder.addCase(addPostActionAction.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });
    //* handle the rejection
    builder.addCase(addPostActionAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
   
//! get single posts
builder.addCase(getPostAction.pending, (state, action) => {
  state.loading = true;
});
// handle the fulfilled state
builder.addCase(getPostAction.fulfilled, (state, action) => {
  state.posts = action.payload;
  state.loading = false;
  state.error = null;
});
//* handle the rejection
builder.addCase(getPostAction.rejected, (state, action) => {
  state.error = action.payload;
  state.loading = false;
});

//! delete post
builder.addCase(deletePostsAction.pending, (state, action) => {
  state.loading = true;
});
// handle the fulfilled state
builder.addCase(deletePostsAction.fulfilled, (state, action) => {
  state.posts = action.payload;
  state.success = true;
  state.loading = false;
  state.error = null;
});
//* handle the rejection
builder.addCase(deletePostsAction.rejected, (state, action) => {
  state.error = action.payload;
  state.loading = false;
});
//! udpate post
builder.addCase(updatePostAction.pending, (state, action) => {
  state.loading = true;
});
// handle the fulfilled state
builder.addCase(updatePostAction.fulfilled, (state, action) => {
  state.posts = action.payload;
  state.success = true;
  state.loading = false;
  state.error = null;
});
//* handle the rejection
builder.addCase(updatePostAction.rejected, (state, action) => {
  state.error = action.payload;
  state.loading = false;
});

//! like post
builder.addCase(likePostAction.pending, (state, action) => {
  state.loading = true;
});
// handle the fulfilled state
builder.addCase(likePostAction.fulfilled, (state, action) => {
  state.posts = action.payload;
  state.success = true;
  state.loading = false;
  state.error = null;
});
//* handle the rejection
builder.addCase(likePostAction.rejected, (state, action) => {
  state.error = action.payload;
  state.loading = false;
});

//! dislike post
builder.addCase(dislikePostAction.pending, (state, action) => {
  state.loading = true;
});
// handle the fulfilled state
builder.addCase(dislikePostAction.fulfilled, (state, action) => {
  state.posts = action.payload;
  state.success = true;
  state.loading = false;
  state.error = null;
});
//* handle the rejection
builder.addCase(dislikePostAction.rejected, (state, action) => {
  state.error = action.payload;
  state.loading = false;
});

//! clap post
builder.addCase(clapPostAction.pending, (state, action) => {
  state.loading = true;
});
// handle the fulfilled state
builder.addCase(clapPostAction.fulfilled, (state, action) => {
  state.posts = action.payload;
  state.success = true;
  state.loading = false;
  state.error = null;
});
//* handle the rejection
builder.addCase(clapPostAction.rejected, (state, action) => {
  state.error = action.payload;
  state.loading = false;
});

//! view a  post
builder.addCase(postViewCountAction.pending, (state, action) => {
  state.loading = true;
});
// handle the fulfilled state
builder.addCase(postViewCountAction.fulfilled, (state, action) => {
  state.posts = action.payload;
  state.success = true;
  state.loading = false;
  state.error = null;
});
//* handle the rejection
builder.addCase(postViewCountAction.rejected, (state, action) => {
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
const postReducer = PostSlice.reducer;

export default postReducer;
