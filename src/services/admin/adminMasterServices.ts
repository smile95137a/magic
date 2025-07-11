import { ApiResponse } from '@/vite-env';
import { api } from './AdminApi';

const basePath = '/admin/master';

/**
 * 取得所有老師清單
 */
export const fetchAllMasters = async (): Promise<ApiResponse<any[]>> => {
  try {
    const res = await api.post(`${basePath}/list`);
    return res.data;
  } catch (error) {
    console.error('fetchAllMasters error:', error);
    throw error;
  }
};

/**
 * 新增老師
 */
export const addMaster = async (
  payload: any
): Promise<ApiResponse<boolean>> => {
  try {
    const res = await api.post(`${basePath}/add`, payload);
    return res.data;
  } catch (error) {
    console.error('addMaster error:', error);
    throw error;
  }
};

/**
 * 修改老師資料
 */
export const modifyMaster = async (
  payload: any
): Promise<ApiResponse<boolean>> => {
  try {
    const res = await api.post(`${basePath}/modify`, payload);
    return res.data;
  } catch (error) {
    console.error('modifyMaster error:', error);
    throw error;
  }
};
