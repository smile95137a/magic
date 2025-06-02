import { api } from './FrontAPI';

const basePath = '/b08002';

// 查詢角色
export const queryRole = async (request: any): Promise<ApiResponse<any[]>> => {
  try {
    const response = await api.post(`${basePath}/query`, request);
    return response.data;
  } catch (error) {
    console.error('Error querying roles:', error);
    throw error;
  }
};

// 載入地區下拉式選單
export const getAreaList = async (): Promise<ApiResponse<any[]>> => {
  try {
    const response = await api.post(`${basePath}/getAreaOptions`);
    return response.data;
  } catch (error) {
    console.error('Error loading area list:', error);
    throw error;
  }
};

// 載入功能列表
export const getMenuList = async (): Promise<ApiResponse<any[]>> => {
  try {
    const response = await api.post(`${basePath}/menu`);
    return response.data;
  } catch (error) {
    console.error('Error loading menu list:', error);
    throw error;
  }
};

// 載入操作類型
export const getActionTypeList = async (): Promise<ApiResponse<any[]>> => {
  try {
    const response = await api.post(`${basePath}/actionType`);
    return response.data;
  } catch (error) {
    console.error('Error loading action type list:', error);
    throw error;
  }
};

// 新增角色
export const createRole = async (request: any): Promise<ApiResponse<any>> => {
  try {
    const response = await api.post(`${basePath}/create`, request);
    return response.data;
  } catch (error) {
    console.error('Error creating role:', error);
    throw error;
  }
};

// 取得角色資料（for 編輯頁）
export const getRoleById = async (request: any): Promise<ApiResponse<any>> => {
  try {
    const response = await api.post(`${basePath}/role`, request);
    return response.data;
  } catch (error) {
    console.error('Error getting role by ID:', error);
    throw error;
  }
};

// 取得角色的功能與操作權限
export const getRoleMenuActionList = async (
  request: any
): Promise<ApiResponse<any[]>> => {
  try {
    const response = await api.post(`${basePath}/roleMenuAction`, request);
    return response.data;
  } catch (error) {
    console.error('Error getting role menu actions:', error);
    throw error;
  }
};

// 修改角色
export const updateRole = async (request: any): Promise<ApiResponse<any>> => {
  try {
    const response = await api.post(`${basePath}/update`, request);
    return response.data;
  } catch (error) {
    console.error('Error updating role:', error);
    throw error;
  }
};

// 刪除角色
export const deleteRole = async (request: any): Promise<ApiResponse<any>> => {
  try {
    const response = await api.post(`${basePath}/delete`, request);
    return response.data;
  } catch (error) {
    console.error('Error deleting role:', error);
    throw error;
  }
};
