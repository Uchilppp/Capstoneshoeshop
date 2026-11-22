export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'https://apistore.cybersoft.edu.vn';

export const FB_APP_ID = import.meta.env.VITE_FB_APP_ID || '599753691700080';

export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'accessToken',
  USER_LOGIN: 'userLogin',
  CART_ITEMS: 'cartItems',
};

export const API_ENDPOINTS = {
  PRODUCTS: '/api/Product',
  PRODUCT_BY_ID: '/api/Product/getbyid',
  PRODUCT_PAGING: '/api/Product/getpaging',
  PRODUCT_BY_CATEGORY: '/api/Product/getProductByCategory',
  PRODUCT_BY_FEATURE: '/api/Product/getProductByFeature',
  ALL_CATEGORIES: '/api/Product/getAllCategory',
  SIGN_UP: '/api/Users/signup',
  SIGN_IN: '/api/Users/signin',
  FACEBOOK_LOGIN: '/api/Users/facebooklogin',
  GET_PROFILE_V2: '/api/Users/getProfileV2',
  UPDATE_PROFILE: '/api/Users/updateProfile',
  CHANGE_PASSWORD: '/api/Users/changePassword',
  ORDER: '/api/Users/order',
  DELETE_ORDER: '/api/Users/deleteOrder',
  LIKE_PRODUCT: '/api/Users/like',
  UNLIKE_PRODUCT: '/api/Users/unlike',
  FAVORITE_PRODUCTS: '/api/Users/getproductfavorite',
};
