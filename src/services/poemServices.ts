// src/services/front/poemServices.ts
import { Poem } from '@/vite-env';
import { api } from './FrontAPI';

const basePath = '/poem';


/**
 * 隨機抽取詩籤
 */
export const getRandomPoem = async (): Promise<Poem> => {
  try {
    const response = await api.post(`${basePath}/drawing`);
    return response.data;
  } catch (error) {
    console.error('getRandomPoem error:', error);
    throw error;
  }
};
