import axiosClient from './axiosClient';
import { API_ENDPOINTS } from '../utils/constants';

export const getProductsApi = async (keyword = '') => {
  const trimmed = keyword ? keyword.trim() : '';
  const params = trimmed ? { keyword: trimmed } : {};
  const result = await axiosClient.get(API_ENDPOINTS.PRODUCTS, { params });
  const content = Array.isArray(result.data.content) ? result.data.content : [];

  if (content.length > 0 || !trimmed) {
    return content;
  }

  // Fallback client-side search if Cybersoft API strict name search returns empty
  const allRes = await axiosClient.get(API_ENDPOINTS.PRODUCTS);
  const allProducts = Array.isArray(allRes.data.content) ? allRes.data.content : [];
  const lower = trimmed.toLowerCase();

  if (lower === 'sport') {
    return allProducts.filter(
      (p) =>
        p.feature === true ||
        String(p.categories || '').toUpperCase().includes('NIKE') ||
        String(p.categories || '').toUpperCase().includes('ADIDAS')
    );
  }

  if (lower === 'kid') {
    return allProducts.filter(
      (p) =>
        String(p.categories || '').toUpperCase().includes('VANS') ||
        (Array.isArray(p.sizes) && p.sizes.includes(32))
    );
  }

  return allProducts.filter((p) => {
    const haystack = [
      p.name,
      p.alias,
      p.shortDescription,
      p.description,
      typeof p.categories === 'string' ? p.categories : JSON.stringify(p.categories || ''),
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();
    return haystack.includes(lower);
  });
};

export const getProductByIdApi = async (id) => {
  const result = await axiosClient.get(API_ENDPOINTS.PRODUCT_BY_ID, {
    params: { id },
  });
  return result.data.content;
};

export const getAllCategoriesApi = async () => {
  const result = await axiosClient.get(API_ENDPOINTS.ALL_CATEGORIES);
  return result.data.content;
};

export const getProductsByCategoryApi = async (categoryId) => {
  try {
    const result = await axiosClient.get(API_ENDPOINTS.PRODUCT_BY_CATEGORY, {
      params: { categoryId },
    });
    if (Array.isArray(result.data.content) && result.data.content.length > 0) {
      return result.data.content;
    }
  } catch {
    // Cybersoft backend returns 404 for parent categories like MEN and WOMEN
    // Fallback to filtering via getAllCategory's productList array
  }

  const [categories, allProducts] = await Promise.all([
    getAllCategoriesApi(),
    getProductsApi(''),
  ]);

  const matchedCategory = (Array.isArray(categories) ? categories : []).find(
    (cat) => String(cat.id).toUpperCase() === String(categoryId).toUpperCase()
  );

  if (matchedCategory && matchedCategory.productList) {
    try {
      const idList = JSON.parse(matchedCategory.productList).map(Number);
      return allProducts.filter((prod) => idList.includes(Number(prod.id)));
    } catch {
      // ignore JSON parse error
    }
  }

  return allProducts.filter((prod) =>
    String(prod.categories || '')
      .toUpperCase()
      .includes(String(categoryId).toUpperCase())
  );
};
