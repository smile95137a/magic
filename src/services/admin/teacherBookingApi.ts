const mockDelay = <T>(data: T, ms = 500): Promise<{ data: T }> =>
  new Promise((resolve) => setTimeout(() => resolve({ data }), ms));

export const fetchBookingList = () => {
  return mockDelay([
    {
      id: 1,
      studentName: '王小美',
      teacherName: '林老師',
      time: '2025-06-30 10:00',
      status: '已完成',
      note: '希望加強事業運',
      contact: '0912-345-678',
      createdAt: '2025-06-25 09:00',
    },
    {
      id: 2,
      studentName: '陳大文',
      teacherName: '林老師',
      time: '2025-06-30 13:00',
      status: '待確認',
      note: '會準時抵達',
      contact: '0955-123-456',
      createdAt: '2025-06-26 11:23',
    },
    {
      id: 3,
      studentName: '李佳怡',
      teacherName: '李老師',
      time: '2025-07-01 09:30',
      status: '已取消',
      contact: '',
      createdAt: '2025-06-24 18:01',
    },
  ]);
};

export const updateBookingStatus = (id: number, status: string) => {
  return mockDelay({ success: true });
};
