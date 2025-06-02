import { api } from './FrontAPI';

const basePath = '/B02004';

interface QueryRequest {
  // 根據實際需求調整屬性
  [key: string]: any;
}

interface UploadFormat {
  id: string;
  name: string;
  // 其他必要的屬性
}

interface DeleteRequest {
  ids: string[];
}

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

/**
 * 新增上傳格式
 */
export const addUploadFormat = async (
  request: UploadFormat
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

/**
 * 修改上傳格式
 */
export const editUploadFormat = async (
  request: UploadFormat
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
export const deleteUploadFormat = async (
  request: DeleteRequest
): Promise<ApiResponse<string>> => {
  try {
    const response = await api.post<ApiResponse<string>>(
      `${basePath}/delete`,
      request
    );
    return response.data;
  } catch (error) {
    console.error('Error deleting upload format:', error);
    throw error;
  }
};
