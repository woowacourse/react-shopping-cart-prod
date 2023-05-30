import api from "apis";

const URL = '/members/point'

export type Point = {
  point: number;
}
export const getUserPoints = async (): Promise<Point> => {
  const data = await api.get<Point>(URL, { id: "a@a.com", password: 1234 });
  const point = data.data;

  return (point);
};