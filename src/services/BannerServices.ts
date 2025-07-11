// src/services/front/bannerServices.ts
import { BannerVO, ApiResponse } from '@/vite-env';
import { api } from './FrontAPI';

const basePath = '/banner';

/**
 * 取得指定類型的 banner 列表
 */
export const getAvailableBannerByType = async (
  type: string
): Promise<ApiResponse<BannerVO[]>> => {
  try {
    const response = await api.post<ApiResponse<BannerVO[]>>(
      `${basePath}/${type}`
    );
    return response.data;
  } catch (error) {
    console.error('getAvailableBannerByType error:', error);
    throw error;
  }
};
