// src/services/admin/adminOrderServices.ts
import { ApiResponse } from '@/vite-env';
import { api } from './AdminApi';

const basePath = '/admin/order';

// 查詢訂單列表 POST /list
export const fetchOrderList = async (
  payload: any // 建議建立 QueryOrderAdminRequest 型別
): Promise<ApiResponse<any[]>> => {
  try {
    const res = await api.post(`${basePath}/list`, payload);
    return res.data;
  } catch (error) {
    console.error('fetchOrderList error:', error);
    throw error;
  }
};

// 查詢訂單詳情 GET /detail/{orderId}
export const fetchOrderDetail = async (
  orderId: string
): Promise<ApiResponse<any>> => {
  try {
    const res = await api.get(`${basePath}/detail/${orderId}`);
    return res.data;
  } catch (error) {
    console.error('fetchOrderDetail error:', error);
    throw error;
  }
};

// 批次更新訂單狀態 POST /status/batch-update
export const updateOrderStatusBatch = async (
  payload: any // 建議建立 UpdateOrderStatusBatchRequest 型別
): Promise<ApiResponse<boolean>> => {
  try {
    const res = await api.post(`${basePath}/status/batch-update`, payload);
    return res.data;
  } catch (error) {
    console.error('updateOrderStatusBatch error:', error);
    throw error;
  }
};

// 標記準備出貨 POST /status/mark-ready-to-ship
export const markOrdersReadyToShip = async (
  payload: any[] // 建議建立 MarkReadyToShipRequest[] 型別
): Promise<ApiResponse<boolean>> => {
  try {
    const res = await api.post(
      `${basePath}/status/mark-ready-to-ship`,
      payload
    );
    return res.data;
  } catch (error) {
    console.error('markOrdersReadyToShip error:', error);
    throw error;
  }
};

// 可更改的訂單狀態清單 GET /status/updatable-list
export const fetchUpdatableOrderStatusList = async (): Promise<
  ApiResponse<any[]> // 建議建立 OrderStatusVO[]
> => {
  try {
    const res = await api.get(`${basePath}/status/updatable-list`);
    return res.data;
  } catch (error) {
    console.error('fetchUpdatableOrderStatusList error:', error);
    throw error;
  }
};

// 出貨單資訊 GET /delivery-note/{orderId}
export const fetchDeliveryNote = async (
  orderId: string
): Promise<ApiResponse<any>> => {
  try {
    const res = await api.get(`${basePath}/delivery-note/${orderId}`);
    return res.data;
  } catch (error) {
    console.error('fetchDeliveryNote error:', error);
    throw error;
  }
};
