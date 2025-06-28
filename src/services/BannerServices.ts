// src/services/front/bannerServices.ts
import { api } from './FrontAPI'; 

const basePath = '/banner';

/**
 * 根據類型取得可用 Banner 清單
 * @param type banner 類型（只能是一個英數字元，例：A、1、b）
 * @returns BannerVO[] 格式資料（由後端定義）
 */
export const getAvailableBannerByType = async (type: string): Promise<any> => {
  try {
    const response = await api.post(`${basePath}/${type}`);
    return response.data;
  } catch (error) {
    console.error('getAvailableBannerByType error:', error);
    throw error;
  }
};
