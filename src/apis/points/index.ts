import api from 'apis';

const URL = '/members/point';

type ServerUserOwnPoints = {
  point: number;
};

export const getUserOwnPoints = async () => {
  const { data: userOwnPoints } = await api.get<ServerUserOwnPoints>(URL);

  return userOwnPoints.point;
};
