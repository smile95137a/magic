import { ApiResponse } from '@/vite-env';
import { api } from './AdminApi';

const basePath = '/shipping-method';

// 查詢物流方式列表  GET /shipping-method/list
export const fetchShippingMethodList = async (): Promise<
  ApiResponse<any[]>
> => {
  try {
    const res = await api.get(`${basePath}/list`);
    return res.data;
  } catch (error) {
    console.error('fetchShippingMethodList error:', error);
    throw error;
  }
};

// 編輯物流方式  PUT /shipping-method/modify
export const modifyShippingMethod = async (
  payload: any
): Promise<ApiResponse<boolean>> => {
  try {
    const res = await api.put(`${basePath}/modify`, payload);
    return res.data;
  } catch (error) {
    console.error('modifyShippingMethod error:', error);
    throw error;
  }
};
