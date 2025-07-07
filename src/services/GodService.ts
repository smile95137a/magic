// src/services/front/godServices.ts
import { God, GodInfoRequest, GodInfoVO, GodExtendPeriodRequest, OfferingVO, PresentOfferingRequest } from '@/vite-env';
import { api } from './FrontAPI';

const basePath = '/god';

export const fetchAllGod = async (): Promise<God[]> => {
  try {
    const response = await api.post(`${basePath}/list`);
    return response.data;
  } catch (error) {
    console.error('fetchAllGod error:', error);
    throw error;
  }
};

export const godDescend = async (payload: GodInfoRequest): Promise<boolean> => {
  try {
    const response = await api.post(`${basePath}/descend`, payload);
    return response.data;
  } catch (error) {
    console.error('godDescend error:', error);
    throw error;
  }
};

export const getGodInfo = async (payload: GodInfoRequest): Promise<GodInfoVO | null> => {
  try {
    const response = await api.post(`${basePath}/info`, payload);
    return response.data.data;
  } catch (error) {
    console.error('getGodInfo error:', error);
    throw error;
  }
};

export const extendGodPeriod = async (
  payload: GodExtendPeriodRequest
): Promise<boolean> => {
  try {
    const response = await api.post(`${basePath}/extend`, payload);
    return response.data;
  } catch (error) {
    console.error('extendGodPeriod error:', error);
    throw error;
  }
};

export const fetchOfferingList = async (): Promise<OfferingVO[]> => {
  try {
    const response = await api.post(`${basePath}/offering/list`);
    return response.data;
  } catch (error) {
    console.error('fetchOfferingList error:', error);
    throw error;
  }
};

export const presentOffering = async (
  payload: PresentOfferingRequest
): Promise<GodInfoVO> => {
  try {
    const response = await api.post(`${basePath}/offering/present`, payload);
    return response.data;
  } catch (error) {
    console.error('presentOffering error:', error);
    throw error;
  }
};
