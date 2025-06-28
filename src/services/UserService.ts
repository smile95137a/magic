import { api } from './FrontAPI'; // 根據實際路徑調整

const basePath = '/user';

/**
 * 註冊會員
 * @param payload 包含 email、密碼、手機等註冊資料
 */
export const registerUser = async (payload: any): Promise<any> => {
  try {
    const res = await api.post(`${basePath}/register`, payload);
    return res.data;
  } catch (error) {
    console.error('registerUser error:', error);
    throw error;
  }
};

/**
 * 會員登入
 * @param payload 包含 email、password
 */
export const loginUser = async (payload: any): Promise<any> => {
  try {
    const res = await api.post(`${basePath}/login`, payload);
    return res.data;
  } catch (error) {
    console.error('loginUser error:', error);
    throw error;
  }
};

/**
 * 重新取得 access token
 * @param refreshToken refreshToken 字串
 */
export const refreshToken = async (refreshToken: string): Promise<any> => {
  try {
    const res = await api.post(`${basePath}/refresh`, { refreshToken });
    return res.data;
  } catch (error) {
    console.error('refreshToken error:', error);
    throw error;
  }
};

/**
 * 修改會員資料
 * @param payload 修改內容
 */
export const modifyUserProfile = async (payload: any): Promise<any> => {
  try {
    const res = await api.post(`${basePath}/modify`, payload);
    return res.data;
  } catch (error) {
    console.error('modifyUserProfile error:', error);
    throw error;
  }
};

/**
 * 取得會員個人資料
 */
export const fetchUserProfile = async (): Promise<any> => {
  try {
    const res = await api.post(`${basePath}/me`);
    return res.data;
  } catch (error) {
    console.error('fetchUserProfile error:', error);
    throw error;
  }
};
