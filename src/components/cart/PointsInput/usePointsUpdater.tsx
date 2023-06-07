import { useEffect, ChangeEvent } from 'react';
import usePoints from '../../../hooks/usePoints';

const usePointsUpdater = () => {
  const { selectedPoints, maxPoints, syncPoints, setSelectedPoints } =
    usePoints();

  useEffect(() => {
    syncPoints();
  }, []);

  const sanitizePoints = (points: string) => {
    const numericPoints = Number(points.replace(/[^0-9]/g, ''));

    return Math.min(Math.max(numericPoints, 0), maxPoints);
  };

  const updatePoints = (e: ChangeEvent<HTMLInputElement>) => {
    const originalPoints = e.target.value;

    setSelectedPoints(sanitizePoints(originalPoints));
  };

  return {
    selectedPoints,
    maxPoints,
    updatePoints,
  };
};

export default usePointsUpdater;
