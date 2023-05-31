import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { hostNameAtom } from '../recoil/hostData';
import { fetchPoint } from '../apis/point';

const usePoint = () => {
  const hostName = useRecoilValue(hostNameAtom);
  const [userPoint, setUserPoint] = useState(0);
  const [minUsagePoint, setMinUsagePoint] = useState(0);
  const [userUsedPoint, setUserUsedPoint] = useState(0);

  const handleUserUsedPointUpdate = (updatedUserUsedPoint: number) => {
    setUserUsedPoint(updatedUserUsedPoint);
  };

  useEffect(() => {
    const fetchUserPoints = async () => {
      const response = await fetchPoint(hostName);

      setUserPoint(response.userPoint);
      setMinUsagePoint(response.minUsagePoint);
    };
    fetchUserPoints();
  }, []);

  return {
    userPoint,
    minUsagePoint,
    userUsedPoint,
    handleUserUsedPointUpdate,
  };
};

export default usePoint;
