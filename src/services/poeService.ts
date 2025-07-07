// src/services/front/poeServices.ts
import { CountRequest, PoeRankVO } from '@/vite-env';
import { api } from './FrontAPI';

const basePath = '/poe';

export const getPoeRank = async (payload: CountRequest): Promise<PoeRankVO[]> => {
  try {
    const response = await api.post(`${basePath}/rank`, payload);
    return response.data;
  } catch (error) {
    console.error('getPoeRank error:', error);
    throw error;
  }
};

export const addSiunnPoe = async (payload: CountRequest): Promise<boolean> => {
  try {
    const response = await api.post(`${basePath}/siunn`, payload);
    return response.data;
  } catch (error) {
    console.error('addSiunnPoe error:', error);
    throw error;
  }
};
