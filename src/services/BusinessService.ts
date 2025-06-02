import { api } from './FrontAPI';

const basePath = '/businesses';

// 查詢所有業務
export const queryAllBusinesses = async (): Promise<ApiResponse<any>> => {
  try {
    const response = await api.post<ApiResponse<any>>(`${basePath}/queryAll`);
    return response.data;
  } catch (error) {
    console.error('Error querying all businesses:', error);
    throw error;
  }
};

// 根據ID查詢業務
export const queryBusinessById = async (
  id: string
): Promise<ApiResponse<any>> => {
  try {
    const response = await api.post<ApiResponse<any>>(
      `${basePath}/query/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(`Error querying business with ID ${id}:`, error);
    throw error;
  }
};

// 儲存或更新業務
export const saveBusiness = async (
  business: any
): Promise<ApiResponse<any>> => {
  try {
    const response = await api.post<ApiResponse<any>>(
      `${basePath}/save`,
      business
    );
    return response.data;
  } catch (error) {
    console.error('Error saving business:', error);
    throw error;
  }
};

// 刪除業務
export const deleteBusiness = async (id: string): Promise<ApiResponse<any>> => {
  try {
    const response = await api.post<ApiResponse<any>>(
      `${basePath}/delete/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(`Error deleting business with ID ${id}:`, error);
    throw error;
  }
};
