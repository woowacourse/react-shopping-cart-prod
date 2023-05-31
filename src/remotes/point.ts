import { base64 } from '../constants/auth';

export const fetchPoint = async (url: string) => {
  const response = await fetch(url, {
    headers: {
      Authorization: `Basic ${base64}`,
    },
  });

  if (!response.ok) {
    throw new Error('보유 중인 포인트 정보를 불러올 수 없습니다.');
  }

  const point = await response.json();

  return point;
};
