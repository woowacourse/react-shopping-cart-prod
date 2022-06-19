// @ts-nocheck
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useOrder from 'hooks/domain/useOrder';

import { TotalPrice, PaymentProductItem } from 'components';

import transformToLocalPriceFormat from 'utils/transformToLocalPriceFormat';
import Styled from './index.style';

const PaymentPage = () => {
  const { id } = useParams();
  const { getOrderAPI } = useOrder();
  const [order, setOrder] = useState(null);

  const getOrder = async () => {
    const response = await getOrderAPI(id);

    setOrder({ ...response });
  };

  useEffect(() => {
    getOrder();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Styled.Container>
      <Styled.Title>주문/결제</Styled.Title>
      <Styled.Division />

      {order && (
        <Styled.OrderSheet>
          <Styled.LeftSide>
            <Styled.ProductListTitle>
              주문 상품 ({order.orderDetails.length}건)
            </Styled.ProductListTitle>
            <Styled.ProductList>
              {order.orderDetails.map(({ image, name, quantity }) => (
                <PaymentProductItem key={name} image={image} name={name} quantity={quantity} />
              ))}
            </Styled.ProductList>
          </Styled.LeftSide>

          <Styled.RightSide>
            <TotalPrice
              title="결제금액"
              price={order.totalPrice}
              actionType={`${transformToLocalPriceFormat(order.totalPrice)}원 결제하기`}
              action={() => {}}
            />
          </Styled.RightSide>
        </Styled.OrderSheet>
      )}
    </Styled.Container>
  );
};

export default PaymentPage;
