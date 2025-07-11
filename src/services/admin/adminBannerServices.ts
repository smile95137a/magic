import { BannerAdminVO, ApiResponse } from '@/vite-env';
import { api } from './AdminApi';

const basePath = '/admin/banner';

/**
 * 依類型查詢後台 banner
 */
export const fetchAdminBannerByType = async (
  type: string
): Promise<ApiResponse<BannerAdminVO[]>> => {
  try {
    const res = await api.post(`${basePath}/${type}`);
    return res.data;
  } catch (error) {
    console.error('fetchAdminBannerByType error:', error);
    throw error;
  }
};

/**
 * 新增 banner
 */
export const addBanner = async (
  payload: any
): Promise<ApiResponse<boolean>> => {
  try {
    const res = await api.post(`${basePath}/add`, payload);
    return res.data;
  } catch (error) {
    console.error('addBanner error:', error);
    throw error;
  }
};

/**
 * 修改 banner
 */
export const modifyBanner = async (
  payload: any
): Promise<ApiResponse<boolean>> => {
  try {
    const res = await api.post(`${basePath}/modify`, payload);
    return res.data;
  } catch (error) {
    console.error('modifyBanner error:', error);
    throw error;
  }
};
