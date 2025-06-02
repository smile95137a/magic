import { api } from './FrontAPI';

const basePath = '/B04009';

export const getCompanyIdOptions = async () => {
  try {
    const response = await api.post(`${basePath}/getCompanyIdOptions`);
    return response.data;
  } catch (error) {
    console.error('Error fetching companyId options:', error);
    throw error;
  }
};

export const queryCustomerId = async (req: any) => {
  try {
    const response = await api.post(`${basePath}/queryCustomerId`, req);
    return response.data;
  } catch (error) {
    console.error('Error querying customerId:', error);
    throw error;
  }
};

export const getFullBillerInfosOptions = async (req: any) => {
  try {
    const response = await api.post(
      `${basePath}/getFullBillerInfosOptions`,
      req
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching full biller infos options:', error);
    throw error;
  }
};

export const getBillerStyleOptions = async (req: any) => {
  try {
    const response = await api.post(`${basePath}/getBillerStyleOptions`, req);
    return response.data;
  } catch (error) {
    console.error('Error fetching biller style options:', error);
    throw error;
  }
};

export const getPaySelectOptions = async (req: any) => {
  try {
    const response = await api.post(`${basePath}/getPaySelectOptions`, req);
    return response.data;
  } catch (error) {
    console.error('Error fetching pay select options:', error);
    throw error;
  }
};

export const getStatusOptions = async () => {
  try {
    const response = await api.post(`${basePath}/getStatusOptions`);
    return response.data;
  } catch (error) {
    console.error('Error fetching status options:', error);
    throw error;
  }
};

export const queryByPayDetailUuid = async (payDetailUuid: string) => {
  try {
    const response = await api.post(
      `${basePath}/queryByPayDetailUuid/${payDetailUuid}`
    );
    return response.data;
  } catch (error) {
    console.error(`Error querying by payDetailUuid ${payDetailUuid}:`, error);
    throw error;
  }
};

export const queryB04009 = async (req: any) => {
  try {
    const response = await api.post(`${basePath}/query`, req);
    return response.data;
  } catch (error) {
    console.error('Error querying B04009 data:', error);
    throw error;
  }
};

export const saveB04009 = async (req: any) => {
  try {
    const response = await api.post(`${basePath}/save`, req);
    return response.data;
  } catch (error) {
    console.error('Error saving B04009 data:', error);
    throw error;
  }
};
