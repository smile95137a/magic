// services/frontend/b01002Service.ts

import { api } from './FrontAPI';

const basePath = '/b01002';

interface RequestData {
  [key: string]: any;
}

/** ▼ 下拉選單與基本查詢 */
export const getRegionOptions = async (): Promise<ApiResponse<any[]>> => {
  try {
    const res = await api.post(`${basePath}/getRegionOptions`);
    return res.data;
  } catch (e) {
    console.error('B01002 - getRegionOptions error:', e);
    throw e;
  }
};

export const getCustomerTypeOptions = async (): Promise<ApiResponse<any[]>> => {
  try {
    const res = await api.post(`${basePath}/getCustomerTypeOptions`);
    return res.data;
  } catch (e) {
    console.error('B01002 - getCustomerTypeOptions error:', e);
    throw e;
  }
};

export const getCustomerIdOptions = async (): Promise<ApiResponse<any[]>> => {
  try {
    const res = await api.post(`${basePath}/getCustomerIdOptions`);
    return res.data;
  } catch (e) {
    console.error('B01002 - getCustomerIdOptions error:', e);
    throw e;
  }
};

export const queryCustomerName = async (
  req: RequestData
): Promise<ApiResponse<any[]>> => {
  try {
    const res = await api.post(`${basePath}/queryCustomerName`, req);
    return res.data;
  } catch (e) {
    console.error('B01002 - queryCustomerName error:', e);
    throw e;
  }
};

export const getBizuserStatusFlagOptions = async (): Promise<
  ApiResponse<any[]>
> => {
  try {
    const res = await api.post(`${basePath}/getBizuserStatusFlagOptions`);
    return res.data;
  } catch (e) {
    console.error('B01002 - getBizuserStatusFlagOptions error:', e);
    throw e;
  }
};

export const queryBizuser = async (
  req: RequestData
): Promise<ApiResponse<any[]>> => {
  try {
    const res = await api.post(`${basePath}/query`, req);
    return res.data;
  } catch (e) {
    console.error('B01002 - queryBizuser error:', e);
    throw e;
  }
};

/** ▼ 使用者基本操作 */
export const deleteBizuser = async (
  req: RequestData
): Promise<ApiResponse<any>> => {
  try {
    const res = await api.post(`${basePath}/delete`, req);
    return res.data;
  } catch (e) {
    console.error('B01002 - deleteBizuser error:', e);
    throw e;
  }
};

export const enableBizuser = async (
  req: RequestData
): Promise<ApiResponse<any>> => {
  try {
    const res = await api.post(`${basePath}/enable`, req);
    return res.data;
  } catch (e) {
    console.error('B01002 - enableBizuser error:', e);
    throw e;
  }
};

export const disableBizuser = async (
  req: RequestData
): Promise<ApiResponse<any>> => {
  try {
    const res = await api.post(`${basePath}/disable`, req);
    return res.data;
  } catch (e) {
    console.error('B01002 - disableBizuser error:', e);
    throw e;
  }
};

export const getBizuserData = async (
  req: RequestData
): Promise<ApiResponse<any>> => {
  try {
    const res = await api.post(`${basePath}/bizuser`, req);
    return res.data;
  } catch (e) {
    console.error('B01002 - getBizuserData error:', e);
    throw e;
  }
};

/** ▼ 密碼重設 */
export const getBizuserResetPwdData = async (
  req: RequestData
): Promise<ApiResponse<any>> => {
  try {
    const res = await api.post(`${basePath}/bizuserResetPwd`, req);
    return res.data;
  } catch (e) {
    console.error('B01002 - getBizuserResetPwdData error:', e);
    throw e;
  }
};

export const resetBizuserPwd = async (
  req: RequestData
): Promise<ApiResponse<any>> => {
  try {
    const res = await api.post(`${basePath}/resetPwd`, req);
    return res.data;
  } catch (e) {
    console.error('B01002 - resetBizuserPwd error:', e);
    throw e;
  }
};

/** ▼ 業務功能與媒體設定 */
export const getBizuserBusiness = async (
  req: RequestData
): Promise<ApiResponse<any[]>> => {
  try {
    const res = await api.post(`${basePath}/bizuserBusiness`, req);
    return res.data;
  } catch (e) {
    console.error('B01002 - getBizuserBusiness error:', e);
    throw e;
  }
};

export const getBizuserBusinessFiles = async (
  req: RequestData
): Promise<ApiResponse<any[]>> => {
  try {
    const res = await api.post(`${basePath}/bizuserBusinessFiles`, req);
    return res.data;
  } catch (e) {
    console.error('B01002 - getBizuserBusinessFiles error:', e);
    throw e;
  }
};

/** ▼ 媒體授權 */
export const getBizuserRelationFiles = async (
  req: RequestData
): Promise<ApiResponse<any[]>> => {
  try {
    const res = await api.post(`${basePath}/bizuserRelationFiles`, req);
    return res.data;
  } catch (e) {
    console.error('B01002 - getBizuserRelationFiles error:', e);
    throw e;
  }
};

export const queryBizuserRelationFiles = async (
  req: RequestData
): Promise<ApiResponse<any[]>> => {
  try {
    const res = await api.post(`${basePath}/queryBizuserRelationFiles`, req);
    return res.data;
  } catch (e) {
    console.error('B01002 - queryBizuserRelationFiles error:', e);
    throw e;
  }
};

export const createBizuserRelationFiles = async (
  req: RequestData
): Promise<ApiResponse<any>> => {
  try {
    const res = await api.post(`${basePath}/createBizuserRelationFiles`, req);
    return res.data;
  } catch (e) {
    console.error('B01002 - createBizuserRelationFiles error:', e);
    throw e;
  }
};

export const deleteBizuserRelationFiles = async (
  req: RequestData
): Promise<ApiResponse<any>> => {
  try {
    const res = await api.post(`${basePath}/deleteBizuserRelationFiles`, req);
    return res.data;
  } catch (e) {
    console.error('B01002 - deleteBizuserRelationFiles error:', e);
    throw e;
  }
};

/** ▼ 關係企業選項與查詢 */
export const getBizuserRelationOptions = async (
  req: RequestData
): Promise<ApiResponse<any[]>> => {
  try {
    const res = await api.post(`${basePath}/getBizuserRelationOptions`, req);
    return res.data;
  } catch (e) {
    console.error('B01002 - getBizuserRelationOptions error:', e);
    throw e;
  }
};

export const queryBizuserRelationName = async (
  req: RequestData
): Promise<ApiResponse<any[]>> => {
  try {
    const res = await api.post(`${basePath}/queryBizuserRelationName`, req);
    return res.data;
  } catch (e) {
    console.error('B01002 - queryBizuserRelationName error:', e);
    throw e;
  }
};

export const isBizuserRelationFilesTabVisible = async (
  req: RequestData
): Promise<ApiResponse<boolean>> => {
  try {
    const res = await api.post(
      `${basePath}/isBizuserRelationFilesTabVisible`,
      req
    );
    return res.data;
  } catch (e) {
    console.error('B01002 - isBizuserRelationFilesTabVisible error:', e);
    throw e;
  }
};

/** ▼ 通知訊息訂閱 */
export const getBizuserMsg = async (
  req: RequestData
): Promise<ApiResponse<any[]>> => {
  try {
    const res = await api.post(`${basePath}/bizuserMsg`, req);
    return res.data;
  } catch (e) {
    console.error('B01002 - getBizuserMsg error:', e);
    throw e;
  }
};

/** ▼ 使用者資料驗證與送出 */
export const getSsoUser = async (
  req: RequestData
): Promise<ApiResponse<string>> => {
  try {
    const res = await api.post(`${basePath}/getSsoUser`, req);
    return res.data;
  } catch (e) {
    console.error('B01002 - getSsoUser error:', e);
    throw e;
  }
};

export const getCustomerType = async (
  req: RequestData
): Promise<ApiResponse<string>> => {
  try {
    const res = await api.post(`${basePath}/getCustomerType`, req);
    return res.data;
  } catch (e) {
    console.error('B01002 - getCustomerType error:', e);
    throw e;
  }
};

export const checkBizuserCodeExists = async (
  req: RequestData
): Promise<ApiResponse<any>> => {
  try {
    const res = await api.post(`${basePath}/checkBizuserCodeExists`, req);
    return res.data;
  } catch (e) {
    console.error('B01002 - checkBizuserCodeExists error:', e);
    throw e;
  }
};

export const saveBizuserData = async (
  req: RequestData
): Promise<ApiResponse<any>> => {
  try {
    const res = await api.post(`${basePath}/save`, req);
    return res.data;
  } catch (e) {
    console.error('B01002 - saveBizuserData error:', e);
    throw e;
  }
};

export const commitBizuserData = async (
  req: RequestData
): Promise<ApiResponse<any>> => {
  try {
    const res = await api.post(`${basePath}/commit`, req);
    return res.data;
  } catch (e) {
    console.error('B01002 - commitBizuserData error:', e);
    throw e;
  }
};

export const cancelBizuserApplication = async (
  req: RequestData
): Promise<ApiResponse<any>> => {
  try {
    const res = await api.post(`${basePath}/cancel`, req);
    return res.data;
  } catch (e) {
    console.error('B01002 - cancelBizuserApplication error:', e);
    throw e;
  }
};

export const clearBizuserWork = async (
  req: RequestData
): Promise<ApiResponse<any>> => {
  try {
    const res = await api.post(`${basePath}/clearBizuserWork`, req);
    return res.data;
  } catch (e) {
    console.error('B01002 - clearBizuserWork error:', e);
    throw e;
  }
};
