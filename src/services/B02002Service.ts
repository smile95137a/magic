import { api } from './FrontAPI';

const basePath = '/B02002';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

interface QueryRequest {
  [key: string]: any;
}

interface B02002CreateReq {
  [key: string]: any;
}

/**
 * 取得區域選項
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
 * 取得業務別選項（根據區域）
 */
export const getBiznameOptions = async (
  region?: string
): Promise<ApiResponse<any[]>> => {
  try {
    const response = await api.get<ApiResponse<any[]>>(
      `${basePath}/biznameOptions`,
      { params: { region } }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching bizname options:', error);
    throw error;
  }
};

/**
 * 取得格式類型選項（根據業務別）
 */
export const getDownloadFileTypeOptions = async (
  bizcode?: string
): Promise<ApiResponse<any[]>> => {
  try {
    const response = await api.get<ApiResponse<any[]>>(
      `${basePath}/downloadFileTypeOptions`,
      { params: { bizcode } }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching download file type options:', error);
    throw error;
  }
};

/**
 * 查詢檔案下載設定
 */
export const b02002query = async (
  requestData: QueryRequest
): Promise<ApiResponse<any[]>> => {
  try {
    const response = await api.post<ApiResponse<any[]>>(
      `${basePath}/query`,
      requestData
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching file download setup:', error);
    throw error;
  }
};

/**
 * 新增檔案下載設定
 */
export const b02002Add = async (
  requestData: B02002CreateReq
): Promise<ApiResponse<string>> => {
  try {
    const response = await api.post<ApiResponse<string>>(
      `${basePath}/add`,
      requestData
    );
    return response.data;
  } catch (error) {
    console.error('Error adding file download setup:', error);
    throw error;
  }
};

/**
 * 修改檔案下載設定
 */
export const b02002Edit = async (
  requestData: B02002CreateReq
): Promise<ApiResponse<string>> => {
  try {
    const response = await api.post<ApiResponse<string>>(
      `${basePath}/edit`,
      requestData
    );
    return response.data;
  } catch (error) {
    console.error('Error updating file download setup:', error);
    throw error;
  }
};

export const getB02002 = async (id: any): Promise<ApiResponse<any>> => {
  try {
    const response = await api.get<ApiResponse<any>>(
      `${basePath}/getB02002/${id}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching file download setup by ID:', error);
    throw error;
  }
};
