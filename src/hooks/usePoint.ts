import { useEffect, useState } from 'react';
import { cartApi } from '../apis/cartProducts';
import { useRecoilValue } from 'recoil';
import { hostNameAtom } from '../recoil/hostData';

const usePoint = () => {
  const hostName = useRecoilValue(hostNameAtom);
  const [userPoint, setUserPoint] = useState(0);
  const [minUsagePoints, setMinUsagePoints] = useState(0);
  const [userUsedPoint, setUserUsedPoint] = useState(0);

  const handleUserUsedPointUpdate = (updatedUserUsedPoint: number) => {
    setUserUsedPoint(updatedUserUsedPoint);
  };

  useEffect(() => {
    const fetchUserPoints = async () => {
      const response = await await cartApi(hostName).then((apiInstance) => {
        return apiInstance.fetchCartProducts();
      });
      setUserPoint(response.userPoint);
      setMinUsagePoints(response.minUsagePoints);
    };
    fetchUserPoints();
  }, []);

  return {
    userPoint,
    minUsagePoints,
    userUsedPoint,
    handleUserUsedPointUpdate,
  };
};

export default usePoint;
