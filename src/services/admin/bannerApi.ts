// @/services/admin/bannerApi.ts

const mockDelay = <T>(data: T, ms = 300): Promise<{ data: T }> =>
  new Promise((resolve) => setTimeout(() => resolve({ data }), ms));

let mockBanners = [
  {
    id: 1,
    title: '夏季活動',
    imageUrl: 'https://placehold.co/200x60?text=Summer',
  },
  {
    id: 2,
    title: '冬季優惠',
    imageUrl: 'https://placehold.co/200x60?text=Winter',
  },
];

export const fetchBannerList = () => mockDelay([...mockBanners]);

export const fetchBannerById = (id: string | number) =>
  mockDelay(mockBanners.find((b) => b.id == id) || {});

export const createBanner = (data: any) => {
  const id = Math.max(...mockBanners.map((b) => b.id)) + 1;
  mockBanners.push({ id, ...data });
  return mockDelay({ success: true });
};

export const updateBanner = (id: string | number, data: any) => {
  const index = mockBanners.findIndex((b) => b.id == id);
  if (index !== -1) mockBanners[index] = { id: Number(id), ...data };
  return mockDelay({ success: true });
};

export const deleteBanner = (id: number) => {
  mockBanners = mockBanners.filter((b) => b.id !== id);
  return mockDelay({ success: true });
};
