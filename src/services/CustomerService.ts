import { api } from './FrontAPI';

const basePath = '/customers';

// 查詢啟用客戶
export const queryActiveCustomers = async (): Promise<ApiResponse<any>> => {
  try {
    const response = await api.post<ApiResponse<any>>(`${basePath}/active`);
    return response.data;
  } catch (error) {
    console.error('Error querying active customers:', error);
    throw error;
  }
};

// 查詢所有客戶
export const queryAllCustomers = async (): Promise<ApiResponse<any>> => {
  try {
    const response = await api.post<ApiResponse<any>>(`${basePath}/queryAll`);
    return response.data;
  } catch (error) {
    console.error('Error querying all customers:', error);
    throw error;
  }
};

// 根據ID查詢客戶
export const queryCustomerById = async (
  id: string
): Promise<ApiResponse<any>> => {
  try {
    const response = await api.post<ApiResponse<any>>(
      `${basePath}/query/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(`Error querying customer with ID ${id}:`, error);
    throw error;
  }
};

// 儲存或更新客戶
export const saveCustomer = async (
  customer: any
): Promise<ApiResponse<any>> => {
  try {
    const response = await api.post<ApiResponse<any>>(
      `${basePath}/save`,
      customer
    );
    return response.data;
  } catch (error) {
    console.error('Error saving customer:', error);
    throw error;
  }
};

// 刪除客戶
export const deleteCustomer = async (id: string): Promise<ApiResponse<any>> => {
  try {
    const response = await api.post<ApiResponse<any>>(
      `${basePath}/delete/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(`Error deleting customer with ID ${id}:`, error);
    throw error;
  }
};
