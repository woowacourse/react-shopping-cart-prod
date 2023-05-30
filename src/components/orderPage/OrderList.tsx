import React from 'react';
import { useRecoilValue } from 'recoil';
import { orderListSelector } from '../../recoil/selectors/orderSelector';
import styled from 'styled-components';

export const OrderList = () => {
  const orderList = useRecoilValue(orderListSelector);

  return orderList.length > 0 ? (
    <div>dd</div>
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
  Header: styled.div`
    width: 100%;
    height: 67px;

    display: flex;
    justify-content: center;

    border-bottom: 4px solid #333333;
    margin-bottom: 34px;
  `,
  HeaderTitle: styled.h1`
    padding: 0;
    margin: 0;

    font-size: 32px;
  `,

  EmptyCartContainer: styled.div`
    max-width: 1080px;
    min-height: 50vh;

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
