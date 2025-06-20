import { api } from './FrontAPI'; // 根據實際路徑調整

const basePath = '/poem';

/**
 * 取得籤詩清單
 */
export const getPoemList = async (): Promise<any> => {
  try {
    const response = await api.post(`${basePath}/list`);
    return response.data;
  } catch (error) {
    console.error('getPoemList error:', error);
    throw error;
  }
};

/**
 * 初始化籤詩資料（通常用於後台或開發用）
 */
export const initPoems = async (): Promise<void> => {
  try {
    await api.post(`${basePath}/init`);
  } catch (error) {
    console.error('initPoems error:', error);
    throw error;
  }
};
