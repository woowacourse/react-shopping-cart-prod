import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';
import serverNameState from '../../../globalState/atoms/serverName';
import useFetch from '../../../hooks/api/useFetch';
import type CouponInfo from '../../../types/coupon';
import ServerUtil from '../../../utils/ServerUrl';
import { USER_AUTH_TOKEN } from '../../../constant';
import Coupon from '../../common/Coupon/Coupon';

const CouponList = () => {
  const serverName = useRecoilValue(serverNameState);
  const couponsUrl = ServerUtil.getCouponsUrl(serverName);

  const { getData } = useFetch<{ coupons: CouponInfo[] }>(couponsUrl);
  const data = getData();

  const makeDownloadCouponFunction = (couponId: number) => async () => {
    const url = ServerUtil.getUserCouponsUrl(serverName);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${USER_AUTH_TOKEN}`,
      },
      body: JSON.stringify({ couponId }),
    });

    if (Math.floor(response.status / 100) === 5) {
      alert('서버 문제로 쿠폰 발급에 실패하였습니다.');
      return;
    }

    if (Math.floor(response.status / 100) === 4) {
      alert('이미 발급받은 쿠폰입니다!');
      return;
    }

    alert('쿠폰이 발급되었습니다.');
  };

  return (
    <CouponUl>
      {data?.coupons.map(({ name, id, amount, type }) => (
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
