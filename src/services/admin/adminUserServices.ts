import { ApiResponse } from '@/vite-env';
import { api } from './AdminApi';

const basePath = '/admin/user';

/**
 * 查詢全部會員
 */
export const fetchAllUsers = async (): Promise<ApiResponse<any[]>> => {
  try {
    const res = await api.post(`${basePath}/listAll`);
    return res.data;
  } catch (error) {
    console.error('fetchAllUsers error:', error);
    throw error;
  }
};
