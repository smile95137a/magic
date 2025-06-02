import { api } from './FrontAPI';

const basePath = '/b01001';

/** 載入角色所屬地區下拉式選單 */
export const getRegionOptions = async () => {
  try {
    const response = await api.post(`${basePath}/getRegionOptions`);
    return response.data;
  } catch (error) {
    console.error('Error fetching region options:', error);
    throw error;
  }
};

/** 載入客戶別下拉式選單 */
export const getCustomerTypeOptions = async () => {
  try {
    const response = await api.post(`${basePath}/getCustomerTypeOptions`);
    return response.data;
  } catch (error) {
    console.error('Error fetching customer type options:', error);
    throw error;
  }
};

/** 載入公司名稱下拉式選單 */
export const getCustomerIdOptions = async () => {
  try {
    const response = await api.post(`${basePath}/getCustomerIdOptions`);
    return response.data;
  } catch (error) {
    console.error('Error fetching customer ID options:', error);
    throw error;
  }
};

/** 查詢公司名稱 */
export const queryCustomerName = async (params: any) => {
  try {
    const response = await api.post(`${basePath}/queryCustomerName`, params);
    return response.data;
  } catch (error) {
    console.error('Error querying customer name:', error);
    throw error;
  }
};

/** 載入客戶資料狀態下拉式選單 */
export const getCustomerStatusFlagOptions = async () => {
  try {
    const response = await api.post(`${basePath}/getCustomerStatusFlagOptions`);
    return response.data;
  } catch (error) {
    console.error('Error fetching customer status flags:', error);
    throw error;
  }
};

/** 查詢客戶 */
export const queryCustomer = async (params: any) => {
  try {
    const response = await api.post(`${basePath}/query`, params);
    return response.data;
  } catch (error) {
    console.error('Error querying customer:', error);
    throw error;
  }
};

/** 啟用客戶 */
export const enableCustomer = async (params: any) => {
  try {
    const response = await api.post(`${basePath}/enable`, params);
    return response.data;
  } catch (error) {
    console.error('Error enabling customer:', error);
    throw error;
  }
};

/** 停用客戶 */
export const disableCustomer = async (params: any) => {
  try {
    const response = await api.post(`${basePath}/disable`, params);
    return response.data;
  } catch (error) {
    console.error('Error disabling customer:', error);
    throw error;
  }
};

/** 載入客戶資料 */
export const getCustomerData = async (params: any) => {
  try {
    const response = await api.post(`${basePath}/customer`, params);
    return response.data;
  } catch (error) {
    console.error('Error fetching customer data:', error);
    throw error;
  }
};

/** 儲存客戶資料 */
export const saveCustomerData = async (params: any) => {
  try {
    const response = await api.post(`${basePath}/save`, params);
    return response.data;
  } catch (error) {
    console.error('Error saving customer data:', error);
    throw error;
  }
};

/** 送審客戶資料 */
export const commitCustomerData = async (params: any) => {
  try {
    const response = await api.post(`${basePath}/commit`, params);
    return response.data;
  } catch (error) {
    console.error('Error committing customer data:', error);
    throw error;
  }
};

/** 取消客戶資料申請 */
export const cancelApplication = async (params: any) => {
  try {
    const response = await api.post(`${basePath}/cancel`, params);
    return response.data;
  } catch (error) {
    console.error('Error cancelling application:', error);
    throw error;
  }
};

/** 清理客戶及使用者資料臨時檔 */
export const clearWork = async (params: any) => {
  try {
    const response = await api.post(`${basePath}/clearWork`, params);
    return response.data;
  } catch (error) {
    console.error('Error clearing work:', error);
    throw error;
  }
};

/** 載入提供繳款人專區下拉式選單 */
export const getPrintableOptions = async () => {
  try {
    const response = await api.post(`${basePath}/getPrintableOptions`);
    return response.data;
  } catch (error) {
    console.error('Error fetching printable options:', error);
    throw error;
  }
};

/** 載入網銀客戶下拉式選單 */
export const getSsoUserOptions = async () => {
  try {
    const response = await api.post(`${basePath}/getSsoUserOptions`);
    return response.data;
  } catch (error) {
    console.error('Error fetching SSO user options:', error);
    throw error;
  }
};

/** 檢查客戶統一編號是否已存在 */
export const checkCustomerCodeExists = async (params: any) => {
  try {
    const response = await api.post(
      `${basePath}/checkCustomerCodeExists`,
      params
    );
    return response.data;
  } catch (error) {
    console.error('Error checking customer code exists:', error);
    throw error;
  }
};

export const getCustomerBusiness = async (params: any) => {
  try {
    const response = await api.post(`${basePath}/customerBusiness`, params);
    return response.data;
  } catch (error) {
    console.error('Error fetching customer business:', error);
    throw error;
  }
};

/** 載入是否檢核IP下拉式選單 */
export const getIpcheckOptions = async () => {
  try {
    const response = await api.post(`${basePath}/getIpcheckOptions`);
    return response.data;
  } catch (error) {
    console.error('Error fetching IP check options:', error);
    throw error;
  }
};

/** 載入客戶授權媒體列表 */
export const getRelationFilesList = async (params: any) => {
  try {
    const response = await api.post(`${basePath}/getRelationFilesList`, params);
    return response.data;
  } catch (error) {
    console.error('Error fetching relation files list:', error);
    throw error;
  }
};

/** 載入關係企業名稱下拉式選單 */
export const getCustomerRelationOptions = async (params: any) => {
  try {
    const response = await api.post(
      `${basePath}/getCustomerRelationOptions`,
      params
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching relation options:', error);
    throw error;
  }
};

/** 查詢關係企業名稱 */
export const queryCustomerRelationName = async (params: any) => {
  try {
    const response = await api.post(
      `${basePath}/queryCustomerRelationName`,
      params
    );
    return response.data;
  } catch (error) {
    console.error('Error querying relation name:', error);
    throw error;
  }
};

/** 載入客戶關係企業授權媒體 */
export const getCustomerRelationFiles = async (params: any) => {
  try {
    const response = await api.post(
      `${basePath}/customerRelationFiles`,
      params
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching customer relation files:', error);
    throw error;
  }
};

/** 編輯關係企業授權媒體 */
export const editCustomerRelationFiles = async (params: any) => {
  try {
    const response = await api.post(
      `${basePath}/editCustomerRelationFiles`,
      params
    );
    return response.data;
  } catch (error) {
    console.error('Error editing customer relation files:', error);
    throw error;
  }
};

/** 刪除關係企業 */
export const deleteCustomerRelation = async (params: any) => {
  try {
    const response = await api.post(
      `${basePath}/deleteCustomerRelation`,
      params
    );
    return response.data;
  } catch (error) {
    console.error('Error deleting customer relation:', error);
    throw error;
  }
};

/** 載入客戶IP位址設定 */
export const getCustomerIp = async (params: any) => {
  try {
    const response = await api.post(`${basePath}/customerIp`, params);
    return response.data;
  } catch (error) {
    console.error('Error fetching customer IP settings:', error);
    throw error;
  }
};

/** 新增IP位址設定 */
export const createCustomerIp = async (params: any) => {
  try {
    const response = await api.post(`${basePath}/createCustomerIp`, params);
    return response.data;
  } catch (error) {
    console.error('Error creating customer IP:', error);
    throw error;
  }
};

/** 刪除IP位址設定 */
export const deleteCustomerIp = async (params: any) => {
  try {
    const response = await api.post(`${basePath}/deleteCustomerIp`, params);
    return response.data;
  } catch (error) {
    console.error('Error deleting customer IP:', error);
    throw error;
  }
};

/** 檢查 IP 是否為空 */
export const checkIpEmpty = async (params: any) => {
  try {
    const response = await api.post(`${basePath}/checkIpEmpty`, params);
    return response.data;
  } catch (error) {
    console.error('Error checking IP empty:', error);
    throw error;
  }
};

/** 載入客戶 AP to AP 設定 */
export const getCustomerApToAp = async (params: any) => {
  try {
    const response = await api.post(`${basePath}/customerApToAp`, params);
    return response.data;
  } catch (error) {
    console.error('Error fetching AP to AP:', error);
    throw error;
  }
};

/** 新增 AP to AP 設定 */
export const createCustomerApToAp = async (params: any) => {
  try {
    const response = await api.post(`${basePath}/createCustomerApToAp`, params);
    return response.data;
  } catch (error) {
    console.error('Error creating AP to AP:', error);
    throw error;
  }
};

/** 刪除 AP to AP 設定 */
export const deleteCustomerApToAp = async (params: any) => {
  try {
    const response = await api.post(`${basePath}/deleteCustomerApToAp`, params);
    return response.data;
  } catch (error) {
    console.error('Error deleting AP to AP:', error);
    throw error;
  }
};

/** 檢查參數是否重複 */
export const checkParamDuplicate = async (params: any) => {
  try {
    const response = await api.post(`${basePath}/checkParamDuplicate`, params);
    return response.data;
  } catch (error) {
    console.error('Error checking param duplicate:', error);
    throw error;
  }
};

/** 檢查參數是否已存在 */
export const checkSystemCheckExists = async (params: any) => {
  try {
    const response = await api.post(
      `${basePath}/checkSystemCheckExists`,
      params
    );
    return response.data;
  } catch (error) {
    console.error('Error checking system param exists:', error);
    throw error;
  }
};

/** 檢查參數是否被使用 */
export const checkParamInUse = async (params: any) => {
  try {
    const response = await api.post(`${basePath}/checkParamInUse`, params);
    return response.data;
  } catch (error) {
    console.error('Error checking param in use:', error);
    throw error;
  }
};

/** 載入客戶企業識別碼資料 */
export const getCustomerBillerCode = async (params: any) => {
  try {
    const response = await api.post(`${basePath}/customerBillerCode`, params);
    return response.data;
  } catch (error) {
    console.error('Error fetching customer biller code:', error);
    throw error;
  }
};

/** 載入該客戶的使用者資料 */
export const getCustomerBizuser = async (params: any) => {
  try {
    const response = await api.post(`${basePath}/customerBizuser`, params);
    return response.data;
  } catch (error) {
    console.error('Error fetching customer bizuser:', error);
    throw error;
  }
};

/** 載入客戶繳費單管理設定 */
export const getCustomerPaySetting = async (params: any) => {
  try {
    const response = await api.post(`${basePath}/customerPaySetting`, params);
    return response.data;
  } catch (error) {
    console.error('Error fetching customer pay setting:', error);
    throw error;
  }
};

/** 載入客戶自動化傳輸設定 */
export const getCustomerAutotransfer = async (params: any) => {
  try {
    const response = await api.post(`${basePath}/customerAutotransfer`, params);
    return response.data;
  } catch (error) {
    console.error('Error fetching customer autotransfer:', error);
    throw error;
  }
};

/** 載入系統連線類別下拉式選單 */
export const getParamTypeOptions = async () => {
  try {
    const response = await api.post(`${basePath}/getParamTypeOptions`);
    return response.data;
  } catch (error) {
    console.error('Error fetching param type options:', error);
    throw error;
  }
};
/** 新增企業識別碼 */
export const createCustomerBillerCode = async (params: any) => {
  try {
    const response = await api.post(
      `${basePath}/createCustomerBillerCode`,
      params
    );
    return response.data;
  } catch (error) {
    console.error('Error creating customer biller code:', error);
    throw error;
  }
};

/** 刪除企業識別碼 */
export const deleteCustomerBillerCode = async (params: any) => {
  try {
    const response = await api.post(
      `${basePath}/deleteCustomerBillerCode`,
      params
    );
    return response.data;
  } catch (error) {
    console.error('Error deleting customer biller code:', error);
    throw error;
  }
};

/** 檢查企業識別碼是否重複設定 */
export const checkBillerCodeDuplicate = async (params: any) => {
  try {
    const response = await api.post(
      `${basePath}/checkBillerCodeDuplicate`,
      params
    );
    return response.data;
  } catch (error) {
    console.error('Error checking biller code duplicate:', error);
    throw error;
  }
};

/** 檢查企業識別碼是否已被其他客戶使用 */
export const checkBillerCodeUsed = async (params: any) => {
  try {
    const response = await api.post(`${basePath}/checkBillerCodeUsed`, params);
    return response.data;
  } catch (error) {
    console.error('Error checking biller code used:', error);
    throw error;
  }
};

/** 取得企業識別碼最小長度 */
export const getMinBillerCodeNum = async () => {
  try {
    const response = await api.post(`${basePath}/minBillerCodeNum`);
    return response.data;
  } catch (error) {
    console.error('Error fetching min biller code length:', error);
    throw error;
  }
};

/** 取得企業識別碼最大長度 */
export const getMaxBillerCodeNum = async () => {
  try {
    const response = await api.post(`${basePath}/maxBillerCodeNum`);
    return response.data;
  } catch (error) {
    console.error('Error fetching max biller code length:', error);
    throw error;
  }
};
