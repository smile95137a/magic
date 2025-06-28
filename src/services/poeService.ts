import { api } from './FrontAPI'; // 根據實際專案調整

const basePath = '/poe';

/**
 * 取得擲筊排行榜
 * @param count 要取得的前 N 筆紀錄數量
 */
export const fetchPoeRank = async (count: number): Promise<any[]> => {
  try {
    const res = await api.post(`${basePath}/rank`, { count });
    return res.data;
  } catch (error) {
    console.error('fetchPoeRank error:', error);
    throw error;
  }
};

/**
 * 新增擲筊紀錄
 * @param count 擲筊次數（或用於觸發條件）
 */
export const addSiunnPoe = async (count: number): Promise<boolean> => {
  try {
    const res = await api.post(`${basePath}/siunn`, { count });
    return res.data;
  } catch (error) {
    console.error('addSiunnPoe error:', error);
    throw error;
  }
};
