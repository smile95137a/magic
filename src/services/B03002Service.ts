import { api } from './FrontAPI';

const basePath = '/B03002';

interface QueryRequest {
  [key: string]: any;
}

interface Data {
  [key: string]: any;
}

interface FormReq {
  [key: string]: any;
}

/**
 * 取得公司名稱下拉選單
 */
export const getCustomerIdOptions = async () => {
  try {
    const response = await api.post(`${basePath}/getCustomerIdOptions`);
    return response.data;
  } catch (error) {
    console.error('Error fetching customer ID options:', error);
    throw error;
  }
};

/**
 * 取得產品名稱下拉選單
 * @param {string} customerId 公司 ID
 */
export const getCustomerBizcodeOptions = async (req: QueryRequest) => {
  try {
    const response = await api.post(
      `${basePath}/getCustomerBizcodeOptions`,
      req
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching customer bizcode options:', error);
    throw error;
  }
};

/**
 * 取得檔案類型下拉選單
 * @param {Object} req 檔案類型查詢條件
 */
export const getFileTypeOptions = async (req: FormReq) => {
  try {
    const response = await api.post(`${basePath}/getFileTypeOptions`, req);
    return response.data;
  } catch (error) {
    console.error('Error fetching file type options:', error);
    throw error;
  }
};

/**
 * 取得檔案項目下拉選單
 */
export const getFileItemOptions = async () => {
  try {
    const response = await api.post(`${basePath}/getFileItemOptions`);
    return response.data;
  } catch (error) {
    console.error('Error fetching file item options:', error);
    throw error;
  }
};

/**
 * 查詢歷史檔案
 * @param {Object} req 查詢條件
 */
export const queryB03002 = async (req: QueryRequest) => {
  try {
    const response = await api.post(`${basePath}/query`, req);
    return response.data;
  } catch (error) {
    console.error('Error querying historical files:', error);
    throw error;
  }
};
/**
 * 查詢公司名稱（小視窗）
 * @param {Object} req 查詢條件
 */
export const queryCustomerId = async (req: QueryRequest) => {
  try {
    const response = await api.post(`${basePath}/queryCustomerId`, req);
    return response.data;
  } catch (error) {
    console.error('Error querying customer ID:', error);
    throw error;
  }
};

/**
 * 取得狀態下拉選單
 */
export const getFileStatusOptions = async () => {
  try {
    const response = await api.post(`${basePath}/getFileStatusOptions`);
    return response.data;
  } catch (error) {
    console.error('Error fetching file status options:', error);
    throw error;
  }
};

/**
 * 下載歷史檔案
 * @param {Object} req 下載條件（含 id）
 * @returns {Promise<Blob>} 檔案資料
 */
export const downloadB03002File = async (req: QueryRequest) => {
  try {
    const response = await api.post(`${basePath}/download`, req, {
      responseType: 'blob', // 重要！用來處理檔案下載
    });

    return response.data; // 回傳 blob 給前端自己處理下載（可用 a 標籤觸發）
  } catch (error) {
    console.error('Error downloading file:', error);
    throw error;
  }
};
