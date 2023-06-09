/* eslint-disable react-hooks/exhaustive-deps */
import { styled } from 'styled-components';
import { useGetCouponList } from '../../hooks/useGetCouponList';
import Coupon from './Coupon';

const CouponList = () => {
  const coupons = useGetCouponList();

  return (
    <S.Wrapper role='document' tabIndex={0}>
      <legend id='title-dialog'>쿠폰 선택</legend>
      <S.ListWrapper>
        {coupons.map((coupon) => (
          <S.CouponList key={coupon.id}>
            <Coupon id={coupon.id} priceDiscount={coupon.priceDiscount} name={coupon.name} />
          </S.CouponList>
        ))}
      </S.ListWrapper>
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.fieldset`
    font-size: 20px;
    font-weight: 700;
    text-align: center;
  `,

  ListWrapper: styled.ul`
    margin-top: 36px;
    padding: 0 10px;
    max-height: 240px;
    overflow-y: auto;
  `,

  CouponList: styled.li`
    margin: 12px 0;
    font-weight: 400;
    font-size: 16px;
    text-align: left;
    line-height: 2;

    &:first-child {
      margin-top: 0;
    }

    /* Selected Coupon */
    &:has(input:checked) > label {
      border: 1px solid var(--red-color);
    }
    &:has(input:checked) > label svg {
      fill: var(--red-color);
    }
    &:has(input:checked) > label .dotted-line {
      border: 1px dotted var(--red-color);
    }
    &:has(input:checked) > label .dotted-line div {
      border: 1.2px solid var(--red-color);
      border-top: 1px solid transparent;
      border-right: 1px solid transparent;

      &:last-child {
        border: 1px solid var(--red-color);
        border-bottom: 1px solid transparent;
        border-left: 1px solid transparent;
      }
    }
  `,
};

export default CouponList;
