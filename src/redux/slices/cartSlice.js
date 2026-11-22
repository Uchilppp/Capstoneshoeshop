import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { submitOrderApi } from '../../services/userService';
import { STORAGE_KEYS } from '../../utils/constants';
import { getStorageJson, setStorageJson } from '../../utils/storage';

export const submitOrderThunk = createAsyncThunk(
  'cart/submitOrder',
  async ({ items, email }, { rejectWithValue }) => {
    try {
      const orderDetail = items.map((item) => ({
        productId: String(item.id),
        quantity: Number(item.quantity),
      }));
      const content = await submitOrderApi({ orderDetail, email });
      return { content, orderedIds: items.map((i) => i.id) };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  items: getStorageJson(STORAGE_KEYS.CART_ITEMS, []),
  orderLoading: false,
  orderError: null,
  orderSuccess: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, name, price, image, quantity = 1, size = null } = action.payload;
      const existing = state.items.find((item) => Number(item.id) === Number(id));
      if (existing) {
        existing.quantity += Number(quantity);
        if (size) existing.size = size;
      } else {
        state.items.push({
          id: Number(id),
          name,
          price: Number(price),
          image,
          quantity: Number(quantity),
          size,
          checked: true,
        });
      }
      setStorageJson(STORAGE_KEYS.CART_ITEMS, state.items);
    },
    updateCartQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((i) => Number(i.id) === Number(id));
      if (item) {
        item.quantity = Math.max(1, Number(quantity));
        setStorageJson(STORAGE_KEYS.CART_ITEMS, state.items);
      }
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((i) => Number(i.id) !== Number(id));
      setStorageJson(STORAGE_KEYS.CART_ITEMS, state.items);
    },
    toggleSelectCartItem: (state, action) => {
      const id = action.payload;
      const item = state.items.find((i) => Number(i.id) === Number(id));
      if (item) {
        item.checked = !item.checked;
        setStorageJson(STORAGE_KEYS.CART_ITEMS, state.items);
      }
    },
    toggleSelectAllCart: (state, action) => {
      const checked = Boolean(action.payload);
      state.items.forEach((item) => {
        item.checked = checked;
      });
      setStorageJson(STORAGE_KEYS.CART_ITEMS, state.items);
    },
    clearOrderStatus: (state) => {
      state.orderError = null;
      state.orderSuccess = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitOrderThunk.pending, (state) => {
        state.orderLoading = true;
        state.orderError = null;
        state.orderSuccess = null;
      })
      .addCase(submitOrderThunk.fulfilled, (state, action) => {
        state.orderLoading = false;
        const orderedIds = action.payload.orderedIds.map(Number);
        state.items = state.items.filter((item) => !orderedIds.includes(Number(item.id)));
        setStorageJson(STORAGE_KEYS.CART_ITEMS, state.items);
        state.orderSuccess = 'Đặt hàng thành công!';
      })
      .addCase(submitOrderThunk.rejected, (state, action) => {
        state.orderLoading = false;
        state.orderError = action.payload || 'Đặt hàng thất bại.';
      });
  },
});

export const {
  addToCart,
  updateCartQuantity,
  removeFromCart,
  toggleSelectCartItem,
  toggleSelectAllCart,
  clearOrderStatus,
} = cartSlice.actions;

export default cartSlice.reducer;
