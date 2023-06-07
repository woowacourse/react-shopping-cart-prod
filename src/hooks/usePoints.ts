import { useRecoilCallback, useRecoilValue, useRecoilState } from 'recoil';
import { pointsState } from '../recoil/atoms';
import { serverOriginState } from '../recoil/atoms';
import { fetchCurrentPoints } from '../remotes/points';
import { POINTS_BASE_URL } from '../constants/api';

const usePoints = () => {
  const serverOrigin = useRecoilValue(serverOriginState);
  const [{ selectedPoints, maxPoints }, setPoints] =
    useRecoilState(pointsState);

  const syncPoints = useRecoilCallback(
    ({ set }) =>
      async () => {
        const maxPoints = await fetchCurrentPoints(
          `${serverOrigin}${POINTS_BASE_URL}`,
        );

        set(pointsState, { selectedPoints: 0, maxPoints });
      },
    [serverOrigin],
  );

  const setSelectedPoints = (selectedPoints: number) => {
    setPoints(({ maxPoints }) => ({
      selectedPoints,
      maxPoints,
    }));
  };
  return { selectedPoints, maxPoints, syncPoints, setSelectedPoints };
};

export default usePoints;
