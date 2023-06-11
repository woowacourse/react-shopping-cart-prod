import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';
import { useCallback } from 'react';
import usePromise from '../../../hooks/usePromise';
import type { CouponInfo } from '../../../types/coupon';
import serverNameState from '../../../globalState/atoms/serverName';
import Colors from '../../../constant/Colors';
import CouponApi from '../../../api/Coupon';

interface CouponSelectRadioProps {
  selected: CouponInfo | null;
  setSelected: (coupon: CouponInfo | null) => void;
}

const CouponSelectRadio = (props: CouponSelectRadioProps) => {
  const { selected, setSelected } = props;

  const serverName = useRecoilValue(serverNameState);
  const couponFetcher = useCallback(() => CouponApi.getUserList(serverName), [serverName]);
  const { getData } = usePromise<CouponInfo[]>(couponFetcher);

  const coupons = getData();

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
            checked={!selected}
            onClick={() => setSelected(null)}
            readOnly
          />
          <p>선택 안 함</p>
        </CouponLabel>
        {coupons?.map((coupon) => {
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
  border: 1px solid ${Colors.grey4};
  color: ${Colors.grey1};
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
  border-top: 3px solid ${Colors.grey4};
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
  color: ${Colors.grey2};
  font-size: 1rem;
`;

export default CouponSelectRadio;
