import { useRecoilCallback, useRecoilValue } from 'recoil';
import { fetchPoint } from '../remotes/point';
import { serverOriginState } from '../recoil/atoms/common';
import { pointState } from '../recoil/atoms/point';
import { POINT_BASE_URL } from '../constants/api';

const usePoint = () => {
  const point = useRecoilValue(pointState);
  const serverOrigin = useRecoilValue(serverOriginState);

  const updatePoint = useRecoilCallback(
    ({ set }) =>
      async () => {
        const newPoint = await fetchPoint(`${serverOrigin}${POINT_BASE_URL}`);

        set(pointState, newPoint);
      },
    [serverOrigin],
  );

  return {
    point,
    updatePoint,
  };
};

export default usePoint;
