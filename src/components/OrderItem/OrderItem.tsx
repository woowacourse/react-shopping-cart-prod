import FlexBox from 'components/@common/FlexBox';
import SheetProductCard from 'components/SheetLeftSection/SheetProductCardList/SheetProductCard/SheetProductCard';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Order } from 'types/order';
import { CartProduct } from 'types/product';

type OrderItemProps = {
  order: Order;
  type: string;
};

const OrderItem = ({ order, type }: OrderItemProps) => {
  const { orderId, orderedAt, products } = order;
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate(`/order/${order.orderId}`);
  };

  return (
    <Item flexDirection="column" justify="space-between" align="center" type={type}>
      <ItemHeader flexDirection="row" justify="space-between" align="center">
        <HeaderInfo gap="4px" align="center">
          <OrderNumber>주문번호: {orderId}</OrderNumber>
          <OrderDate>({orderedAt})</OrderDate>
        </HeaderInfo>
        {type === 'list' && <Button onClick={handleOnClick}>상세보기</Button>}
      </ItemHeader>

      <ItemBody flexDirection="column">
        {products.map((product: CartProduct) => {
          return <SheetProductCard sheetProduct={product} />;
        })}
      </ItemBody>
    </Item>
  );
};

export default OrderItem;

const Item = styled(FlexBox)<{ type: string }>`
  width: 100%;
  margin-top: ${({ type }) => (type === 'detail' ? '60px' : '0')};
  margin-bottom: 20px;
  background-color: rgb(242, 242, 242);
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;

  :hover {
    box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.4);
  }
`;

const ItemHeader = styled(FlexBox)`
  min-height: 50px;
  width: 100%;
  padding: 0px 12px 0px;
  background-color: #e7e4e4;
  border-bottom: 1px solid #dddddd;
`;

const HeaderInfo = styled(FlexBox)``;

const OrderNumber = styled.div`
  font-size: 14px;
`;

const OrderDate = styled.div`
  font-size: 10px;
`;

const Button = styled.div`
  cursor: pointer;
`;

const ItemBody = styled(FlexBox)`
  width: 100%;
  padding: 12px;
`;
