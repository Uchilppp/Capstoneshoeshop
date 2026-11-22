import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  signInApi,
  signUpApi,
  facebookLoginApi,
  getProfileApi,
  updateProfileApi,
  likeProductApi,
  unlikeProductApi,
  getFavoriteProductsApi,
} from '../../services/userService';
import { STORAGE_KEYS } from '../../utils/constants';
import {
  getAccessToken,
  setAccessToken,
  getStorageJson,
  setStorageJson,
  removeAuthStorage,
} from '../../utils/storage';

export const signInThunk = createAsyncThunk(
  'user/signIn',
  async (credentials, { rejectWithValue }) => {
    try {
      const content = await signInApi(credentials);
      setAccessToken(content.accessToken);
      setStorageJson(STORAGE_KEYS.USER_LOGIN, content);
      return content;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const signUpThunk = createAsyncThunk(
  'user/signUp',
  async (payload, { rejectWithValue }) => {
    try {
      const content = await signUpApi(payload);
      return content;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const facebookLoginThunk = createAsyncThunk(
  'user/facebookLogin',
  async (facebookToken, { rejectWithValue }) => {
    try {
      const content = await facebookLoginApi(facebookToken);
      setAccessToken(content.accessToken);
      setStorageJson(STORAGE_KEYS.USER_LOGIN, content);
      return content;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchProfileThunk = createAsyncThunk(
  'user/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const content = await getProfileApi();
      return content;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateProfileThunk = createAsyncThunk(
  'user/updateProfile',
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      const content = await updateProfileApi(payload);
      await dispatch(fetchProfileThunk());
      return content;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchFavoritesThunk = createAsyncThunk(
  'user/fetchFavorites',
  async (_, { rejectWithValue }) => {
    try {
      const content = await getFavoriteProductsApi();
      return content?.productsFavorite || [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const toggleLikeProductThunk = createAsyncThunk(
  'user/toggleLikeProduct',
  async (productId, { getState, dispatch, rejectWithValue }) => {
    try {
      const { favoriteProducts } = getState().user;
      const isLiked = favoriteProducts.some((item) => Number(item.id) === Number(productId));
      if (isLiked) {
        await unlikeProductApi(productId);
      } else {
        await likeProductApi(productId);
      }
      await dispatch(fetchFavoritesThunk());
      return { productId: Number(productId), isLiked: !isLiked };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  accessToken: getAccessToken(),
  userLogin: getStorageJson(STORAGE_KEYS.USER_LOGIN, null),
  profile: null,
  favoriteProducts: [],
  authLoading: false,
  authError: null,
  registerSuccess: false,
  profileLoading: false,
  profileError: null,
  updateLoading: false,
  updateSuccess: null,
  updateError: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.accessToken = '';
      state.userLogin = null;
      state.profile = null;
      state.favoriteProducts = [];
      state.authError = null;
      removeAuthStorage();
    },
    clearAuthStatus: (state) => {
      state.authError = null;
      state.registerSuccess = false;
    },
    clearUpdateStatus: (state) => {
      state.updateSuccess = null;
      state.updateError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInThunk.pending, (state) => {
        state.authLoading = true;
        state.authError = null;
      })
      .addCase(signInThunk.fulfilled, (state, action) => {
        state.authLoading = false;
        state.accessToken = action.payload.accessToken;
        state.userLogin = action.payload;
      })
      .addCase(signInThunk.rejected, (state, action) => {
        state.authLoading = false;
        state.authError = action.payload || 'Đăng nhập thất bại.';
      })
      .addCase(signUpThunk.pending, (state) => {
        state.authLoading = true;
        state.authError = null;
        state.registerSuccess = false;
      })
      .addCase(signUpThunk.fulfilled, (state) => {
        state.authLoading = false;
        state.registerSuccess = true;
      })
      .addCase(signUpThunk.rejected, (state, action) => {
        state.authLoading = false;
        state.authError = action.payload || 'Đăng ký tài khoản thất bại.';
      })
      .addCase(facebookLoginThunk.pending, (state) => {
        state.authLoading = true;
        state.authError = null;
      })
      .addCase(facebookLoginThunk.fulfilled, (state, action) => {
        state.authLoading = false;
        state.accessToken = action.payload.accessToken;
        state.userLogin = action.payload;
      })
      .addCase(facebookLoginThunk.rejected, (state, action) => {
        state.authLoading = false;
        state.authError = action.payload || 'Đăng nhập Facebook thất bại.';
      })
      .addCase(fetchProfileThunk.pending, (state) => {
        state.profileLoading = true;
        state.profileError = null;
      })
      .addCase(fetchProfileThunk.fulfilled, (state, action) => {
        state.profileLoading = false;
        state.profile = action.payload;
      })
      .addCase(fetchProfileThunk.rejected, (state, action) => {
        state.profileLoading = false;
        state.profileError = action.payload || 'Không thể tải thông tin cá nhân.';
      })
      .addCase(updateProfileThunk.pending, (state) => {
        state.updateLoading = true;
        state.updateError = null;
        state.updateSuccess = null;
      })
      .addCase(updateProfileThunk.fulfilled, (state) => {
        state.updateLoading = false;
        state.updateSuccess = 'Cập nhật thông tin thành công!';
      })
      .addCase(updateProfileThunk.rejected, (state, action) => {
        state.updateLoading = false;
        state.updateError = action.payload || 'Cập nhật thông tin thất bại.';
      })
      .addCase(fetchFavoritesThunk.pending, (state) => {
        state.profileError = null;
      })
      .addCase(fetchFavoritesThunk.fulfilled, (state, action) => {
        state.favoriteProducts = action.payload;
      })
      .addCase(fetchFavoritesThunk.rejected, () => {})
      .addCase(toggleLikeProductThunk.pending, () => {})
      .addCase(toggleLikeProductThunk.fulfilled, () => {})
      .addCase(toggleLikeProductThunk.rejected, () => {});
  },
});

export const { logout, clearAuthStatus, clearUpdateStatus } = userSlice.actions;
export default userSlice.reducer;
