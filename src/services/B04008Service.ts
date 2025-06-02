// apis/B04008API.ts
import { api } from './FrontAPI';

const basePath = '/B04008';

/**
 * 取得「公司名稱」下拉選單
 */
export const getCompanyIdOptions = async () => {
  try {
    const response = await api.post(`${basePath}/getCompanyIdOptions`);
    return response.data;
  } catch (error) {
    console.error('Error fetching company ID options:', error);
    throw error;
  }
};

/**
 * 查詢「公司名稱」小視窗
 */
export const queryCustomerId = async (req: any) => {
  try {
    const response = await api.post(`${basePath}/queryCustomerId`, req);
    return response.data;
  } catch (error) {
    console.error('Error querying customer ID:', error);
    throw error;
  }
};

/**
 * 取得「業務類別」下拉選單
 */
export const getFullBillerInfosOptions = async (req: any) => {
  try {
    const response = await api.post(
      `${basePath}/getFullBillerInfosOptions`,
      req
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching biller infos options:', error);
    throw error;
  }
};

/**
 * 取得「繳費狀態」下拉選單
 */
export const getStatusOptions = async () => {
  try {
    const response = await api.post(`${basePath}/getStatusOptions`);
    return response.data;
  } catch (error) {
    console.error('Error fetching status options:', error);
    throw error;
  }
};

/**
 * 查詢「繳費查詢與下載」資料
 */
export const queryB04008 = async (req: any) => {
  try {
    const response = await api.post(`${basePath}/query`, req);
    return response.data;
  } catch (error) {
    console.error('Error querying B04008 data:', error);
    throw error;
  }
};

/**
 * 取得自訂欄位
 */
export const getSelectedList = async () => {
  try {
    const response = await api.post(`${basePath}/getSelectedList`);
    return response.data;
  } catch (error) {
    console.error('Error fetching selected list:', error);
    throw error;
  }
};

/**
 * 儲存自訂欄位
 */
export const editSelectedList = async (req: any) => {
  try {
    const response = await api.post(`${basePath}/edit`, req);
    return response.data;
  } catch (error) {
    console.error('Error saving selected list:', error);
    throw error;
  }
};

/**
 * Excel 下載
 */
export const downloadB04008Excel = async (req: any) => {
  try {
    const response = await api.post(`${basePath}/downloadExcel`, req, {
      responseType: 'blob',
    });
    return response.data;
  } catch (error) {
    console.error('Error downloading Excel:', error);
    throw error;
  }
};

/**
 * txt 下載
 */
export const downloadB04008Txt = async (req: any) => {
  try {
    const response = await api.post(`${basePath}/downloadTxt`, req, {
      responseType: 'blob',
    });
    return response.data;
  } catch (error) {
    console.error('Error downloading txt:', error);
    throw error;
  }
};
