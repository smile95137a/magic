import { api } from './FrontAPI';

const basePath = '/B04003';

/**
 * 取得「公司名稱」下拉選單
 */
export const getCompanyIdOptions = async () => {
  try {
    const response = await api.post(`${basePath}/getCompanyIdOptions`);
    return response.data;
  } catch (error) {
    console.error('Error fetching companyId options:', error);
    throw error;
  }
};

/**
 * 「公司名稱」小視窗-查詢
 */
export const queryCustomerId = async (req: any) => {
  try {
    const response = await api.post(`${basePath}/queryCustomerId`, req);
    return response.data;
  } catch (error) {
    console.error('Error querying customerId:', error);
    throw error;
  }
};

/**
 * 取得「業務類別」下拉選單
 */
export const getBillerInfosOptions = async (req: any) => {
  try {
    const response = await api.post(`${basePath}/getBillerInfosOptions`, req);
    return response.data;
  } catch (error) {
    console.error('Error fetching billerInfos options:', error);
    throw error;
  }
};

/**
 * 查詢
 */
export const query = async (req: any) => {
  try {
    const response = await api.post(`${basePath}/query`, req);
    return response.data;
  } catch (error) {
    console.error('Error querying data:', error);
    throw error;
  }
};

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
    console.error('Error fetching pay setup params:', error);
    throw error;
  }
};

/**
 * 取得「預設格式欄位明細」資料
 */
export const getDefaultPaySetupDetail = async (req: any) => {
  try {
    const response = await api.post(
      `${basePath}/getDefaultPaySetupDetail`,
      req
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching default pay setup detail:', error);
    throw error;
  }
};

/**
 * 檢查「格式範本名稱」是否重複
 */
export const checkNameRepeat = async (name: string, businessType: string) => {
  try {
    const response = await api.post(
      `${basePath}/checkNameRepeat/${encodeURIComponent(name)}/${businessType}`
    );
    return response.data;
  } catch (error) {
    console.error('Error checking name repeat:', error);
    throw error;
  }
};

/**
 * 取得單筆「欄位」資料
 */
export const getPaySetupParam = async (paySetupParamUuid: string) => {
  try {
    const response = await api.post(
      `${basePath}/getPaySetupParam/${paySetupParamUuid}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching single pay setup param:', error);
    throw error;
  }
};

/**
 * 依格式範本id查詢資料
 */
export const queryByPaySetupUuid = async (paySetupUuid: string) => {
  try {
    const response = await api.post(
      `${basePath}/queryByPaySetupUuid/${paySetupUuid}`
    );
    return response.data;
  } catch (error) {
    console.error('Error querying by paySetupUuid:', error);
    throw error;
  }
};

/**
 * 儲存
 */
export const save = async (req: any) => {
  try {
    const response = await api.post(`${basePath}/save`, req);
    return response.data;
  } catch (error) {
    console.error('Error saving data:', error);
    throw error;
  }
};

/**
 * 判斷是否有 ibon 通路
 */
export const hasCvsPrintPayment = async (req: any) => {
  try {
    const response = await api.post(`${basePath}/hasCvsPrintPayment`, req);
    return response.data;
  } catch (error) {
    console.error('Error checking ibon channel:', error);
    throw error;
  }
};

/**
 * 刪除資料格式設定
 */
export const deletePaySetup = async (paySetupUuid: string) => {
  try {
    const response = await api.post(`${basePath}/delete/${paySetupUuid}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting pay setup:', error);
    throw error;
  }
};

/**
 * 匯出 Excel
 */
export const exportExcel = async (req: any) => {
  try {
    const response = await api.post(`${basePath}/exportExcel`, req, {
      responseType: 'blob',
    });
    return response;
  } catch (error) {
    console.error('Error exporting excel:', error);
    throw error;
  }
};
