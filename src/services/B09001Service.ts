import { api } from './FrontAPI';

const basePath = '/B09001';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

interface RequestData {
  [key: string]: any;
}

/**
 * 取得「公司名稱」下拉選單
 */
export const getCustomerIdOptions = async (): Promise<ApiResponse<any[]>> => {
  try {
    const response = await api.post(`${basePath}/getCustomerIdOptions`);
    return response.data;
  } catch (error) {
    console.error('B09001 - getCustomerIdOptions error:', error);
    throw error;
  }
};

/**
 * 「公司名稱」小視窗 - 查詢
 */
export const queryCustomerId = async (
  req: RequestData
): Promise<ApiResponse<any[]>> => {
  try {
    const response = await api.post(`${basePath}/queryCustomerId`, req);
    return response.data;
  } catch (error) {
    console.error('B09001 - queryCustomerId error:', error);
    throw error;
  }
};

/**
 * 取得「資料狀態」下拉選單
 */
export const getStatusflagOptions = async (): Promise<ApiResponse<any[]>> => {
  try {
    const response = await api.post(`${basePath}/getStatusflagOptions`);
    return response.data;
  } catch (error) {
    console.error('B09001 - getStatusflagOptions error:', error);
    throw error;
  }
};

/**
 * 取得「公司代號」下拉選單
 */
export const getCompanyNoOptions = async (): Promise<ApiResponse<any[]>> => {
  try {
    const response = await api.post(`${basePath}/getCompanyNoOptions`);
    return response.data;
  } catch (error) {
    console.error('B09001 - getCompanyNoOptions error:', error);
    throw error;
  }
};

/**
 * 查詢匯款人資訊
 */
export const queryRemit = async (): Promise<ApiResponse<any>> => {
  try {
    const response = await api.post(`${basePath}/queryRemit`);
    return response.data;
  } catch (error) {
    console.error('B09001 - queryRemit error:', error);
    throw error;
  }
};

/**
 * 檢核統編是否存在
 */
export const checkCodeInMain = async (
  req: RequestData
): Promise<ApiResponse<boolean>> => {
  try {
    const response = await api.post(`${basePath}/checkCodeInMain`, req);
    return response.data;
  } catch (error) {
    console.error('B09001 - checkCodeInMain error:', error);
    throw error;
  }
};

/**
 * 檢核統編+公司代號+基金代號是否存在
 */
export const isExistInFundApply = async (
  req: RequestData
): Promise<ApiResponse<boolean>> => {
  try {
    const response = await api.post(`${basePath}/isExistInFundApply`, req);
    return response.data;
  } catch (error) {
    console.error('B09001 - isExistInFundApply error:', error);
    throw error;
  }
};

/**
 * 查詢基金列表
 */
export const queryFundList = async (
  req: RequestData
): Promise<ApiResponse<any>> => {
  try {
    const response = await api.post(`${basePath}/query`, req);
    return response.data;
  } catch (error) {
    console.error('B09001 - queryFundList error:', error);
    throw error;
  }
};

/**
 * 單筆查詢
 */
export const queryOneByEdit = async (
  req: RequestData
): Promise<ApiResponse<any>> => {
  try {
    const response = await api.post(`${basePath}/queryOneByEdit`, req);
    return response.data;
  } catch (error) {
    console.error('B09001 - queryOneByEdit error:', error);
    throw error;
  }
};

/**
 * 儲存匯款人資訊
 */
export const saveRemit = async (
  req: RequestData
): Promise<ApiResponse<any>> => {
  try {
    const response = await api.post(`${basePath}/saveRemit`, req);
    return response.data;
  } catch (error) {
    console.error('B09001 - saveRemit error:', error);
    throw error;
  }
};

/**
 * 新增基金資料
 */
export const addFund = async (req: RequestData): Promise<ApiResponse<any>> => {
  try {
    const response = await api.post(`${basePath}/add`, req);
    return response.data;
  } catch (error) {
    console.error('B09001 - addFund error:', error);
    throw error;
  }
};

/**
 * 修改基金資料
 */
export const editFund = async (req: RequestData): Promise<ApiResponse<any>> => {
  try {
    const response = await api.post(`${basePath}/edit`, req);
    return response.data;
  } catch (error) {
    console.error('B09001 - editFund error:', error);
    throw error;
  }
};

/**
 * 新增送審
 */
export const addSubmitReview = async (
  req: RequestData
): Promise<ApiResponse<any>> => {
  try {
    const response = await api.post(`${basePath}/addSubmitReview`, req);
    return response.data;
  } catch (error) {
    console.error('B09001 - addSubmitReview error:', error);
    throw error;
  }
};

/**
 * 修改送審
 */
export const editSubmitReview = async (
  req: RequestData
): Promise<ApiResponse<any>> => {
  try {
    const response = await api.post(`${basePath}/editSubmitReview`, req);
    return response.data;
  } catch (error) {
    console.error('B09001 - editSubmitReview error:', error);
    throw error;
  }
};

/**
 * 取消申請
 */
export const cancelApply = async (
  req: RequestData
): Promise<ApiResponse<any>> => {
  try {
    const response = await api.post(`${basePath}/cancelApply`, req);
    return response.data;
  } catch (error) {
    console.error('B09001 - cancelApply error:', error);
    throw error;
  }
};

/**
 * 刪除基金資料
 */
export const deleteFunds = async (
  fundIds: string[]
): Promise<ApiResponse<any>> => {
  try {
    const response = await api.post(`${basePath}/delete`, fundIds);
    return response.data;
  } catch (error) {
    console.error('B09001 - deleteFunds error:', error);
    throw error;
  }
};

/**
 * 啟用基金資料
 */
export const enableFunds = async (
  fundIds: string[]
): Promise<ApiResponse<any>> => {
  try {
    const response = await api.post(`${basePath}/enable`, fundIds);
    return response.data;
  } catch (error) {
    console.error('B09001 - enableFunds error:', error);
    throw error;
  }
};
