import { api } from './FrontAPI';

const basePath = '/B02001';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

interface QueryRequest {
  [key: string]: any;
}

interface B02001CreateReq {
  [key: string]: any;
}

interface B02001UpdateReq {
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

export const getB02001 = async (id: any): Promise<ApiResponse<any>> => {
  try {
    const response = await api.get<ApiResponse<any>>(
      `${basePath}/getB02001/${id}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching B02001 details:', error);
    throw error;
  }
};

/**
 * 根據區域獲取業務別選項
 * @param region 區域代碼（可選）
 */
export const getBiznameOptions = async (
  region?: string
): Promise<ApiResponse<any[]>> => {
  try {
    const response = await api.get<ApiResponse<any[]>>(
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

/**
 * 根據業務別獲取格式類型選項
 * @param bizcode 業務別代碼（可選）
 */
export const getFormatOptions = async (
  bizcode?: string
): Promise<ApiResponse<any[]>> => {
  try {
    const response = await api.get<ApiResponse<any[]>>(
      `${basePath}/formatOptions`,
      {
        params: { bizcode },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching format options:', error);
    throw error;
  }
};

/**
 * 查詢檔案上傳設定
 * @param request 查詢條件
 */
export const b02001query = async (
  request: QueryRequest
): Promise<ApiResponse<any[]>> => {
  try {
    const response = await api.post<ApiResponse<any[]>>(
      `${basePath}/query`,
      request
    );
    return response.data;
  } catch (error) {
    console.error('Error querying upload settings:', error);
    throw error;
  }
};

/**
 * 新增檔案上傳設定
 * @param request 新增請求資料
 */
export const addUploadSetting = async (
  request: B02001CreateReq
): Promise<ApiResponse<string>> => {
  try {
    const response = await api.post<ApiResponse<string>>(
      `${basePath}/add`,
      request
    );
    return response.data;
  } catch (error) {
    console.error('Error adding upload setting:', error);
    throw error;
  }
};

/**
 * 修改檔案上傳設定
 * @param request 修改請求資料
 */
export const editUploadSetting = async (
  request: B02001UpdateReq
): Promise<ApiResponse<string>> => {
  try {
    const response = await api.post<ApiResponse<string>>(
      `${basePath}/edit`,
      request
    );
    return response.data;
  } catch (error) {
    console.error('Error editing upload setting:', error);
    throw error;
  }
};
