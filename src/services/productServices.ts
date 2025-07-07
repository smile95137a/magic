// src/services/front/productServices.ts
import { ProductCategoryVO, ProductListRequest, ProductVO, ProductDetailVO } from '@/vite-env';
import { api } from './FrontAPI';

const basePath = '/product';



/**
 * 取得可用商品分類列表
 */
export const getCategoryAvailableList = async (): Promise<ProductCategoryVO[]> => {
  try {
    const response = await api.post(`${basePath}/category/list`);
    return response.data;
  } catch (error) {
    console.error('getCategoryAvailableList error:', error);
    throw error;
  }
};

/**
 * 查詢商品列表（依分類）
 */
export const getProductListByCategory = async (
  payload: ProductListRequest
): Promise<ProductVO[]> => {
  try {
    const response = await api.post(`${basePath}/list`, payload);
    return response.data;
  } catch (error) {
    console.error('getProductListByCategory error:', error);
    throw error;
  }
};

/**
 * 查詢商品詳細資訊
 */
export const getProductDetail = async (
  productId: number
): Promise<ProductDetailVO> => {
  try {
    const response = await api.get(`${basePath}/info/${productId}`);
    return response.data;
  } catch (error) {
    console.error('getProductDetail error:', error);
    throw error;
  }
};
