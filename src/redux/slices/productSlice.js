import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProductsByCategory = createAsyncThunk(
  'products/fetchByCategory',
  async (categoryId) => {
    const response = await axios.get(`https://taycambe.onrender.com/api/v1/products/category/${categoryId}`);
    return response.data;
  }
);

const initialState = {
  products: [],
  loading: false,
  error: null
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setPriceRange: (state, action) => {
      state.priceRange = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { setPriceRange } = productSlice.actions;
export default productSlice.reducer; 