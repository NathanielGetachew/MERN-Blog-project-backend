import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { resetErrorAction, resetSuccessAction } from "../Global/globalSlice";
import BASE_URL from "../../../../../utils/baseURL";


// intitialize
const INTITIAL_STATE = {
  loading: false,
  error: null,
  categories: [],
  category: null,
  success: false,
};


//! Fetch categories

export const fetchCategoriesAction = createAsyncThunk(
  "catgegories/lists",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    // make request
    try {
      const { data } = await axios.get(
        `${BASE_URL}/categories`
      );

      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState: INTITIAL_STATE,
  extraReducers: (builder) => {
    //fetch categories
    builder.addCase(fetchCategoriesAction.pending, (state, action) => {
      state.loading = true;
    });
    // handle the fulfilled state
    builder.addCase(fetchCategoriesAction.fulfilled, (state, action) => {
      state.categories = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });
    //* handle the rejection
    builder.addCase(fetchCategoriesAction.rejected, (state, action) => {
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
const categoryReducer = categoriesSlice.reducer;

export default categoryReducer;
