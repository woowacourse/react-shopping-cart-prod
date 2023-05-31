import { useEffect, useState } from 'react';
import { cartApi } from '../apis/cartProducts';
import { useRecoilValue } from 'recoil';
import { hostNameAtom } from '../recoil/hostData';

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
      const response = await await cartApi(hostName).then((apiInstance) => {
        return apiInstance.fetchCartProducts();
      });
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
