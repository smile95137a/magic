// src/services/admin/reportService.ts
import { RecordPeriodRequest, RecordVO, MasterReservationFilter, MasterServiceRequestVO } from '@/vite-env';
import { api } from '../FrontAPI';


const basePath = '/report';

/**
 * 查詢點燈購買紀錄報表
 */
export const fetchLanternPurchaseReport = async (req: RecordPeriodRequest): Promise<RecordVO[]> => {
  try {
    const res = await api.post(`${basePath}/lantern`, req);
    return res.data;
  } catch (error) {
    console.error('fetchLanternPurchaseReport error:', error);
    throw error;
  }
};

/**
 * 查詢供品購買紀錄報表
 */
export const fetchOfferingPurchaseReport = async (req: RecordPeriodRequest): Promise<RecordVO[]> => {
  try {
    const res = await api.post(`${basePath}/offering`, req);
    return res.data;
  } catch (error) {
    console.error('fetchOfferingPurchaseReport error:', error);
    throw error;
  }
};

/**
 * 查詢老師預約紀錄報表
 */
export const fetchMasterReservationReport = async (
  req: MasterReservationFilter,
): Promise<MasterServiceRequestVO[]> => {
  try {
    const res = await api.post(`${basePath}/master-reservation`, req);
    return res.data;
  } catch (error) {
    console.error('fetchMasterReservationReport error:', error);
    throw error;
  }
};
