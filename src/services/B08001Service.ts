import { api } from './FrontAPI';

const basePath = '/b08001';

interface RequestData {
  [key: string]: any;
}

interface ApiResponseData {
  [key: string]: any;
}

/**
 * B08001 - 載入所有功能
 */
export const getB08001AllMenus = async (): Promise<
  ApiResponse<ApiResponseData[]>
> => {
  try {
    const response = await api.post(`${basePath}/allMenus`);
    return response.data;
  } catch (error) {
    console.error('B08001 - Error loading all menus:', error);
    throw error;
  }
};

/**
 * B08001 - 載入父功能下拉選單
 */
export const getB08001ParentMenuIdOptions = async (): Promise<
  ApiResponse<ApiResponseData[]>
> => {
  try {
    const response = await api.post(`${basePath}/getParentMenuIdOptions`);
    return response.data;
  } catch (error) {
    console.error('B08001 - Error loading parent menu options:', error);
    throw error;
  }
};

/**
 * B08001 - 查詢父功能編號（搭配查詢視窗）
 */
export const queryB08001ParentMenuId = async (
  data: RequestData
): Promise<ApiResponse<ApiResponseData[]>> => {
  try {
    const response = await api.post(`${basePath}/queryParentMenuId`, data);
    return response.data;
  } catch (error) {
    console.error('B08001 - Error querying parent menu ID:', error);
    throw error;
  }
};

/**
 * B08001 - 新增功能
 */
export const createB08001Menu = async (
  data: RequestData
): Promise<ApiResponse<any>> => {
  try {
    const response = await api.post(`${basePath}/create`, data);
    return response.data;
  } catch (error) {
    console.error('B08001 - Error creating menu:', error);
    throw error;
  }
};

/**
 * B08001 - 載入功能資料（編輯用）
 */
export const getB08001Menu = async (
  data: RequestData
): Promise<ApiResponse<ApiResponseData>> => {
  try {
    const response = await api.post(`${basePath}/menu`, data);
    return response.data;
  } catch (error) {
    console.error('B08001 - Error loading menu data:', error);
    throw error;
  }
};

/**
 * B08001 - 修改功能
 */
export const updateB08001Menu = async (
  data: RequestData
): Promise<ApiResponse<any>> => {
  try {
    const response = await api.post(`${basePath}/update`, data);
    return response.data;
  } catch (error) {
    console.error('B08001 - Error updating menu:', error);
    throw error;
  }
};

/**
 * B08001 - 修改功能排序
 */
export const editB08001MenuOrderNum = async (
  data: RequestData
): Promise<ApiResponse<any>> => {
  try {
    const response = await api.post(`${basePath}/editMenuOrderNum`, data);
    return response.data;
  } catch (error) {
    console.error('B08001 - Error editing menu order number:', error);
    throw error;
  }
};

/**
 * B08001 - 刪除功能
 */
export const deleteB08001Menu = async (
  data: RequestData
): Promise<ApiResponse<any>> => {
  try {
    const response = await api.post(`${basePath}/delete`, data);
    return response.data;
  } catch (error) {
    console.error('B08001 - Error deleting menu:', error);
    throw error;
  }
};
