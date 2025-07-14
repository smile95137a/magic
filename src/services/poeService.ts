import { ApiResponse } from '@/vite-env';
import { api } from './FrontAPI';

const basePath = '/poe';

// 取得詩籤排行
export const getPoeRank = async (payload: any): Promise<ApiResponse<any[]>> => {
  try {
    const response = await api.post(`${basePath}/rank`, payload);
    return response.data;
  } catch (error) {
    console.error('getPoeRank error:', error);
    throw error;
  }
};

// 新增詢籤紀錄
export const addSiunnPoe = async (
  payload: any
): Promise<ApiResponse<boolean>> => {
  try {
    const response = await api.post(`${basePath}/siunn`, payload);
    return response.data;
  } catch (error) {
    console.error('addSiunnPoe error:', error);
    throw error;
  }
};
