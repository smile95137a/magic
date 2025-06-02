// apis/B04007API.ts
import { api } from './FrontAPI';

const basePath = '/B04007';

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
    console.error('Error fetching full biller infos options:', error);
    throw error;
  }
};

/**
 * 取得「版型」下拉選單
 */
export const getBillerStyleOptions = async (req: any) => {
  try {
    const response = await api.post(`${basePath}/getBillerStyleOptions`, req);
    return response.data;
  } catch (error) {
    console.error('Error fetching biller style options:', error);
    throw error;
  }
};

/**
 * 取得「費用明細列表-費用明細」下拉選單
 */
export const getPaySelectOptions = async (req: any) => {
  try {
    const response = await api.post(`${basePath}/getPaySelectOptions`, req);
    return response.data;
  } catch (error) {
    console.error('Error fetching pay select options:', error);
    throw error;
  }
};

/**
 * 取得畫面控制相關資訊
 */
export const getFieldsForBillerInfos = async (req: any) => {
  try {
    const response = await api.post(`${basePath}/getFieldsForBillerInfos`, req);
    return response.data;
  } catch (error) {
    console.error('Error fetching fields for biller infos:', error);
    throw error;
  }
};

/**
 * 查詢資料
 */
export const queryB04007 = async (req: any) => {
  try {
    const response = await api.post(`${basePath}/query`, req);
    return response.data;
  } catch (error) {
    console.error('Error querying B04007:', error);
    throw error;
  }
};

/**
 * 依 payDetailUuid 查詢單筆
 */
export const queryByPayDetailUuid = async (payDetailUuid: string) => {
  try {
    const response = await api.post(
      `${basePath}/queryByPayDetailUuid/${payDetailUuid}`
    );
    return response.data;
  } catch (error) {
    console.error('Error querying by payDetailUuid:', error);
    throw error;
  }
};

/**
 * 檢核是否有空的流水號
 */
export const checkMaxSerialNum = async (businessType: string) => {
  try {
    const response = await api.post(
      `${basePath}/checkMaxSerialNum/${businessType}`
    );
    return response.data;
  } catch (error) {
    console.error('Error checking max serial num:', error);
    throw error;
  }
};

/**
 * 儲存單筆繳費單製作
 */
export const saveB04007 = async (req: any) => {
  try {
    const response = await api.post(`${basePath}/save`, req);
    return response.data;
  } catch (error) {
    console.error('Error saving B04007:', error);
    throw error;
  }
};

/**
 * 刪除單筆繳費單製作
 */
export const deleteB04007 = async (req: any) => {
  try {
    const response = await api.post(`${basePath}/delete`, req);
    return response.data;
  } catch (error) {
    console.error('Error deleting B04007:', error);
    throw error;
  }
};

/**
 * 繳費單下載
 */
export const printPayDetail = async (payDetailUuid: string) => {
  try {
    const response = await api.post(
      `${basePath}/print/${payDetailUuid}`,
      null,
      {
        responseType: 'blob', // 若是下載 PDF 或檔案
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error printing pay detail:', error);
    throw error;
  }
};
