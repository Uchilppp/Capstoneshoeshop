import axiosClient from './axiosClient';
import { API_ENDPOINTS } from '../utils/constants';

export const signUpApi = async (payload) => {
  const result = await axiosClient.post(API_ENDPOINTS.SIGN_UP, {
    email: payload.email,
    password: payload.password,
    name: payload.name,
    gender: Boolean(payload.gender),
    phone: payload.phone,
  });
  return result.data.content;
};

export const signInApi = async (payload) => {
  const result = await axiosClient.post(API_ENDPOINTS.SIGN_IN, {
    email: payload.email,
    password: payload.password,
  });
  return result.data.content;
};

export const facebookLoginApi = async (facebookToken) => {
  const result = await axiosClient.post(API_ENDPOINTS.FACEBOOK_LOGIN, {
    facebookToken,
  });
  return result.data.content;
};

export const getProfileApi = async () => {
  const result = await axiosClient.post(API_ENDPOINTS.GET_PROFILE_V2);
  return result.data.content;
};

export const updateProfileApi = async (payload) => {
  const result = await axiosClient.post(API_ENDPOINTS.UPDATE_PROFILE, {
    email: payload.email,
    password: payload.password || '',
    name: payload.name,
    gender: Boolean(payload.gender),
    phone: payload.phone,
  });
  return result.data.content;
};

export const submitOrderApi = async ({ orderDetail, email }) => {
  const formattedDetail = orderDetail.map((item) => ({
    productId: String(item.productId),
    quantity: Number(item.quantity),
  }));
  const result = await axiosClient.post(API_ENDPOINTS.ORDER, {
    orderDetail: formattedDetail,
    email,
  });
  return result.data.content;
};

export const likeProductApi = async (productId) => {
  const result = await axiosClient.get(API_ENDPOINTS.LIKE_PRODUCT, {
    params: { productId: Number(productId) },
  });
  return result.data.content;
};

export const unlikeProductApi = async (productId) => {
  const result = await axiosClient.get(API_ENDPOINTS.UNLIKE_PRODUCT, {
    params: { productId: Number(productId) },
  });
  return result.data.content;
};

export const getFavoriteProductsApi = async () => {
  const result = await axiosClient.get(API_ENDPOINTS.FAVORITE_PRODUCTS);
  return result.data.content;
};
