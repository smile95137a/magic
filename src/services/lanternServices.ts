// src/services/front/lanternServices.ts
import { Lantern, CountRequest, LanternBlessingVO, LanternVO, LanternPurchaseRequest } from '@/vite-env';
import { api } from './FrontAPI';

const basePath = '/lantern';

export const getLanternList = async (): Promise<Lantern[]> => {
  try {
    const response = await api.post(`${basePath}/list`);
    return response.data;
  } catch (error) {
    console.error('getLanternList error:', error);
    throw error;
  }
};

export const getLatestLanterns = async (payload: CountRequest): Promise<LanternBlessingVO[]> => {
  try {
    const response = await api.post(`${basePath}/latest`, payload);
    return response.data;
  } catch (error) {
    console.error('getLatestLanterns error:', error);
    throw error;
  }
};

export const getRecommendationLanterns = async (
  payload: CountRequest
): Promise<LanternBlessingVO[]> => {
  try {
    const response = await api.post(`${basePath}/recommendation`, payload);
    return response.data;
  } catch (error) {
    console.error('getRecommendationLanterns error:', error);
    throw error;
  }
};

export const getRankLanterns = async (payload: CountRequest): Promise<LanternBlessingVO[]> => {
  try {
    const response = await api.post(`${basePath}/rank`, payload);
    return response.data;
  } catch (error) {
    console.error('getRankLanterns error:', error);
    throw error;
  }
};

export const getLanternByCode = async (code: string): Promise<LanternVO> => {
  try {
    const response = await api.post(`${basePath}/${code}`);
    return response.data;
  } catch (error) {
    console.error('getLanternByCode error:', error);
    throw error;
  }
};

export const purchaseLantern = async (payload: LanternPurchaseRequest): Promise<boolean> => {
  try {
    const response = await api.post(`${basePath}/purchase/info`, payload);
    return response.data;
  } catch (error) {
    console.error('purchaseLantern error:', error);
    throw error;
  }
};
