import styled from 'styled-components';
import { OrderGroup } from './OrderGroup';
import { orderListState } from '../../recoil/atoms/orderAtom';
import { useRecoilValue } from 'recoil';
import { APIAtom } from '../../recoil/atoms/serverAtom';

export const OrderContent = () => {
  const apiEndPoint = useRecoilValue(APIAtom);
  const orderList = useRecoilValue(orderListState(apiEndPoint));

  return (
    <>
      {orderList.length > 0 ? (
        <Style.ContentContainer>
          {orderList.map((order) => {
            const totalProductPrice = order.orderInfos.reduce(
              (acc, curr) => (acc += curr.price * curr.quantity),
              0
            );

            return (
              <OrderGroup
                key={order.orderId}
                orders={order.orderInfos}
                orderId={order.orderId}
                totalProductPrice={totalProductPrice}
                totalOrderLength={order.orderInfos.length}
              />
            );
          })}
        </Style.ContentContainer>
      ) : (
        <Style.EmptyCartContainer>
          <Style.EmptyCartImage
            src={
              'https://cdn-mart.baemin.com/front-end/assets/20230525153657/images/defaultEmptyImage.11f8bc33139d72b546eb54f5b89e2abf.png'
            }
          />
          주문 목록이 비어있습니다!
        </Style.EmptyCartContainer>
      )}
    </>
  );
};

export const Style = {
  ContentContainer: styled.div`
    width: 1320px;
    height: max-content;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 50px;

    padding-top: 28px;

    @media screen and (max-width: 480px) {
      width: 90vw;
    }
  `,
  EmptyCartContainer: styled.div`
    width: 1320px;
    min-height: 50vh;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    gap: 15px;

    font-size: 30px;

    @media screen and (max-width: 480px) {
      width: 90vw;

      font-size: 20px;
    }
  `,
  EmptyCartImage: styled.img`
    width: 200px;
    height: 200px;

    @media screen and (max-width: 480px) {
      width: 70vw;
      height: 70vw;
    }
  `,
};
