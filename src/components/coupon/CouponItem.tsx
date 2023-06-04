import { styled } from 'styled-components';
import { FixedCouponInfo, RateCouponInfo } from '../../types';
import Price from '../common/Price';

interface Props {
  totalProductsPrice: number;
  couponItemInfo: RateCouponInfo | FixedCouponInfo;
  handleCouponSelect: ({ couponId, discountPrice, minOrderPrice }: Record<string, number>) => void;
}

export default function CouponItem({
  totalProductsPrice,
  couponItemInfo,
  handleCouponSelect,
}: Props) {
  const { id, name, expiredDate, minOrderPrice } = couponItemInfo;

  const selectCoupon = () => {
    if ('discountPrice' in couponItemInfo) {
      handleCouponSelect({
        couponId: id,
        discountPrice: couponItemInfo.discountPrice,
        minOrderPrice: minOrderPrice,
      });
      return;
    }

    if ('discountRate' in couponItemInfo) {
      const discountPrice = totalProductsPrice * (couponItemInfo.discountRate / 100);

      handleCouponSelect({
        couponId: id,
        discountPrice: discountPrice,
        minOrderPrice: minOrderPrice,
      });
    }
  };

  return (
    <Style.Container onClick={selectCoupon} disabled={totalProductsPrice < minOrderPrice}>
      <Style.Title>
        {'discountPrice' in couponItemInfo && (
          <Price price={couponItemInfo.discountPrice} size="extra-large" />
        )}
        {'discountRate' in couponItemInfo && `${couponItemInfo.discountRate}%`}
      </Style.Title>
      <Style.Name>{name}</Style.Name>
      <Style.Detail className="min-order-price">
        <span>최소 주문금액:</span>
        <Price price={minOrderPrice} size="small" />
        <span>(배송비 제외)</span>
      </Style.Detail>
      <Style.Detail>
        <span>사용기한: </span>
        <span>~{expiredDate}</span>
      </Style.Detail>
      <Style.Image src={`${process.env.PUBLIC_URL}/assets/huchu.png`} alt="" />
    </Style.Container>
  );
}

const Style = {
  Container: styled.button`
    width: 300px;
    height: 150px;

    position: relative;
    padding: 10px;
    border-radius: 7px;
    background-color: var(--grey-100);
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    overflow: hidden;

    text-align: start;

    &:hover {
      transition: transform 0.3s ease;
      transform: scale(1.01);
    }

    &:disabled * {
      color: var(--grey-300);
    }

    &:disabled .min-order-price * {
      color: red;
    }
  `,

  Title: styled.div`
    font-size: 30px;
    color: #1c8fed;
    margin-bottom: 10px;
  `,

  Name: styled.p`
    max-width: 200px;
    margin-bottom: 10px;
    overflow: hidden;

    white-space: nowrap;
    text-overflow: ellipsis;
  `,

  Detail: styled.p`
    display: flex;
    gap: 3px;

    font-size: 10px;
    color: var(--grey-300);
  `,

  Image: styled.img`
    width: 155px;

    position: absolute;
    top: 30%;
    left: 63%;
  `,
};
