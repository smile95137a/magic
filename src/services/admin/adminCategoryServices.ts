import { ProductCategory, CategoryAdminRequest, ModifyCategoryAdminRequest } from '@/vite-env';
import { api } from '../FrontAPI';


const basePath = '/admin/product/category';

/**
 * 取得商品分類清單
 */
export const fetchCategoryList = async (): Promise<ProductCategory[]> => {
  try {
    const res = await api.post(`${basePath}/list`);
    return res.data;
  } catch (error) {
    console.error('fetchCategoryList error:', error);
    throw error;
  }
};

/**
 * 新增商品分類
 */
export const addCategory = async (data: CategoryAdminRequest): Promise<boolean> => {
  try {
    const res = await api.post(`${basePath}/add`, data);
    return res.data;
  } catch (error) {
    console.error('addCategory error:', error);
    throw error;
  }
};

/**
 * 修改商品分類
 */
export const modifyCategory = async (data: ModifyCategoryAdminRequest): Promise<boolean> => {
  try {
    const res = await api.post(`${basePath}/modify`, data);
    return res.data;
  } catch (error) {
    console.error('modifyCategory error:', error);
    throw error;
  }
};
