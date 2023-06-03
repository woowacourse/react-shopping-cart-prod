import { ChangeEvent } from 'react';
import { BsChevronRight } from 'react-icons/bs';
import { useSetRecoilState } from 'recoil';
import { styled } from 'styled-components';
import { couponState } from '../../recoil';

interface Props {
  priceDiscount: number;
  couponName: string;
}

const Coupon = ({ priceDiscount, couponName }: Props) => {
  const setCoupon = useSetRecoilState(couponState);

  const handleCouponSelect = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setCoupon(() => {
      return { priceDiscount, name: value };
    });
  };

  return (
    <>
      <S.Wrapper htmlFor={couponName}>
        <S.Coupon>
          <p>{priceDiscount}</p>
          <S.Circle aria-hidden='true' />
          <S.Circle aria-hidden='true' />
        </S.Coupon>
        <S.CouponName>{couponName}</S.CouponName>
        <S.dottedLine aria-hidden='true' className='dotted-line'>
          <S.SmallCircle />
          <S.SmallCircle />
        </S.dottedLine>
        <BsChevronRight aria-hidden='true' />
      </S.Wrapper>
      <input
        type='radio'
        id={couponName}
        name='쿠폰'
        value={couponName}
        onChange={handleCouponSelect}
      />
    </>
  );
};

const S = {
  Wrapper: styled.label`
    display: flex;
    border: 1px solid #888;
    border-radius: 4px;
    box-shadow: 3px 4px 5px #e0e0e0;
    cursor: pointer;

    & > svg {
      position: absolute;
      right: 48px;
      align-self: center;
      fill: #767676;
    }

    & + input {
      display: none;
    }
  `,

  Coupon: styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    width: 56px;
    height: 36px;
    margin: 15px 14px;
    font-size: 12px;
    text-align: center;
    letter-spacing: 1px;
    color: #fff;
    background: var(--highlight-color);

    & > p {
      align-self: center;
      margin: 0;
      padding: 7px 14px;
      line-height: 120%;
      border: 1px dotted #fff;
    }
  `,

  Circle: styled.div`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 10px;
    height: 13px;
    background: var(--white-color);

    &:nth-last-child(2) {
      border-radius: 0 50% 50% 0;
      left: -6px;
    }

    &:last-child {
      border-radius: 50% 0 0 50%;
      right: -6px;
    }
  `,

  CouponName: styled.p`
    flex: 0.8;
    align-self: center;
    font-size: 14.5px;
    font-weight: 500;
  `,

  dottedLine: styled.div`
    position: relative;
    right: 0;
    height: 66.33px;
    border: 1px dotted var(--gray-color-200);
    border-top: 0;
  `,

  SmallCircle: styled.div`
    position: absolute;
    right: -2.5px;
    width: 5px;
    height: 5px;
    background: var(--white-color);
    border-radius: 50%;
    transform: rotate(-46.5deg);

    &:nth-last-child(2) {
      top: -3px;
      border: 1px solid var(--gray-color-400);
      border-top: 1px solid var(--white-color);
      border-right: 1px solid var(--white-color);
    }

    &:last-child {
      bottom: -3px;
      border: 1px solid var(--gray-color-400);
      background: #e6e6e6;
      border-bottom: 1px solid transparent;
      border-left: 1px solid transparent;
      border-radius: 50%;
      transform: rotate(-46.5deg);
    }
  `,
};

export default Coupon;
