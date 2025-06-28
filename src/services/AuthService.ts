import { loadState, removeState, saveState } from '@/utils/Localstorage';
import { api } from './FrontAPI';

export interface JWTAuthResponse {
  accessToken: string;
  user: any;
}


const basePath = '/auth';

export const login = async (
  data: any
): Promise<ApiResponse<JWTAuthResponse>> => {
  try {
    const response = await api.post(`${basePath}/login`, data);
    return response.data;
  } catch (error) {
    console.error('Error during authentication:', error);
    throw error;
  }
};

export const setAuthToken = (token: string | null) => {
  saveState('ftoken', token);
};

export const getAuthToken = (): string | null => {
  return loadState<string>('ftoken') || null;
};

export const removeAuthToken = () => {
  removeState('ftoken');
};
