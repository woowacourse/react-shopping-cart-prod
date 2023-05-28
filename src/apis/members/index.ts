import api from "apis";

const URL = '/members/point'

export type point = {
  pts: number;
}
export const getUserPoints = async (): Promise<point> => {
  const fetchedData = await api.get<point>(URL);
  const point = fetchedData.data;

  return (point);
};