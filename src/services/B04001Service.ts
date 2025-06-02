import { api } from './FrontAPI';

const basePath = '/B04001';

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
    console.error('Error fetching customer options:', error);
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
 * 取得產品名稱下拉選單
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
 */
export const getFileTypeOptions = async (req: Data) => {
  try {
    const response = await api.post(`${basePath}/getFileTypeOptions`, req);
    return response.data;
  } catch (error) {
    console.error('Error fetching file type options:', error);
    throw error;
  }
};

/**
 * 取得扣繳業務名稱下拉選單
 */
export const getAcpmnameOptions = async (req: Data) => {
  try {
    const response = await api.post(`${basePath}/getAcpmnameOptions`, req);
    return response.data;
  } catch (error) {
    console.error('Error fetching acpmname options:', error);
    throw error;
  }
};

/**
 * 取得是否顯示企業識別碼flag
 */
export const getIsBiller = async (fileType: string) => {
  try {
    const response = await api.post(`${basePath}/getIsBiller/${fileType}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching isBiller flag:', error);
    throw error;
  }
};

/**
 * 取得企業識別碼下拉選單
 */
export const getBillerCodeOptions = async (customerId: string) => {
  try {
    const response = await api.post(
      `${basePath}/getBillerCodeOptions/${customerId}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching biller code options:', error);
    throw error;
  }
};

/**
 * 取得匯款性質別下拉選單
 */
export const getTransferTypeCodeOptions = async (req: Data) => {
  try {
    const response = await api.post(
      `${basePath}/getTransferTypeCodeOptions`,
      req
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching transfer type options:', error);
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
 * 查詢檔案傳輸資料
 */
export const queryB04001 = async (request: QueryRequest) => {
  try {
    const response = await api.post(`${basePath}/query`, request);
    return response.data;
  } catch (error) {
    console.error('Error querying B04001 data:', error);
    throw error;
  }
};

/**
 * 新增檔案傳輸資料
 */
export const createB04001 = async (formReq: FormReq) => {
  const formData = new FormData();
  formData.append('customerId', formReq.customerId);
  formData.append('fileItem', formReq.fileItem);
  formData.append('bizcode', formReq.bizcode);
  formData.append('fileType', formReq.fileType);

  if (formReq.upfile) {
    formData.append('upfile', formReq.upfile);
  }

  try {
    const response = await api.post(`${basePath}/create`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating B04001 record:', error);
    throw error;
  }
};

/**
 * 刪除檔案傳輸資料
 */
export const deleteB04001 = async (fileIndex: string) => {
  try {
    const response = await api.post(`${basePath}/delete/${fileIndex}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting B04001 record:', error);
    throw error;
  }
};

/**
 * 下載檔案
 */
export const downloadDocument = async (fileIndex: string) => {
  try {
    const response = await api.post(
      `${basePath}/downloadDocument/${fileIndex}`,
      {
        responseType: 'blob',
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error downloading document:', error);
    throw error;
  }
};

/**
 * 下載錯誤訊息
 */
export const downloadError = async (fileIndex: string) => {
  try {
    const response = await api.post(`${basePath}/downloadError/${fileIndex}`, {
      responseType: 'blob',
    });
    return response.data;
  } catch (error) {
    console.error('Error downloading error message:', error);
    throw error;
  }
};
