// src/services/admin/adminMasterServices.ts
import { MasterAdminVO, MasterRequest } from '@/vite-env';
import { api } from '../FrontAPI';

const basePath = '/admin/master';

/**
 * 取得所有老師清單
 */
export const fetchAllMasters = async (): Promise<MasterAdminVO[]> => {
  try {
    const res = await api.post(`${basePath}/list`);
    return res.data;
  } catch (error) {
    console.error('fetchAllMasters error:', error);
    throw error;
  }
};

/**
 * 新增老師
 */
export const addMaster = async (payload: MasterRequest): Promise<boolean> => {
  try {
    const res = await api.post(`${basePath}/add`, payload);
    return res.data;
  } catch (error) {
    console.error('addMaster error:', error);
    throw error;
  }
};

/**
 * 修改老師資料
 */
export const modifyMaster = async (payload: MasterRequest): Promise<boolean> => {
  try {
    const res = await api.post(`${basePath}/modify`, payload);
    return res.data;
  } catch (error) {
    console.error('modifyMaster error:', error);
    throw error;
  }
};
