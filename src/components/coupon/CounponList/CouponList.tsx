import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';
import { useCallback } from 'react';
import serverNameState from '../../../globalState/atoms/serverName';
import usePromise from '../../../hooks/usePromise';
import type { CouponInfo } from '../../../types/coupon';
import Coupon from '../../common/Coupon/Coupon';
import CouponApi from '../../../api/Coupon';

const CouponList = () => {
  const serverName = useRecoilValue(serverNameState);

  const couponFetcher = useCallback(() => CouponApi.getPublicList(serverName), [serverName]);
  const { getData } = usePromise<CouponInfo[]>(couponFetcher);

  const coupons = getData();

  const makeDownloadCouponFunction = (couponId: number) => async () => {
    try {
      await CouponApi.download(serverName, couponId);
      alert('쿠폰이 발급되었어요.');
    } catch (error) {
      if (error instanceof Error) alert(error.message);
      else throw error;
    }
  };

  return (
    <CouponUl>
      {coupons?.map(({ name, id, amount, type }) => (
        <li key={name}>
          <Coupon
            couponName={name}
            type={type}
            amount={amount}
            footer="사용 후 재발급 가능"
            onDownloadClick={makeDownloadCouponFunction(id)}
          />
        </li>
      ))}
    </CouponUl>
  );
};

const CouponUl = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 60px;
`;

export default CouponList;
