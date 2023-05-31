import api from 'apis';

const URL = '/members/point';

type ServerUserOwnPoints = {
  point: number;
};

export const getUserOwnPoints = async () => {
  const fetchedData = await api.get<ServerUserOwnPoints>(URL);
  const userOwnPoints = fetchedData.data;

  return userOwnPoints.point;
};
