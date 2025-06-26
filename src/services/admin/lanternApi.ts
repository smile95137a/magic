// @/services/admin/lanternApi.ts

const mockDelay = <T>(data: T, ms = 300): Promise<{ data: T }> =>
  new Promise((resolve) => setTimeout(() => resolve({ data }), ms));

let mockLanterns = [
  { id: 1, name: '平安燈', price: 100, description: '保佑平安' },
  { id: 2, name: '事業燈', price: 200, description: '事業順利' },
];

export const fetchLanternList = () => mockDelay([...mockLanterns]);

export const fetchLanternById = (id: number | string) =>
  mockDelay(mockLanterns.find((l) => l.id == id) || {});

export const createLantern = (data: any) => {
  const id = Math.max(...mockLanterns.map((l) => l.id)) + 1;
  mockLanterns.push({ id, ...data });
  return mockDelay({ success: true });
};

export const updateLantern = (id: number | string, data: any) => {
  const index = mockLanterns.findIndex((l) => l.id == id);
  if (index !== -1) mockLanterns[index] = { id: Number(id), ...data };
  return mockDelay({ success: true });
};

export const deleteLantern = (id: number) => {
  mockLanterns = mockLanterns.filter((l) => l.id !== id);
  return mockDelay({ success: true });
};
