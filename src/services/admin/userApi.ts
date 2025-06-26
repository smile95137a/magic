let mockUsers = [
  { id: 1, name: '王小明', email: 'ming@example.com' },
  { id: 2, name: '陳美麗', email: 'mei@example.com' },
];

const mockDelay = <T>(data: T, ms = 300): Promise<{ data: T }> =>
  new Promise((resolve) => setTimeout(() => resolve({ data }), ms));

export const fetchUserList = () => mockDelay([...mockUsers]);

export const fetchUserById = (id: string | number) =>
  mockDelay(mockUsers.find((u) => u.id == id) || {});

export const createUser = (data: any) => {
  const id = Math.max(...mockUsers.map((u) => u.id)) + 1;
  mockUsers.push({ id, ...data });
  return mockDelay({ success: true });
};

export const updateUser = (id: string | number, data: any) => {
  const index = mockUsers.findIndex((u) => u.id == id);
  if (index !== -1) mockUsers[index] = { id: Number(id), ...data };
  return mockDelay({ success: true });
};

export const deleteUser = (id: number) => {
  mockUsers = mockUsers.filter((u) => u.id !== id);
  return mockDelay({ success: true });
};
