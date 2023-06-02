import { useRecoilValue } from 'recoil';
import serverNameState from '../../../globalState/atoms/serverName';
import ServerUtil from '../../../utils/ServerUrl';
import useFetch from '../../../hooks/api/useFetch';
import CouponItem from '../CouponItem/CouponItem';
import { FetchCouponsResponse } from '../../../types/api';

const CouponList = () => {
  const serverName = useRecoilValue(serverNameState);
  const couponsUrl = ServerUtil.getCouponsUrl(serverName);

  const { getData, error } = useFetch<FetchCouponsResponse>(couponsUrl);

  if (error) {
    throw error;
  }

  const fetchedData = getData();
  const couponList = fetchedData?.coupons;

  return (
    <ul>
      {couponList?.map((coupon) => (
        <li key={coupon.id}>
          <CouponItem {...coupon} />
        </li>
      ))}
    </ul>
  );
};

export default CouponList;
