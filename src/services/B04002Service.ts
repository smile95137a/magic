// apis/B04002API.ts
import { api } from './FrontAPI';

const basePath = '/B04002';

/**
 * 取得「格式範本名稱」下拉選單
 */
export const getPaySetupUuidOptions = async (req: any) => {
  try {
    const response = await api.post(`${basePath}/getPaySetupUuidOptions`, req);
    return response.data;
  } catch (error) {
    console.error('Error fetching format name options:', error);
    throw error;
  }
};

/**
 * 取得「欄位」下拉選單
 */
export const getPaySetupParamsOptions = async (req: any) => {
  try {
    const response = await api.post(
      `${basePath}/getPaySetupParamsOptions`,
      req
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching param options:', error);
    throw error;
  }
};

/**
 * 取得預設欄位明細
 */
export const getDefaultPaySetupDetail = async (req: any) => {
  try {
    const response = await api.post(
      `${basePath}/getDefaultPaySetupDetail`,
      req
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching default details:', error);
    throw error;
  }
};

/**
 * 檢查格式範本名稱是否重複
 */
export const checkNameRepeat = async (name: string) => {
  try {
    const response = await api.post(
      `${basePath}/checkNameRepeat/${encodeURIComponent(name)}`
    );
    return response.data;
  } catch (error) {
    console.error('Error checking name repeat:', error);
    throw error;
  }
};

/**
 * 取得單一欄位資料（依欄位 UUID）
 */
export const getPaySetupParam = async (uuid: string) => {
  try {
    const response = await api.post(`${basePath}/getPaySetupParam/${uuid}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching param by UUID:', error);
    throw error;
  }
};

/**
 * 儲存資料格式範本
 */
export const savePaySetup = async (req: any) => {
  try {
    const response = await api.post(`${basePath}/save`, req);
    return response.data;
  } catch (error) {
    console.error('Error saving pay setup:', error);
    throw error;
  }
};

/**
 * 查詢格式範本（依格式範本 UUID）
 */
export const queryByPaySetupUuid = async (uuid: string) => {
  try {
    const response = await api.post(`${basePath}/queryByPaySetupUuid/${uuid}`);
    return response.data;
  } catch (error) {
    console.error('Error querying by UUID:', error);
    throw error;
  }
};

/**
 * 查詢格式範本（複數條件）
 */
export const queryPaySetups = async (req: any) => {
  try {
    const response = await api.post(`${basePath}/query`, req);
    return response.data;
  } catch (error) {
    console.error('Error querying pay setups:', error);
    throw error;
  }
};

/**
 * 刪除格式範本
 */
export const deletePaySetups = async (delList: string[]) => {
  try {
    const response = await api.post(`${basePath}/delete`, delList);
    return response.data;
  } catch (error) {
    console.error('Error deleting pay setups:', error);
    throw error;
  }
};
