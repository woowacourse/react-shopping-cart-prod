// @ts-nocheck
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { TotalPrice, PaymentProductItem } from 'components';

import { getCookie } from 'utils/cookie';
import autoComma from 'utils/autoComma';
import Styled from './index.style';

const PaymentPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  const getOrder = async () => {
    const accessToken = getCookie('accessToken');

    const response = await axios.get(`/orders/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    setOrder({ ...response.data });
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
              actionType={`${autoComma(order.totalPrice)}원 결제하기`}
              action={() => {}}
            />
          </Styled.RightSide>
        </Styled.OrderSheet>
      )}
    </Styled.Container>
  );
};

export default PaymentPage;
