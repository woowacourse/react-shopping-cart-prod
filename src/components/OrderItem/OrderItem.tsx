import FlexBox from 'components/@common/FlexBox';
import SheetProductCard from 'components/SheetLeftSection/SheetProductCardList/SheetProductCard/SheetProductCard';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Order } from 'types/order';

type OrderItemProps = {
  order: Order;
  type: string;
};

const OrderItem = ({ order, type }: OrderItemProps) => {
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate(`/order/${order.order_id}`);
  };
  console.log(typeof order);
  return (
    <Item
      flexDirection="column"
      justify="space-between"
      align="center"
      gap="8px"
      style={{ marginTop: type === 'detail' ? '60px' : '0' }}
    >
      <ItemHeader flexDirection="row" justify="space-between" align="center">
        <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
          <div> 주문번호 : {order.order_id}</div>
          <div style={{ fontSize: '10px' }}> ({order.ordered_at})</div>
        </div>
        {type === 'list' ? (
          <div onClick={handleOnClick} style={{ cursor: 'pointer' }}>
            상세보기
          </div>
        ) : (
          <></>
        )}
      </ItemHeader>
      <ItemBody flexDirection="column">
        {order.products.map((product: any) => {
          return <SheetProductCard sheetProduct={product} />;
        })}
      </ItemBody>
    </Item>
  );
};

export default OrderItem;

const Item = styled(FlexBox)`
  width: 100%;
  margin-bottom: 20px;
  /* border: 1px solid #dddddd; */
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

  /* padding: 12px; */
  border-bottom: 1px solid #dddddd;
`;

const ItemBody = styled(FlexBox)`
  width: 100%;
  padding: 12px;
`;
