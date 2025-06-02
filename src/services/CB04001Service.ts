import { api } from './FrontAPI';

const basePath = '/cb04001';

export interface CB04001QueryReq {
  [key: string]: any;
}

export interface CB04001QueryDetailReq {
  [key: string]: any;
}

export interface CB04001SendReq {
  [key: string]: any;
}

export interface QueryCustomerNameReq {
  searchCode?: string;
  searchName?: string;
}

/**
 * 取得「地區」選項
 */
export const getUserProfileAreasOptions = async (): Promise<
  ApiResponse<any[]>
> => {
  try {
    const response = await api.post(`${basePath}/getUserProfileAreasOptions`);
    return response.data;
  } catch (error) {
    console.error('CB04001 - getUserProfileAreasOptions error:', error);
    throw error;
  }
};

/**
 * 取得「公司名稱」選項
 */
export const getCompanyNameOptions = async (): Promise<ApiResponse<any[]>> => {
  try {
    const response = await api.post(`${basePath}/getCompanyNameOptions`);
    return response.data;
  } catch (error) {
    console.error('CB04001 - getCompanyNameOptions error:', error);
    throw error;
  }
};

/**
 * 查詢「公司名稱」小視窗
 */
export const queryCustomerName = async (
  req: QueryCustomerNameReq
): Promise<ApiResponse<any[]>> => {
  try {
    const response = await api.post(`${basePath}/queryCustomerName`, req);
    return response.data;
  } catch (error) {
    console.error('CB04001 - queryCustomerName error:', error);
    throw error;
  }
};

/**
 * 查詢主檔列表
 */
export const queryCB04001List = async (
  req: CB04001QueryReq
): Promise<ApiResponse<any>> => {
  try {
    const response = await api.post(`${basePath}/query`, req);
    return response.data;
  } catch (error) {
    console.error('CB04001 - queryCB04001List error:', error);
    throw error;
  }
};

/**
 * 查詢主檔與明細列表
 */
export const queryCB04001Detail = async (
  req: CB04001QueryDetailReq
): Promise<ApiResponse<any>> => {
  try {
    const response = await api.post(`${basePath}/queryDetail`, req);
    return response.data;
  } catch (error) {
    console.error('CB04001 - queryCB04001Detail error:', error);
    throw error;
  }
};

/**
 * 檢核是否允許下載遞送單
 */
export const isAllowDownloadDocument = async (
  fileIndex: string
): Promise<ApiResponse<any>> => {
  try {
    const response = await api.post(
      `${basePath}/isAllowDownloadDocument/${fileIndex}`
    );
    return response.data;
  } catch (error) {
    console.error('CB04001 - isAllowDownloadDocument error:', error);
    throw error;
  }
};

/**
 * 下載遞送單（此為觸發下載，無實際回傳資料）
 */
export const downloadDocument = async (fileIndex: string): Promise<void> => {
  try {
    await api.post(
      `${basePath}/downloadDocument/${fileIndex}`,
      {},
      { responseType: 'blob' }
    );
  } catch (error) {
    console.error('CB04001 - downloadDocument error:', error);
    throw error;
  }
};

/**
 * 傳送遞送單
 */
export const sendCB04001Document = async (
  req: CB04001SendReq
): Promise<ApiResponse<any>> => {
  try {
    const response = await api.post(`${basePath}/send`, req);
    return response.data;
  } catch (error) {
    console.error('CB04001 - sendCB04001Document error:', error);
    throw error;
  }
};
