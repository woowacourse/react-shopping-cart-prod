import api from "apis";

const URL = '/members/point'

export type Point = {
  point: number;
}
export const getUserPoints = async (): Promise<Point> => {
  const data = await api.get<Point>(URL);
  const point = data.data;

  return (point);
};