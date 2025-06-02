import { api } from './FrontAPI';

const basePath = '/B06004';

interface QueryRequest {
  [key: string]: any;
}

interface LabelValueData {
  value: string;
  label: string;
}

export const getRegion = async (): Promise<ApiResponse<LabelValueData[]>> => {
  try {
    const response = await api.get<ApiResponse<LabelValueData[]>>(
      `${basePath}/region`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching region:', error);
    throw error;
  }
};

export const getBiznameOptions = async (
  region?: string
): Promise<ApiResponse<LabelValueData[]>> => {
  try {
    const response = await api.get<ApiResponse<LabelValueData[]>>(
      `${basePath}/biznameOptions`,
      {
        params: { region },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching bizname options:', error);
    throw error;
  }
};

export const getFileType = async (
  bizcode?: string,
  fileItem?: string
): Promise<ApiResponse<LabelValueData[]>> => {
  try {
    const response = await api.get<ApiResponse<LabelValueData[]>>(
      `${basePath}/fileType`,
      {
        params: { bizcode, fileItem },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching file types:', error);
    throw error;
  }
};

export const queryB06004 = async (
  request: QueryRequest
): Promise<ApiResponse<any[]>> => {
  try {
    const response = await api.post<ApiResponse<any[]>>(
      `${basePath}/query`,
      request
    );
    return response.data;
  } catch (error) {
    console.error('Error querying:', error);
    throw error;
  }
};
