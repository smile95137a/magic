import { api } from './FrontAPI';

const basePath = '/poem';

export const drawPoem = async (): Promise<any> => {
  try {
    const response = await api.post(`${basePath}/drawing`);
    return response.data;
  } catch (error) {
    console.error('drawPoem error:', error);
    throw error;
  }
};
