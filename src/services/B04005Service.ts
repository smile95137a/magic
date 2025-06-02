import { api } from './FrontAPI';

const basePath = '/B04005';

export const getCompanyIdOptions = async () => {
  try {
    const response = await api.post(`${basePath}/getCompanyIdOptions`);
    return response.data;
  } catch (error) {
    console.error('Error getting company ID options:', error);
    throw error;
  }
};

export const queryCustomerId = async (
  request: any
): Promise<ApiResponse<any>> => {
  try {
    const response = await api.post(`${basePath}/queryCustomerId`, request);
    return response.data;
  } catch (error) {
    console.error('Error querying customer ID:', error);
    throw error;
  }
};

export const getFullBillerInfosOptions = async (
  request: any
): Promise<ApiResponse<any>> => {
  try {
    const response = await api.post(
      `${basePath}/getFullBillerInfosOptions`,
      request
    );
    return response.data;
  } catch (error) {
    console.error('Error getting full biller infos options:', error);
    throw error;
  }
};

export const getStatusOptions = async () => {
  try {
    const response = await api.post(`${basePath}/getStatusOptions`);
    return response.data;
  } catch (error) {
    console.error('Error getting status options:', error);
    throw error;
  }
};

export const getBillerStyleOptions = async (request: any) => {
  try {
    const response = await api.post(
      `${basePath}/getBillerStyleOptions`,
      request
    );
    return response.data;
  } catch (error) {
    console.error('Error getting biller style options:', error);
    throw error;
  }
};

export const getPaySetupNameOptions = async (request: any) => {
  try {
    const response = await api.post(
      `${basePath}/getPaySetupNameOptions`,
      request
    );
    return response.data;
  } catch (error) {
    console.error('Error getting pay setup name options:', error);
    throw error;
  }
};

export const getMinPayTime = async () => {
  try {
    const response = await api.post(`${basePath}/getMinPayTime`);
    return response.data;
  } catch (error) {
    console.error('Error getting min pay time:', error);
    throw error;
  }
};

export const queryB04005 = async (request: any) => {
  try {
    const response = await api.post(`${basePath}/query`, request);
    return response.data;
  } catch (error) {
    console.error('Error querying B04005:', error);
    throw error;
  }
};

export const queryByPayUuid = async (payUuid: string) => {
  try {
    const response = await api.post(`${basePath}/queryByPayUuid/${payUuid}`);
    return response.data;
  } catch (error) {
    console.error('Error querying by payUuid:', error);
    throw error;
  }
};

export const checkPayTime = async (request: any) => {
  try {
    const response = await api.post(`${basePath}/checkPayTime`, request);
    return response.data;
  } catch (error) {
    console.error('Error checking pay time:', error);
    throw error;
  }
};

// 注意：需用 multipart/form-data 格式提交
export const saveB04005 = async (req: any) => {
  try {
    const formData = new FormData();

    formData.append('payUuid', req.payUuid);
    formData.append('companyId', req.companyId);
    formData.append('businessType', req.businessType);
    formData.append('modelUuid', req.modelUuid);
    formData.append('paySetupUuid', req.paySetupUuid);
    formData.append('printType', req.printType);
    formData.append('payTime', req.payTime);
    formData.append('sendType', req.sendType);
    formData.append('sendAddress', req.sendAddress);
    formData.append('notice', req.notice);
    formData.append('paySetupCheckType', req.paySetupCheckType);

    // 檔案欄位（如果有的話）
    if (req.uploadFile) {
      formData.append('uploadFile', req.uploadFile);
    }
    if (req.uploadFileAd) {
      formData.append('uploadFileAd', req.uploadFileAd);
    }

    const response = await api.post(`${basePath}/save`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    console.error('Error saving B04005:', error);
    throw error;
  }
};

export const getBillerStyleByUuid = async (modelUuid: string) => {
  try {
    const response = await api.post(
      `${basePath}/getBillerStyleByUuid/${modelUuid}`
    );
    return response.data;
  } catch (error) {
    console.error('Error getting biller style by UUID:', error);
    throw error;
  }
};

export const previewPdf = async (request: any) => {
  try {
    const response = await api.post(`${basePath}/previewPdf`, request);
    return response.data;
  } catch (error) {
    console.error('Error previewing PDF:', error);
    throw error;
  }
};
