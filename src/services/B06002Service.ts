import { api } from './FrontAPI';

const basePath = '/b06002';

interface QueryRequest {
  [key: string]: any;
}

interface data {
  [key: string]: any;
}

export const queryB06002 = async (
  request: QueryRequest
): Promise<ApiResponse<data[]>> => {
  try {
    const response = await api.post<ApiResponse<data[]>>(
      `${basePath}/query`,
      request
    );
    return response.data;
  } catch (error) {
    console.error('Error querying:', error);
    throw error;
  }
};
