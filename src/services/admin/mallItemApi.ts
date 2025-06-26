const mockDelay = <T>(data: T, ms = 300): Promise<{ data: T }> =>
  new Promise((resolve) => setTimeout(() => resolve({ data }), ms));

let mockItems = [
  {
    id: 1,
    name: '祈福香',
    price: 100,
    categoryId: 2,
  },
  {
    id: 2,
    name: '平安符',
    price: 200,
    categoryId: 2,
  },
];

export const fetchMallItemList = () => mockDelay([...mockItems]);

export const fetchMallItemById = (id: string | number) =>
  mockDelay(mockItems.find((i) => i.id == id) || {});

export const createMallItem = (data: any) => {
  const id = Math.max(...mockItems.map((i) => i.id)) + 1;
  mockItems.push({ id, ...data });
  return mockDelay({ success: true });
};

export const updateMallItem = (id: string | number, data: any) => {
  const index = mockItems.findIndex((i) => i.id == id);
  if (index !== -1) mockItems[index] = { id: Number(id), ...data };
  return mockDelay({ success: true });
};

export const deleteMallItem = (id: number) => {
  mockItems = mockItems.filter((i) => i.id !== id);
  return mockDelay({ success: true });
};
