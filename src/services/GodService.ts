import { api } from './FrontAPI'; // 根據實際封裝位置調整

const basePath = '/god';

/**
 * 取得所有神明清單
 */
export const getAllGod = async (): Promise<any> => {
  try {
    const response = await api.post(`${basePath}/list`);
    return response.data;
  } catch (error) {
    console.error('getAllGod error:', error);
    throw error;
  }
};
