import { api } from './FrontAPI';
const basePath = '/users';

export const getAllUsers = async (): Promise<ApiResponse<any[]>> => {
  try {
    const response = await api.get<ApiResponse<any[]>>(basePath);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const getUserById = async (id: string): Promise<ApiResponse<any>> => {
  try {
    const response = await api.get<ApiResponse<any>>(`${basePath}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching any with ID ${id}:`, error);
    throw error;
  }
};

export const queryUser = async (data: any): Promise<ApiResponse<any[]>> => {
  try {
    const response = await api.post<ApiResponse<any[]>>(
      `${basePath}/queryUser`,
      data
    );
    return response.data;
  } catch (error) {
    console.error('Error querying any:', error);
    throw error;
  }
};

export const createUser = async (data: any): Promise<ApiResponse<any>> => {
  try {
    const response = await api.post<ApiResponse<any>>(
      `${basePath}/createUser`,
      data
    );
    return response.data;
  } catch (error) {
    console.error('Error creating any:', error);
    throw error;
  }
};

export const updateUser = async (data: any): Promise<ApiResponse<any>> => {
  try {
    const response = await api.put<ApiResponse<any>>(basePath, data);
    return response.data;
  } catch (error) {
    console.error('Error updating any:', error);
    throw error;
  }
};

export const deleteUser = async (id: string): Promise<ApiResponse<void>> => {
  try {
    const response = await api.delete<ApiResponse<void>>(`${basePath}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting any with ID ${id}:`, error);
    throw error;
  }
};
