// b06006.ts
import { api } from './FrontAPI';

const basePath = '/B06006';

interface Data {
  [key: string]: any;
}

// 查詢全部
export const queryAllB06006 = async (): Promise<ApiResponse<Data[]>> => {
  try {
    const response = await api.post<ApiResponse<Data[]>>(
      `${basePath}/queryAll`
    );
    return response.data;
  } catch (error) {
    console.error('Error in queryAllB06006:', error);
    throw error;
  }
};

// 查詢單筆
export const queryB06006ByScheduleId = async (
  scheduleId: string
): Promise<ApiResponse<Data>> => {
  try {
    const response = await api.post<ApiResponse<Data>>(
      `${basePath}/queryByScheduleId/${scheduleId}`
    );
    return response.data;
  } catch (error) {
    console.error('Error in queryB06006ByScheduleId:', error);
    throw error;
  }
};

// 新增
export const createB06006 = async (
  request: Data
): Promise<ApiResponse<any>> => {
  try {
    const response = await api.post<ApiResponse<any>>(
      `${basePath}/create`,
      request
    );
    return response.data;
  } catch (error) {
    console.error('Error in createB06006:', error);
    throw error;
  }
};

// 修改
export const editB06006 = async (request: Data): Promise<ApiResponse<any>> => {
  try {
    const response = await api.post<ApiResponse<any>>(
      `${basePath}/edit`,
      request
    );
    return response.data;
  } catch (error) {
    console.error('Error in editB06006:', error);
    throw error;
  }
};

// 刪除
export const deleteB06006 = async (
  request: Data
): Promise<ApiResponse<any>> => {
  try {
    const response = await api.post<ApiResponse<any>>(
      `${basePath}/delete`,
      request
    );
    return response.data;
  } catch (error) {
    console.error('Error in deleteB06006:', error);
    throw error;
  }
};

// 執行排程
export const executeScheduleB06006 = async (
  request: Data
): Promise<ApiResponse<any>> => {
  try {
    const response = await api.post<ApiResponse<any>>(
      `${basePath}/exeScedule`, // 注意：後端拼字錯誤也要對應
      request
    );
    return response.data;
  } catch (error) {
    console.error('Error in executeScheduleB06006:', error);
    throw error;
  }
};
