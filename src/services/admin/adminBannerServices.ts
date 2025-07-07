// src/services/admin/adminBannerServices.ts
import { BannerAdminVO, NewBannerRequest, ModifyBannerRequest } from '@/vite-env';
import { api } from '../FrontAPI';

const basePath = '/admin/banner';

export const fetchAdminBannerByType = async (
  type: string
): Promise<BannerAdminVO[]> => {
  try {
    const res = await api.post(`${basePath}/${type}`);
    return res.data;
  } catch (error) {
    console.error('fetchAdminBannerByType error:', error);
    throw error;
  }
};

export const addBanner = async (
  payload: NewBannerRequest
): Promise<boolean> => {
  try {
    const res = await api.post(`${basePath}/add`, payload);
    return res.data;
  } catch (error) {
    console.error('addBanner error:', error);
    throw error;
  }
};

export const modifyBanner = async (
  payload: ModifyBannerRequest
): Promise<boolean> => {
  try {
    const res = await api.post(`${basePath}/modify`, payload);
    return res.data;
  } catch (error) {
    console.error('modifyBanner error:', error);
    throw error;
  }
};
