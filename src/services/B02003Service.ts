import { api } from './FrontAPI';

const basePath = '/B02003';

interface QueryRequest {
  [key: string]: any;
}

interface B02003UpdateReq {
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
 * 根據區域獲取 OP Mail Group 選項
 * @param region 區域代碼（可選）
 */
export const getOpMailGroupOptions = async (
  region?: string
): Promise<ApiResponse<any[]>> => {
  try {
    const response = await api.get<ApiResponse<any[]>>(
      `${basePath}/opMailGroupOptions`,
      {
        params: { region },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching OP Mail Group options:', error);
    throw error;
  }
};

export const getFormatNameOptions = async (
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
    console.error('Error fetching bizname options:', error);
    throw error;
  }
};

/**
 * 查詢檔案上傳設定
 * @param request 查詢條件
 */
export const b02003query = async (
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
 * 依據 ID 獲取 B02003 資訊
 * @param id 資料 ID
 */
export const getB02003ById = async (id: any): Promise<ApiResponse<any>> => {
  try {
    const response = await api.get<ApiResponse<any>>(
      `${basePath}/getB02003/${id}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching B02003 data:', error);
    throw error;
  }
};
export const b02003Edit = async (
  request: B02003UpdateReq
): Promise<ApiResponse<string>> => {
  try {
    const response = await api.post<ApiResponse<string>>(
      `${basePath}/edit`,
      request
    );
    return response.data;
  } catch (error) {
    console.error('Error editing upload settings:', error);
    throw error;
  }
};
