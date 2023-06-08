import { httpRequestWithBase64 } from './http';

export const fetchPoint = async (url: string, base64: string) => {
  const { _get } = httpRequestWithBase64(base64);
  const response = await _get(url);

  if (!response.ok) {
    throw new Error('보유 중인 포인트 정보를 불러올 수 없습니다.');
  }

  const { points } = await response.json();

  return points;
};

export const fetchSavedPointByOrder = async (url: string, base64: string) => {
  const { _get } = httpRequestWithBase64(base64);
  const response = await _get(url);

  if (!response.ok) {
    throw new Error('해당 주문으로 적립된 포인트 정보를 불러올 수 없습니다.');
  }

  const { points_saved } = await response.json();

  return points_saved;
};
