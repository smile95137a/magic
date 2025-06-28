import { api } from './FrontAPI'; // 路徑視專案結構調整

const basePath = '/god';

/**
 * 取得所有神明列表
 */
export const fetchAllGod = async (): Promise<any> => {
  try {
    const res = await api.post(`${basePath}/list`);
    return res.data;
  } catch (error) {
    console.error('fetchAllGod error:', error);
    throw error;
  }
};

/**
 * 神明降臨
 * @param godCode 神明代碼（字串）
 */
export const godDescend = async (godCode: string): Promise<boolean> => {
  try {
    const res = await api.post(`${basePath}/descend`, { godCode });
    return res.data;
  } catch (error) {
    console.error('godDescend error:', error);
    throw error;
  }
};

/**
 * 查詢神明資訊
 * @param godCode 神明代碼（字串）
 */
export const fetchGodInfo = async (godCode: string): Promise<any> => {
  try {
    const res = await api.post(`${basePath}/info`, { godCode });
    return res.data?.data; // 因為包在 ApiResponse 裡
  } catch (error) {
    console.error('fetchGodInfo error:', error);
    throw error;
  }
};

/**
 * 延長神明降臨天數
 * @param godCode 神明代碼
 * @param day 天數（字串或數字）
 */
export const extendGodPeriod = async (godCode: string, day: number | string): Promise<boolean> => {
  try {
    const res = await api.post(`${basePath}/extend`, {
      godCode,
      day: String(day),
    });
    return res.data;
  } catch (error) {
    console.error('extendGodPeriod error:', error);
    throw error;
  }
};

/**
 * 取得供品列表
 */
export const fetchOfferingList = async (): Promise<any[]> => {
  try {
    const res = await api.post(`${basePath}/offering/list`);
    return res.data;
  } catch (error) {
    console.error('fetchOfferingList error:', error);
    throw error;
  }
};

/**
 * 供奉供品
 * @param payload 包含 godCode 與 offeringIds 的結構
 */
export const presentOffering = async (payload: {
  godCode: string;
  offeringIds: number[];
}): Promise<any> => {
  try {
    const res = await api.post(`${basePath}/offering/present`, payload);
    return res.data;
  } catch (error) {
    console.error('presentOffering error:', error);
    throw error;
  }
};
