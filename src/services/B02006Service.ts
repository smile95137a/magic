import { api } from './FrontAPI';

const basePath = '/B02006';

interface QueryRequest {
  [key: string]: any;
}

interface BusinessSetting {
  [key: string]: any;
}

/**
 * 查詢業務功能設定
 */
export const queryBusinessSettings = async (
  request: QueryRequest
): Promise<ApiResponse<BusinessSetting[]>> => {
  try {
    const response = await api.post<ApiResponse<BusinessSetting[]>>(
      `${basePath}/query`,
      request
    );
    return response.data;
  } catch (error) {
    console.error('Error querying business settings:', error);
    throw error;
  }
};

/**
 * 新增業務功能設定
 */
export const b02006Add = async (
  request: BusinessSetting
): Promise<ApiResponse<string>> => {
  try {
    const response = await api.post<ApiResponse<string>>(
      `${basePath}/add`,
      request
    );
    return response.data;
  } catch (error) {
    console.error('Error adding business setting:', error);
    throw error;
  }
};

/**
 * 修改業務功能設定
 */
export const b02006Edit = async (
  request: BusinessSetting
): Promise<ApiResponse<string>> => {
  try {
    const response = await api.post<ApiResponse<string>>(
      `${basePath}/edit`,
      request
    );
    return response.data;
  } catch (error) {
    console.error('Error editing business setting:', error);
    throw error;
  }
};

/**
 * 刪除業務功能設定
 */
export const b02006Delete = async (
  request: any
): Promise<ApiResponse<string>> => {
  try {
    const response = await api.post<ApiResponse<string>>(
      `${basePath}/delete`,
      request
    );
    return response.data;
  } catch (error) {
    console.error('Error deleting business setting:', error);
    throw error;
  }
};

/**
 * 查詢區域設定
 */
export const fetchRegions = async (): Promise<
  ApiResponse<{ value: string; label: string }[]>
> => {
  try {
    const response = await api.get<
      ApiResponse<{ value: string; label: string }[]>
    >(`${basePath}/region`);
    return response.data;
  } catch (error) {
    console.error('Error fetching regions:', error);
    throw error;
  }
};

/**
 * 查詢業務代碼設定
 */
export const fetchBizCodes = async (): Promise<
  ApiResponse<{ value: string; label: string }[]>
> => {
  try {
    const response = await api.get<
      ApiResponse<{ value: string; label: string }[]>
    >(`${basePath}/queryBiznameList`);
    return response.data;
  } catch (error) {
    console.error('Error fetching business codes:', error);
    throw error;
  }
};

export const getMenuList = async (): Promise<
  ApiResponse<{ value: string; label: string }[]>
> => {
  try {
    const response = await api.get<
      ApiResponse<{ value: string; label: string }[]>
    >(`${basePath}/getMenuList`);
    return response.data;
  } catch (error) {
    console.error('Error fetching business codes:', error);
    throw error;
  }
};

/**
 * 查詢單一業務功能設定
 */
export const getB02006 = async (id: string): Promise<ApiResponse<any>> => {
  try {
    const response = await api.get<ApiResponse<any>>(
      `${basePath}/getB02006/${id}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching business setting:', error);
    throw error;
  }
};
