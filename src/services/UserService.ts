// src/services/front/userServices.ts
import { UserRegisterRequest, UserLoginRequest, LoginResponse, RefreshTokenRequest, UserProfileModifyRequest, UserProfileResponse, RecordPeriodRequest, RecordVO } from '@/vite-env';
import { api } from './FrontAPI';

const basePath = '/user';

export const register = async (payload: UserRegisterRequest): Promise<boolean> => {
  try {
    const response = await api.post(`${basePath}/register`, payload);
    return response.data;
  } catch (error) {
    console.error('register error:', error);
    throw error;
  }
};

export const login = async (payload: UserLoginRequest): Promise<LoginResponse> => {
  try {
    const response = await api.post(`${basePath}/login`, payload);
    return response.data;
  } catch (error) {
    console.error('login error:', error);
    throw error;
  }
};

export const refreshToken = async (payload: RefreshTokenRequest): Promise<LoginResponse> => {
  try {
    const response = await api.post(`${basePath}/refresh`, payload);
    return response.data;
  } catch (error) {
    console.error('refreshToken error:', error);
    throw error;
  }
};

export const modifyUser = async (payload: UserProfileModifyRequest): Promise<boolean> => {
  try {
    const response = await api.post(`${basePath}/modify`, payload);
    return response.data;
  } catch (error) {
    console.error('modifyUser error:', error);
    throw error;
  }
};

export const getProfile = async (): Promise<UserProfileResponse> => {
  try {
    const response = await api.post(`${basePath}/me`);
    return response.data;
  } catch (error) {
    console.error('getProfile error:', error);
    throw error;
  }
};

export const getPurchaseRecord = async (
  payload: RecordPeriodRequest
): Promise<RecordVO[]> => {
  try {
    const response = await api.post(`${basePath}/record/purchase`, payload);
    return response.data;
  } catch (error) {
    console.error('getPurchaseRecord error:', error);
    throw error;
  }
};
