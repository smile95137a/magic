// @/api/admin/teacherApi.ts

// 模擬延遲工具
const mockDelay = <T>(data: T, ms = 500): Promise<{ data: T }> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data });
    }, ms);
  });

// 老師清單
export const fetchTeacherList = () =>
  mockDelay([
    { id: 1, name: '王小明', email: 'ming@example.com', phone: '0912345678' },
    { id: 2, name: '陳美麗', email: 'mei@example.com', phone: '0922333444' },
  ]);

// 查詢單一老師
export const fetchTeacherById = (id: string) =>
  mockDelay({
    id,
    name: `老師 ${id}`,
    email: `teacher${id}@example.com`,
    phone: '0911222333',
  });

// 新增老師
export const createTeacher = (data: any) => {
  console.log('🔧 模擬新增老師:', data);
  return mockDelay({ success: true });
};

// 更新老師
export const updateTeacher = (id: string, data: any) => {
  console.log(`🔧 模擬更新老師 ${id}:`, data);
  return mockDelay({ success: true });
};

// 刪除老師
export const deleteTeacher = (id: number) => {
  console.log(`🔧 模擬刪除老師 ID: ${id}`);
  return mockDelay({ success: true });
};
