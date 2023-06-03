import { styled } from 'styled-components';
import { OrderDetailItemInfo } from '../../types';
import OrderItem from './OrderItem';
import PaymentDetail from './PaymentDetail';

interface Props {
  orderDetail: OrderDetailItemInfo;
}

export default function OrderDetailItem({ orderDetail }: Props) {
  const { deliveryFee, usingCouponName, discountPrice, beforeDiscountPrice, ...orderItemInfo } =
    orderDetail;

  return (
    <>
      <Style.ItemWrapper>
        <OrderItem orderItemInfo={orderItemInfo} isDetail={true} />
      </Style.ItemWrapper>
      <Style.ItemWrapper>
        <PaymentDetail
          totalProductsPrice={beforeDiscountPrice - deliveryFee}
          deliveryFee={deliveryFee}
          discountPrice={discountPrice}
          totalOrderPrice={orderItemInfo.totalOrderPrice}
        />
      </Style.ItemWrapper>
    </>
  );
}

const Style = {
  ItemWrapper: styled.div`
    width: 932px;

    border: 1px solid var(--grey-300);
    border-bottom: 1px ridge;
    margin-bottom: 30px;

    /* 태블릿 */
    @media screen and (max-width: 991px) {
      width: 708px;
    }

    /* 모바일 */
    @media screen and (max-width: 767px) {
      width: 315px;
    }
  `,
};
