import { api } from './FrontAPI';

const basePath = '/B09002';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface B09002QueryInsertReq {
  [key: string]: any;
}

export interface B09002BornFundReq {
  [key: string]: any;
}

/**
 * 新增並查詢基金匯款資料
 */
export const queryInsert = async (
  req: B09002QueryInsertReq
): Promise<ApiResponse<any>> => {
  try {
    const response = await api.post(`${basePath}/queryInsert`, req);
    return response.data;
  } catch (error) {
    console.error('B09002 - queryInsert error:', error);
    throw error;
  }
};

/**
 * 產生基金匯款資料
 */
export const bornFund = async (
  req: B09002BornFundReq
): Promise<ApiResponse<any>> => {
  try {
    const response = await api.post(`${basePath}/bornFund`, req);
    return response.data;
  } catch (error) {
    console.error('B09002 - bornFund error:', error);
    throw error;
  }
};
