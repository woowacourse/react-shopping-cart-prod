import { useRecoilState } from 'recoil';
import { orderListState } from '../../recoil/selectors/orderSelector';
import styled from 'styled-components';
import { OrderItemList } from './OrderItemList';
import { useEffect } from 'react';
import { useOrderFetch } from '../../hooks/fetch/useOrderFetch';

export const OrderItemSection = () => {
  const [orderList, setOrderListState] = useRecoilState(orderListState);

  const { getOrder } = useOrderFetch();

  useEffect(() => {
    getOrder().then((orderList) => setOrderListState(orderList));
  }, []);

  return orderList.length > 0 ? (
    <Style.Container>
      {orderList.map((orderItem, index) => {
        return (
          <OrderItemList
            key={orderItem.orderId + index}
            orderId={orderItem.orderId}
            orderInfos={orderItem.orderInfos}
          />
        );
      })}
    </Style.Container>
  ) : (
    <Style.EmptyCartContainer>
      <Style.EmptyCartImage
        src={`${process.env.PUBLIC_URL}/assets/empty_cart_image.jpg`}
      />
      <p>주문 내역이 없습니다.</p>
    </Style.EmptyCartContainer>
  );
};
const Style = {
  Container: styled.div`
    width: 100%;
    height: max-content;

    display: flex;
    flex-direction: column;
  `,

  EmptyCartContainer: styled.div`
    max-width: 1080px;
    min-height: 60vh;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & > p {
      font-size: 24px;
      margin-top: 60px;
    }
  `,

  EmptyCartImage: styled.img`
    width: 300px;
    height: 300px;
  `,
};
