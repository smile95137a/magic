import { api } from './FrontAPI';

const basePath = '/b03003';

interface QueryRequest {
  [key: string]: any;
}

interface data {
  [key: string]: any;
}

export const queryB03003 = async (
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
