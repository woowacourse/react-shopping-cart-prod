import type { OrderType } from '../../types';

import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface Props extends OrderType {
  buttonHidden?: boolean;
}

export default function Order({ orderId, items, buttonHidden = false }: Props) {
  return (
    <Wrapper>
      <Header>
        <span>주문번호 : {orderId}</span>
        {!buttonHidden && <HeaderLink to={`/orders/${orderId}`}>{'상세보기 >'}</HeaderLink>}
      </Header>
      {items.map(({ product: { id, name, price, imageUrl }, quantity }) => (
        <OrderItem key={id}>
          <Box>
            <Image src={imageUrl} />
            <InfoBox>
              <Label>{name}</Label>
              <Price>
                {price.toLocaleString()}원 / 수량 : {quantity}개
              </Price>
            </InfoBox>
          </Box>
        </OrderItem>
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;

  & + & {
    margin-top: 64px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 92px;
  border: 1px solid #dddddd;
  padding: 28px;
  background: #f6f8fa;

  font-size: 20px;
  color: #333333;
`;

const HeaderLink = styled(Link)`
  background: transparent;

  font-size: 20px;
  color: #333333;
`;

const OrderItem = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
  height: 220px;
  border: 1px solid #dddddd;
  padding: 24px;

  & + & {
    border-top: none;
  }
`;

const Box = styled.div`
  display: flex;

  width: 100%;
  height: 142px;
`;

const Image = styled.img`
  width: 142px;
  height: 142px;
`;

const InfoBox = styled.div`
  height: 142px;
  margin-left: 32px;
`;

const Label = styled.p`
  margin-bottom: 32px;

  font-size: 20px;
`;

const Price = styled.p`
  font-size: 16px;
  color: #888888;
`;
