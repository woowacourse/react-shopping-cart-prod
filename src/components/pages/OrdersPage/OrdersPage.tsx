import { Link } from 'react-router-dom';
import { PageTitle } from '../../styled/PageTitle';
import * as styled from './OrdersPage.styled';

export const OrdersPage = () => {
  const orderId = 1;

  return (
    <>
      <PageTitle>주문 목록</PageTitle>
      <styled.OrdersList>
        <styled.OrderBox>
          <styled.OrderBoxHeader>
            <div>주문번호 : 1</div>
            <Link to={`/orders/${orderId}`}>상세보기{' >'}</Link>
          </styled.OrderBoxHeader>
          <styled.OrderItem>
            <styled.ProductImage />
            <styled.OrderInfo>
              <styled.ProductName>친환경 실링용기 - ECO 19153</styled.ProductName>
              <styled.TotalPriceWithQuantity>180,600원 / 수량 : 3개</styled.TotalPriceWithQuantity>
            </styled.OrderInfo>
          </styled.OrderItem>
          <styled.OrderItem>
            <styled.ProductImage />
            <styled.OrderInfo>
              <styled.ProductName>친환경 실링용기 - ECO 19153</styled.ProductName>
              <styled.TotalPriceWithQuantity>180,600원 / 수량 : 3개</styled.TotalPriceWithQuantity>
            </styled.OrderInfo>
          </styled.OrderItem>
          <styled.OrderItem>
            <styled.ProductImage />
            <styled.OrderInfo>
              <styled.ProductName>친환경 실링용기 - ECO 19153</styled.ProductName>
              <styled.TotalPriceWithQuantity>180,600원 / 수량 : 3개</styled.TotalPriceWithQuantity>
            </styled.OrderInfo>
          </styled.OrderItem>
        </styled.OrderBox>
      </styled.OrdersList>
    </>
  );
};
