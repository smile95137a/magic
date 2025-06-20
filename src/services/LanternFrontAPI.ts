import { api } from './FrontAPI'; // 調整為你的封裝路徑

const basePath = '/lantern';

/**
 * 取得所有燈品清單
 */
export const getLanternList = async (): Promise<any> => {
  try {
    const response = await api.post(`${basePath}/list`);
    return response.data;
  } catch (error) {
    console.error('getLanternList error:', error);
    throw error;
  }
};

/**
 * 取得最新祝福燈名單
 */
export const getLatestLanterns = async (count: number): Promise<any> => {
  try {
    const response = await api.post(`${basePath}/latest`, { count });
    return response.data;
  } catch (error) {
    console.error('getLatestLanterns error:', error);
    throw error;
  }
};

/**
 * 取得推薦祝福燈名單
 */
export const getRecommendationLanterns = async (
  count: number
): Promise<any> => {
  try {
    const response = await api.post(`${basePath}/recommendation`, { count });
    return response.data;
  } catch (error) {
    console.error('getRecommendationLanterns error:', error);
    throw error;
  }
};

/**
 * 取得排行祝福燈名單
 */
export const getRankLanterns = async (count: number): Promise<any> => {
  try {
    const response = await api.post(`${basePath}/rank`, { count });
    return response.data;
  } catch (error) {
    console.error('getRankLanterns error:', error);
    throw error;
  }
};

/**
 * 根據代碼取得燈品詳細資訊
 */
export const getLanternByCode = async (code: string): Promise<any> => {
  try {
    const response = await api.post(`${basePath}/${code}`);
    return response.data;
  } catch (error) {
    console.error('getLanternByCode error:', error);
    throw error;
  }
};

/**
 * 購買燈品（建立購買紀錄）
 */
export const purchaseLantern = async (request: any): Promise<any> => {
  try {
    const response = await api.post(`${basePath}/purchase/info`, request);
    return response.data;
  } catch (error) {
    console.error('purchaseLantern error:', error);
    throw error;
  }
};
