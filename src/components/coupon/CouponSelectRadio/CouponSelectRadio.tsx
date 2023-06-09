import { useRecoilValue } from 'recoil';
import { useEffect } from 'react';
import { styled } from 'styled-components';
import useFetch from '../../../hooks/api/useFetch';
import type CouponInfo from '../../../types/coupon';
import serverNameState from '../../../globalState/atoms/serverName';
import ServerUtil from '../../../utils/ServerUrl';
import { USER_AUTH_TOKEN } from '../../../constant';

interface CouponSelectRadioProps {
  selected: CouponInfo | null;
  setSelected: (coupon: CouponInfo | null) => void;
}

const CouponSelectRadio = (props: CouponSelectRadioProps) => {
  const { selected, setSelected } = props;

  const serverName = useRecoilValue(serverNameState);
  const url = ServerUtil.getUserCouponsUrl(serverName);

  useEffect(() => {
    setSelected(null);
  }, [serverName]);

  const { getData } = useFetch<{ coupons: CouponInfo[] }>(url, USER_AUTH_TOKEN);

  const data = getData();
  const currentCoupon = selected
    ? `현재: ${selected.amount}${selected.type === 'percent' ? '%' : '원'} 할인`
    : '고른 쿠폰이 없어요';

  return (
    <Details>
      <Summary>
        쿠폰 적용 <CurrentCouponSpan>({currentCoupon})</CurrentCouponSpan>
      </Summary>
      <FieldSet>
        <CouponLabel htmlFor="empty">
          <input
            type="radio"
            id="empty"
            checked={selected === null}
            onClick={() => setSelected(null)}
            readOnly
          />
          <p>선택 안 함</p>
        </CouponLabel>
        {data?.coupons.map((coupon) => {
          const { id, name, type, amount } = coupon;

          return (
            <CouponLabel key={id} htmlFor={id.toString()}>
              <input
                type="radio"
                id={id.toString()}
                checked={!!selected && selected.id === id}
                onClick={() => setSelected(coupon)}
                readOnly
              />
              <p>{`${amount}${type === 'percent' ? '%' : '원'} 할인`}</p>
              <span aria-hidden="true">|</span>
              <p>{name}</p>
            </CouponLabel>
          );
        })}
      </FieldSet>
    </Details>
  );
};

const Details = styled.details`
  border: 1px solid #dddddd;
  color: #333333;
`;

const Summary = styled.summary`
  padding: 20px 30px;
  font-weight: 400;
  font-size: 24px;
`;

const FieldSet = styled.fieldset`
  display: flex;
  flex-direction: column;
  row-gap: 15px;

  padding: 35px;

  border: none;
  border-top: 3px solid #dddddd;
  font-size: 1.2rem;
`;

const CouponLabel = styled.label`
  display: block;

  overflow: hidden;
  cursor: pointer;

  & > * {
    display: inline;
    margin-right: 15px;
  }
`;

const CurrentCouponSpan = styled.span`
  color: #777777;
  font-size: 1rem;
`;

export default CouponSelectRadio;
