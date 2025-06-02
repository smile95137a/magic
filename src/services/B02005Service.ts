import { api } from './FrontAPI';

const basePath = '/B02005';

interface QueryRequest {
  [key: string]: any;
}

interface UploadFormat {
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
 * 查詢上傳格式
 */
export const queryUploadFormats = async (
  request: QueryRequest
): Promise<ApiResponse<UploadFormat[]>> => {
  try {
    const response = await api.post<ApiResponse<UploadFormat[]>>(
      `${basePath}/query`,
      request
    );
    return response.data;
  } catch (error) {
    console.error('Error querying upload formats:', error);
    throw error;
  }
};

export const addOpEamil = async (
  request: QueryRequest
): Promise<ApiResponse<string>> => {
  try {
    const response = await api.post<ApiResponse<string>>(
      `${basePath}/add`,
      request
    );
    return response.data;
  } catch (error) {
    console.error('Error adding upload format:', error);
    throw error;
  }
};

export const editOpEamil = async (
  request: QueryRequest
): Promise<ApiResponse<string>> => {
  try {
    const response = await api.post<ApiResponse<string>>(
      `${basePath}/edit`,
      request
    );
    return response.data;
  } catch (error) {
    console.error('Error editing upload format:', error);
    throw error;
  }
};

/**
 * 刪除上傳格式
 */
export const b02005Delete = async (data: any): Promise<ApiResponse<any>> => {
  try {
    const response = await api.post<ApiResponse<any>>(
      `${basePath}/delete`,
      data
    );
    return response.data;
  } catch (error) {
    console.error('Error deleting upload formats:', error);
    throw error;
  }
};

export const getB02005ById = async (id: any): Promise<ApiResponse<any>> => {
  try {
    const response = await api.get<ApiResponse<any>>(
      `${basePath}/getB02005/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching B02005 with ID ${id}:`, error);
    throw error;
  }
};

export const checkGroupNameExists = async (
  groupname: string
): Promise<ApiResponse<boolean>> => {
  try {
    const response = await api.post(`${basePath}/checkGroupName`, {
      groupname,
    });
    return response.data;
  } catch (error) {
    console.error('Error checking groupname exists:', error);
    throw error;
  }
};
