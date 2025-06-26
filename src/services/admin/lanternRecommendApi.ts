// @/services/admin/lanternRecommendApi.ts

const mockDelay = <T>(data: T, ms = 300): Promise<{ data: T }> =>
  new Promise((resolve) => setTimeout(() => resolve({ data }), ms));

let mockLanternRecommends = [
  { id: 1, lanternId: 1, priority: 1, note: '適合生肖牛' },
  { id: 2, lanternId: 2, priority: 2, note: '推薦事業型用戶' },
];

export const fetchLanternRecommendList = () =>
  mockDelay([...mockLanternRecommends]);

export const fetchLanternRecommendById = (id: number | string) =>
  mockDelay(mockLanternRecommends.find((l) => l.id == id) || {});

export const createLanternRecommend = (data: any) => {
  const id = Math.max(...mockLanternRecommends.map((l) => l.id)) + 1;
  mockLanternRecommends.push({ id, ...data });
  return mockDelay({ success: true });
};

export const updateLanternRecommend = (id: number | string, data: any) => {
  const index = mockLanternRecommends.findIndex((l) => l.id == id);
  if (index !== -1) mockLanternRecommends[index] = { id: Number(id), ...data };
  return mockDelay({ success: true });
};

export const deleteLanternRecommend = (id: number) => {
  mockLanternRecommends = mockLanternRecommends.filter((l) => l.id !== id);
  return mockDelay({ success: true });
};
