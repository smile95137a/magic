// src/services/front/masterServices.ts
import { MasterVO, MasterServiceRequest } from '@/vite-env';
import { api } from './FrontAPI';

const basePath = '/master';

export const fetchMasterList = async (): Promise<MasterVO[]> => {
  try {
    const response = await api.post(`${basePath}/list`);
    return response.data;
  } catch (error) {
    console.error('fetchMasterList error:', error);
    throw error;
  }
};

export const reserveMasterService = async (
  payload: MasterServiceRequest
): Promise<string> => {
  try {
    const response = await api.post(`${basePath}/reservation`, payload);
    return response.data.data;
  } catch (error) {
    console.error('reserveMasterService error:', error);
    throw error;
  }
};
