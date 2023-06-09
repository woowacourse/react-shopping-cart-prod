import { useRecoilValue } from 'recoil';
import { fetchPoint } from '../remotes/point';
import { serverOriginState } from '../recoil/atoms/common';
import { POINT_BASE_URL } from '../constants/api';
import { userState } from '../recoil/atoms/auth';
import { getBase64 } from '../constants/auth';
import useToast from '../components/common/Toast/useToast';
import { useEffect, useState } from 'react';

const usePoint = () => {
  const [point, setPoint] = useState(0);
  const serverOrigin = useRecoilValue(serverOriginState);
  const user = useRecoilValue(userState);
  const { showToast } = useToast();

  const updatePoint = async () => {
    try {
      const point = await fetchPoint(
        `${serverOrigin}${POINT_BASE_URL}`,
        getBase64(user),
      );
      setPoint(point);
    } catch (e) {
      if (e instanceof Error) {
        showToast('error', e.message);
      }
    }
  };

  useEffect(() => {
    updatePoint();
  }, [serverOrigin, user]);

  return {
    point,
  };
};

export default usePoint;
