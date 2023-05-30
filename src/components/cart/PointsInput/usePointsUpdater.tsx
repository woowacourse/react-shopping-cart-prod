import { useRecoilState } from 'recoil';
import { pointsState } from '../../../recoil/atoms';
import { ChangeEvent } from 'react';

const usePointsUpdater = () => {
  const [{ selectedPoints, maxPoints }, setPoints] =
    useRecoilState(pointsState);

  const sanitizePoints = (points: string) => {
    const numericPoints = Number(points.replace(/[^0-9]/g, ''));

    return Math.min(Math.max(numericPoints, 0), maxPoints);
  };

  const updatePoints = (e: ChangeEvent<HTMLInputElement>) => {
    const originalPoints = e.target.value;

    setPoints(({ maxPoints }) => ({
      selectedPoints: sanitizePoints(originalPoints),
      maxPoints,
    }));
  };

  return {
    selectedPoints,
    maxPoints,
    updatePoints,
  };
};

export default usePointsUpdater;
