import { useRecoilValue } from 'recoil';
import serverNameState from '../../../globalState/atoms/serverName';
import UrlConfig from '../../../utils/urlConfig';
import useFetch from '../../../hooks/api/useFetch';
import CouponItem from '../CouponItem/CouponItem';
import { FetchCouponsResponse } from '../../../types/api';
import { styled } from 'styled-components';

const CouponList = () => {
  const serverName = useRecoilValue(serverNameState);
  const couponsUrl = UrlConfig.getCouponsUrl(serverName);

  const { getData, error } = useFetch<FetchCouponsResponse>(couponsUrl);

  if (error) {
    throw error;
  }

  const fetchedData = getData();
  const couponList = fetchedData?.coupons;

  return (
    <CouponListWrapper>
      {couponList?.map((coupon) => (
        <li key={coupon.id}>
          <CouponItem {...coupon} />
        </li>
      ))}
    </CouponListWrapper>
  );
};

const CouponListWrapper = styled.ul`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  gap: 15px;

  overflow-y: auto;
`;

export default CouponList;
