import { api } from './FrontAPI';

const basePath = '/B06005';

interface QueryRequest {
  [key: string]: any;
}

interface FormRequest {
  [key: string]: any;
}

/**
 * 查詢區域設定
 */
export const getRegions = async (): Promise<ApiResponse<any[]>> => {
  try {
    const response = await api.get<ApiResponse<any[]>>(`${basePath}/region`);
    return response.data;
  } catch (error) {
    console.error('Error fetching regions:', error);
    throw error;
  }
};

/**
 * 查詢業務功能設定
 */
export const queryB06005 = async (
  queryParams: QueryRequest
): Promise<ApiResponse<boolean>> => {
  try {
    const response = await api.post<ApiResponse<boolean>>(
      `${basePath}/query`,
      queryParams
    );
    return response.data;
  } catch (error) {
    console.error('Error querying B06005:', error);
    throw error;
  }
};

/**
 * 儲存或更新紀錄
 */
export const saveOrUpdateB06005Record = async (
  formData: FormRequest
): Promise<ApiResponse<any>> => {
  try {
    const response = await api.post<ApiResponse<any>>(
      `${basePath}/save`,
      formData
    );
    return response.data;
  } catch (error) {
    console.error('Error saving B06005 record:', error);
    throw error;
  }
};
