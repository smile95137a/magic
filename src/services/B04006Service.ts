import { api } from './FrontAPI';

const basePath = '/b04006';

interface RequestData {
  [key: string]: any;
}

export const getCompanyIdOptions = async (): Promise<ApiResponse<any>> => {
  try {
    const response = await api.post(`${basePath}/getCompanyIdOptions`);
    return response.data;
  } catch (error) {
    console.error('Error fetching company ID options:', error);
    throw error;
  }
};

export const queryCustomerId = async (
  request: RequestData
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
  request: RequestData
): Promise<ApiResponse<any>> => {
  try {
    const response = await api.post(
      `${basePath}/getFullBillerInfosOptions`,
      request
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching full biller info options:', error);
    throw error;
  }
};

export const getStatusOptions = async (): Promise<ApiResponse<any>> => {
  try {
    const response = await api.post(`${basePath}/getStatusOptions`);
    return response.data;
  } catch (error) {
    console.error('Error fetching status options:', error);
    throw error;
  }
};

export const getMinPayTime = async (): Promise<ApiResponse<any>> => {
  try {
    const response = await api.post(`${basePath}/getMinPayTime`);
    return response.data;
  } catch (error) {
    console.error('Error fetching minimum pay time:', error);
    throw error;
  }
};

export const queryB04006 = async (
  request: RequestData
): Promise<ApiResponse<any>> => {
  try {
    const response = await api.post(`${basePath}/query`, request);
    return response.data;
  } catch (error) {
    console.error('Error querying B04006:', error);
    throw error;
  }
};

export const queryByPayUuid = async (
  payUuid: string
): Promise<ApiResponse<any>> => {
  try {
    const response = await api.post(`${basePath}/queryByPayUuid/${payUuid}`);
    return response.data;
  } catch (error) {
    console.error('Error querying by payUuid:', error);
    throw error;
  }
};

export const getBillerStyleByUuid = async (
  modelUuid: string
): Promise<ApiResponse<any>> => {
  try {
    const response = await api.post(
      `${basePath}/getBillerStyleByUuid/${modelUuid}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching biller style:', error);
    throw error;
  }
};

export const previewSampleFile = async (
  payUuid: string
): Promise<ApiResponse<any>> => {
  try {
    const response = await api.post(`${basePath}/preivewSampleFile/${payUuid}`);
    return response.data;
  } catch (error) {
    console.error('Error previewing sample file:', error);
    throw error;
  }
};

export const confirmSample = async (
  request: RequestData
): Promise<ApiResponse<any>> => {
  try {
    const response = await api.post(`${basePath}/confirm`, request);
    return response.data;
  } catch (error) {
    console.error('Error confirming sample:', error);
    throw error;
  }
};

export const printPaySheet = async (
  payUuid: string
): Promise<ApiResponse<any>> => {
  try {
    const response = await api.post(`${basePath}/print/${payUuid}`);
    return response.data;
  } catch (error) {
    console.error('Error printing pay sheet:', error);
    throw error;
  }
};

export const downloadLog = async (
  payUuid: string
): Promise<ApiResponse<any>> => {
  try {
    const response = await api.post(`${basePath}/downloadLog/${payUuid}`);
    return response.data;
  } catch (error) {
    console.error('Error downloading log:', error);
    throw error;
  }
};

export const deletePaySheet = async (
  request: RequestData
): Promise<ApiResponse<any>> => {
  try {
    const response = await api.post(`${basePath}/delete`, request);
    return response.data;
  } catch (error) {
    console.error('Error deleting pay sheet:', error);
    throw error;
  }
};

export const downloadFile = async (
  payUuid: string
): Promise<ApiResponse<any>> => {
  try {
    const response = await api.post(`${basePath}/downloadFile/${payUuid}`);
    return response.data;
  } catch (error) {
    console.error('Error downloading file:', error);
    throw error;
  }
};
