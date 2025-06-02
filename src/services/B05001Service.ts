import { api } from './FrontAPI';

const basePath = '/B05001';

/**
 * 取得情境走向
 */
export const getTabId = async (): Promise<ApiResponse<any>> => {
  try {
    const response = await api.post(`${basePath}/getTabId`);
    return response.data;
  } catch (error) {
    console.error('B05001 - getTabId error:', error);
    throw error;
  }
};

/**
 * 查詢客戶資料列表
 */
export const queryCustomerDataList = async (): Promise<ApiResponse<any>> => {
  try {
    const response = await api.post(`${basePath}/queryCustomerDataList`);
    return response.data;
  } catch (error) {
    console.error('B05001 - queryCustomerDataList error:', error);
    throw error;
  }
};

/**
 * 查詢單筆客戶資料
 */
export const queryCustomerData = async (
  req: any
): Promise<ApiResponse<any>> => {
  try {
    const response = await api.post(`${basePath}/queryCustomerData`, req);
    return response.data;
  } catch (error) {
    console.error('B05001 - queryCustomerData error:', error);
    throw error;
  }
};

/**
 * 取得多筆核准提示訊息
 */
export const getApproveMsgCustomerData = async (
  customerIds: string[]
): Promise<ApiResponse<any>> => {
  try {
    const response = await api.post(
      `${basePath}/getApproveMsgCustomerData`,
      customerIds
    );
    return response.data;
  } catch (error) {
    console.error('B05001 - getApproveMsgCustomerData error:', error);
    throw error;
  }
};

/**
 * 核准客戶資料
 */
export const approveCustomerData = async (
  req: any
): Promise<ApiResponse<any>> => {
  try {
    const response = await api.post(`${basePath}/approveCustomerData`, req);
    return response.data;
  } catch (error) {
    console.error('B05001 - approveCustomerData error:', error);
    throw error;
  }
};

/**
 * 退件客戶資料
 */
export const rejectCustomerData = async (
  req: any
): Promise<ApiResponse<any>> => {
  try {
    const response = await api.post(`${basePath}/rejectCustomerData`, req);
    return response.data;
  } catch (error) {
    console.error('B05001 - rejectCustomerData error:', error);
    throw error;
  }
};
