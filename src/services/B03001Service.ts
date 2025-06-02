import { api } from './FrontAPI';

const basePath = '/B03001';

/**
 * 取得地區下拉選單
 */
export const getUserProfileAreasOptions = async (): Promise<
  ApiResponse<any[]>
> => {
  try {
    const response = await api.post(`${basePath}/getUserProfileAreasOptions`);
    return response.data;
  } catch (error) {
    console.error('B03001 - getUserProfileAreasOptions error:', error);
    throw error;
  }
};

/**
 * 取得系統下拉選單
 */
export const getSystemTypeOptions = async (): Promise<ApiResponse<any[]>> => {
  try {
    const response = await api.post(`${basePath}/getSystemTypeOptions`);
    return response.data;
  } catch (error) {
    console.error('B03001 - getSystemTypeOptions error:', error);
    throw error;
  }
};

/**
 * 取得公司名稱下拉選單
 */
export const getCompanyNameOptions = async (): Promise<ApiResponse<any[]>> => {
  try {
    const response = await api.post(`${basePath}/getCompanyNameOptions`);
    return response.data;
  } catch (error) {
    console.error('B03001 - getCompanyNameOptions error:', error);
    throw error;
  }
};

/**
 * 查詢公司名稱（小視窗）
 */
export const queryCustomerName = async (
  req: any
): Promise<ApiResponse<any[]>> => {
  try {
    const response = await api.post(`${basePath}/queryCustomerName`, req);
    return response.data;
  } catch (error) {
    console.error('B03001 - queryCustomerName error:', error);
    throw error;
  }
};

/**
 * 取得公司代號下拉選單
 */
export const getCompanyNoOptions = async (
  req: any
): Promise<ApiResponse<any[]>> => {
  try {
    const response = await api.post(`${basePath}/getCompanyNoOptions`, req);
    return response.data;
  } catch (error) {
    console.error('B03001 - getCompanyNoOptions error:', error);
    throw error;
  }
};

/**
 * 取得檔案類型下拉選單
 */
export const getFileTypeOptions = async (): Promise<ApiResponse<any[]>> => {
  try {
    const response = await api.post(`${basePath}/getFileTypeOptions`);
    return response.data;
  } catch (error) {
    console.error('B03001 - getFileTypeOptions error:', error);
    throw error;
  }
};

/**
 * 取得自動化狀態下拉選單
 */
export const getAutoStatusOptions = async (): Promise<ApiResponse<any[]>> => {
  try {
    const response = await api.post(`${basePath}/getAutoStatusOptions`);
    return response.data;
  } catch (error) {
    console.error('B03001 - getAutoStatusOptions error:', error);
    throw error;
  }
};

/**
 * 取得原狀態與修改狀態下拉選單
 */
export const getOrgStatusOptions = async (): Promise<ApiResponse<any[]>> => {
  try {
    const response = await api.post(`${basePath}/getOrgStatusOptions`);
    return response.data;
  } catch (error) {
    console.error('B03001 - getOrgStatusOptions error:', error);
    throw error;
  }
};

/**
 * 查詢主清單
 */
export const queryB03001 = async (req: any): Promise<ApiResponse<any>> => {
  try {
    const response = await api.post(`${basePath}/query`, req);
    return response.data;
  } catch (error) {
    console.error('B03001 - query error:', error);
    throw error;
  }
};

/**
 * 查詢編輯資料（非外幣）
 */
export const queryEdit = async (req: any): Promise<ApiResponse<any>> => {
  try {
    const response = await api.post(`${basePath}/queryEdit`, req);
    return response.data;
  } catch (error) {
    console.error('B03001 - queryEdit error:', error);
    throw error;
  }
};

/**
 * 查詢編輯資料（外幣）
 */
export const queryCurrency = async (req: any): Promise<ApiResponse<any>> => {
  try {
    const response = await api.post(`${basePath}/queryCurrency`, req);
    return response.data;
  } catch (error) {
    console.error('B03001 - queryCurrency error:', error);
    throw error;
  }
};

/**
 * 整批修改
 */
export const batchEdit = async (req: any): Promise<ApiResponse<any>> => {
  try {
    const response = await api.post(`${basePath}/batchEdit`, req);
    return response.data;
  } catch (error) {
    console.error('B03001 - batchEdit error:', error);
    throw error;
  }
};

/**
 * 勾選修改
 */
export const chooseEdit = async (req: any): Promise<ApiResponse<any>> => {
  try {
    const response = await api.post(`${basePath}/chooseEdit`, req);
    return response.data;
  } catch (error) {
    console.error('B03001 - chooseEdit error:', error);
    throw error;
  }
};

/**
 * 取消申請
 */
export const cancel = async (req: any): Promise<ApiResponse<any>> => {
  try {
    const response = await api.post(`${basePath}/cancel`, req);
    return response.data;
  } catch (error) {
    console.error('B03001 - cancel error:', error);
    throw error;
  }
};

/**
 * 儲存資料
 */
export const save = async (req: any): Promise<ApiResponse<any>> => {
  try {
    const response = await api.post(`${basePath}/save`, req);
    return response.data;
  } catch (error) {
    console.error('B03001 - save error:', error);
    throw error;
  }
};

/**
 * 送審
 */
export const send = async (req: any): Promise<ApiResponse<any>> => {
  try {
    const response = await api.post(`${basePath}/send`, req);
    return response.data;
  } catch (error) {
    console.error('B03001 - send error:', error);
    throw error;
  }
};
