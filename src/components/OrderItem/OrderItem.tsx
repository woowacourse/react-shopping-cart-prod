import * as styled from './OrderItem.styled';

export const OrderItem = () => {
  return (
    <styled.OrderItem>
      <styled.ProductImage />
      <styled.OrderInfo>
        <styled.ProductName>친환경 실링용기 - ECO 19153</styled.ProductName>
        <styled.TotalPriceWithQuantity>180,600원 / 수량 : 3개</styled.TotalPriceWithQuantity>
      </styled.OrderInfo>
    </styled.OrderItem>
  );
};
