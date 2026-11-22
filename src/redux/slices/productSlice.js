import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getProductsApi,
  getProductByIdApi,
  getAllCategoriesApi,
  getProductsByCategoryApi,
} from '../../services/productService';

export const fetchProductsThunk = createAsyncThunk(
  'product/fetchProducts',
  async (keyword = '', { rejectWithValue }) => {
    try {
      const data = await getProductsApi(keyword);
      return Array.isArray(data) ? data : [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchProductDetailThunk = createAsyncThunk(
  'product/fetchProductDetail',
  async (id, { rejectWithValue }) => {
    try {
      const data = await getProductByIdApi(id);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const searchProductsThunk = createAsyncThunk(
  'product/searchProducts',
  async (keyword = '', { rejectWithValue }) => {
    try {
      const data = await getProductsApi(keyword);
      return Array.isArray(data) ? data : [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCategoriesThunk = createAsyncThunk(
  'product/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getAllCategoriesApi();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchProductsByCategoryThunk = createAsyncThunk(
  'product/fetchProductsByCategory',
  async (categoryId, { rejectWithValue }) => {
    try {
      if (!categoryId) {
        const all = await getProductsApi('');
        return Array.isArray(all) ? all : [];
      }
      const data = await getProductsByCategoryApi(categoryId);
      return Array.isArray(data) ? data : [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  productList: [],
  productDetail: null,
  searchResults: [],
  categories: [],
  loading: false,
  detailLoading: false,
  searchLoading: false,
  error: null,
  detailError: null,
  searchError: null,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    clearSearchError: (state) => {
      state.searchError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.productList = action.payload;
      })
      .addCase(fetchProductsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Không thể tải danh sách sản phẩm.';
      })
      .addCase(fetchProductDetailThunk.pending, (state) => {
        state.detailLoading = true;
        state.detailError = null;
      })
      .addCase(fetchProductDetailThunk.fulfilled, (state, action) => {
        state.detailLoading = false;
        state.productDetail = action.payload;
      })
      .addCase(fetchProductDetailThunk.rejected, (state, action) => {
        state.detailLoading = false;
        state.detailError = action.payload || 'Không thể tải chi tiết sản phẩm.';
      })
      .addCase(searchProductsThunk.pending, (state) => {
        state.searchLoading = true;
        state.searchError = null;
      })
      .addCase(searchProductsThunk.fulfilled, (state, action) => {
        state.searchLoading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchProductsThunk.rejected, (state, action) => {
        state.searchLoading = false;
        state.searchError = action.payload || 'Không thể tìm kiếm sản phẩm.';
      })
      .addCase(fetchCategoriesThunk.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchCategoriesThunk.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(fetchCategoriesThunk.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(fetchProductsByCategoryThunk.pending, (state) => {
        state.searchLoading = true;
        state.searchError = null;
      })
      .addCase(fetchProductsByCategoryThunk.fulfilled, (state, action) => {
        state.searchLoading = false;
        state.searchResults = action.payload;
      })
      .addCase(fetchProductsByCategoryThunk.rejected, (state, action) => {
        state.searchLoading = false;
        state.searchError = action.payload || 'Không thể lọc sản phẩm theo danh mục.';
      });
  },
});

export const { clearSearchError } = productSlice.actions;
export default productSlice.reducer;
