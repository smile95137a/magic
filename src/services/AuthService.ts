import { loadState, removeState, saveState } from '@/utils/Localstorage';
import { api } from './FrontAPI';

const basePath = '/auth';

/** 登入 - 傳回 JWT Token */
export const login = async (payload: {
  username: string;
  password: string;
  language: string;
}): Promise<ApiResponse<string>> => {
  try {
    const response = await api.post(`${basePath}/login`, payload);
    return response.data;
  } catch (error) {
    console.error('Auth - login error:', error);
    throw error;
  }
};

/** 登出 */
export const logout = async (): Promise<string> => {
  try {
    const response = await api.post(`${basePath}/logout`);
    return response.data;
  } catch (error) {
    console.error('Auth - logout error:', error);
    throw error;
  }
};

export const setAuthToken = (token: string | null) => {
  saveState('token', token);
};

export const getAuthToken = (): string | null => {
  return loadState<string>('token') || null;
};

export const removeAuthToken = () => {
  removeState('token');
};
