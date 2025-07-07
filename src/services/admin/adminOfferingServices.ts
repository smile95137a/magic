// src/services/admin/adminOfferingServices.ts
import { OfferingVO } from '@/vite-env';
import { api } from '../FrontAPI';

const basePath = '/admin/offering';

/**
 * 查詢供品清單
 */
export const fetchOfferingList = async (): Promise<OfferingVO[]> => {
  try {
    const res = await api.post(`${basePath}/list`);
    return res.data;
  } catch (error) {
    console.error('fetchOfferingList error:', error);
    throw error;
  }
};

/**
 * 新增供品
 */
export const addOffering = async (payload: OfferingVO): Promise<boolean> => {
  try {
    const res = await api.post(`${basePath}/add`, payload);
    return res.data;
  } catch (error) {
    console.error('addOffering error:', error);
    throw error;
  }
};

/**
 * 修改供品
 */
export const modifyOffering = async (payload: OfferingVO): Promise<boolean> => {
  try {
    const res = await api.post(`${basePath}/modify`, payload);
    return res.data;
  } catch (error) {
    console.error('modifyOffering error:', error);
    throw error;
  }
};

// 若日後有開放刪除，可加上
// /**
//  * 刪除供品
//  */
// export const deleteOfferingById = async (id: string): Promise<boolean> => {
//   try {
//     const res = await api.post(`${basePath}/delete/${id}`);
//     return res.data;
//   } catch (error) {
//     console.error('deleteOfferingById error:', error);
//     throw error;
//   }
// };
