import { api } from './FrontAPI';

const basePath = '/b06001';

interface QueryRequest {
  [key: string]: any;
}

interface Data {
  [key: string]: any;
}

export const queryCustomerId = async (req: any) => {
  try {
    const response = await api.post(`${basePath}/queryCustomerId`, req);
    return response.data;
  } catch (error) {
    console.error('Error querying customerId:', error);
    throw error;
  }
};

/**
 * 查詢所有客戶
 */
export const queryCustomerList = async (): Promise<ApiResponse<any[]>> => {
  try {
    const response = await api.post<ApiResponse<any[]>>(
      `${basePath}/queryCustomerList`
    );
    return response.data;
  } catch (error) {
    console.error('Error querying customers:', error);
    throw error;
  }
};

/**
 * 查詢所有業務名稱
 */
export const queryBiznameList = async (): Promise<ApiResponse<any[]>> => {
  try {
    const response = await api.post<ApiResponse<any[]>>(
      `${basePath}/queryBiznameList`
    );
    return response.data;
  } catch (error) {
    console.error('Error querying business names:', error);
    throw error;
  }
};

/**
 * 查詢所有公告類型
 */
export const queryNoticetypeList = async (): Promise<ApiResponse<any[]>> => {
  try {
    const response = await api.post<ApiResponse<any[]>>(
      `${basePath}/queryNoticetypeList`
    );
    return response.data;
  } catch (error) {
    console.error('Error querying notice types:', error);
    throw error;
  }
};

export const queryB06001 = async (
  request: QueryRequest
): Promise<ApiResponse<any[]>> => {
  try {
    const response = await api.post<ApiResponse<any[]>>(
      `${basePath}/query`,
      request
    );
    return response.data;
  } catch (error) {
    console.error('Error querying notices:', error);
    throw error;
  }
};

export const createNotice = async (
  noticeData: any
): Promise<ApiResponse<string>> => {
  try {
    const formData = new FormData();
    formData.append('noticeType', noticeData.noticeType);
    formData.append('bizcode', noticeData.bizcode);
    formData.append('pubTimeBegin', noticeData.pubTimeBegin);
    formData.append('pubTimeEnd', noticeData.pubTimeEnd);
    formData.append('customerId', noticeData.customerId);
    formData.append('content', noticeData.content);

    if (noticeData.smallFile) {
      formData.append('smallFile', noticeData.smallFile);
    }
    if (noticeData.bigFile) {
      formData.append('bigFile', noticeData.bigFile);
    }

    const response = await api.post<ApiResponse<string>>(
      `${basePath}/create`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error creating notice:', error);
    throw error;
  }
};

/**
 * 更新公告（含圖檔）
 */
export const updateNotice = async (
  noticeData: any
): Promise<ApiResponse<string>> => {
  try {
    const formData = new FormData();
    formData.append('id', noticeData.id);
    formData.append('noticeType', noticeData.noticeType);
    formData.append('bizcode', noticeData.bizcode);
    formData.append('pubTimeBegin', noticeData.pubTimeBegin);
    formData.append('pubTimeEnd', noticeData.pubTimeEnd);
    formData.append('customerId', noticeData.customerId);
    formData.append('content', noticeData.content);

    if (noticeData.smallFile instanceof File) {
      formData.append('smallFile', noticeData.smallFile);
    }

    if (noticeData.bigFile instanceof File) {
      formData.append('bigFile', noticeData.bigFile);
    }

    const response = await api.post<ApiResponse<string>>(
      `${basePath}/update`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error updating notice:', error);
    throw error;
  }
};

/**
 * 刪除公告
 */
export const deleteNoticeByIds = async (
  noticeIds: string[]
): Promise<ApiResponse<any>> => {
  try {
    const response = await api.post<ApiResponse<any>>(`${basePath}/delete`, {
      noticeIds,
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting notices:', error);
    throw error;
  }
};

/**
 * 根據 ID 查詢公告明細
 */
export const getB06001 = async (id: any): Promise<ApiResponse<any>> => {
  try {
    const response = await api.post<ApiResponse<any>>(
      `${basePath}/getB06001/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching notice detail for ID ${id}:`, error);
    throw error;
  }
};
