const mockDelay = <T>(data: T, ms = 300): Promise<{ data: T }> =>
  new Promise((resolve) => setTimeout(() => resolve({ data }), ms));

let mockCategories = [
  { id: 1, name: '生活用品' },
  { id: 2, name: '祈福商品' },
];

export const fetchMallCategoryList = () => mockDelay([...mockCategories]);

export const fetchMallCategoryById = (id: string | number) =>
  mockDelay(mockCategories.find((c) => c.id == id) || {});

export const createMallCategory = (data: any) => {
  const id = Math.max(...mockCategories.map((c) => c.id)) + 1;
  mockCategories.push({ id, ...data });
  return mockDelay({ success: true });
};

export const updateMallCategory = (id: string | number, data: any) => {
  const index = mockCategories.findIndex((c) => c.id == id);
  if (index !== -1) mockCategories[index] = { id: Number(id), ...data };
  return mockDelay({ success: true });
};

export const deleteMallCategory = (id: number) => {
  mockCategories = mockCategories.filter((c) => c.id !== id);
  return mockDelay({ success: true });
};
