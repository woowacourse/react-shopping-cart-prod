import { useRecoilCallback, useRecoilValue } from 'recoil';
import { fetchPoint } from '../remotes/point';
import { serverOriginState } from '../recoil/atoms/common';
import { pointState } from '../recoil/atoms/point';
import { POINT_BASE_URL } from '../constants/api';
import { userState } from '../recoil/atoms/auth';
import { getBase64 } from '../constants/auth';

const usePoint = () => {
  const point = useRecoilValue(pointState);
  const serverOrigin = useRecoilValue(serverOriginState);
  const user = useRecoilValue(userState);

  const updatePoint = useRecoilCallback(
    ({ set, snapshot }) =>
      async () => {
        const newUser = await snapshot.getPromise(userState);
        const newPoint = await fetchPoint(
          `${serverOrigin}${POINT_BASE_URL}`,
          getBase64(newUser),
        );

        set(pointState, newPoint);
      },
    [serverOrigin, user],
  );

  return {
    point,
    updatePoint,
  };
};

export default usePoint;
