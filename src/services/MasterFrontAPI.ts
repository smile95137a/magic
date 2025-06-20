import { api } from './FrontAPI'; // 根據實際封裝調整路徑

const basePath = '/master';

/**
 * 取得師父清單
 */
export const getMasterList = async (): Promise<any> => {
  try {
    const response = await api.post(`${basePath}/list`);
    return response.data;
  } catch (error) {
    console.error('getMasterList error:', error);
    throw error;
  }
};

/**
 * 師父預約服務
 * @param request 師父預約請求資料
 */
export const reserveMasterService = async (request: any): Promise<any> => {
  try {
    const response = await api.post(`${basePath}/reservation`, request);
    return response.data;
  } catch (error) {
    console.error('reserveMasterService error:', error);
    throw error;
  }
};
