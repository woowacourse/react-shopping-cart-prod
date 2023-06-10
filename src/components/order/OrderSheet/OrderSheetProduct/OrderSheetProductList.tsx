import styled from 'styled-components';
import { CartProduct } from '../../../../types/product';
import OrderSheetItem from './OrderSheetProductItem';

interface OrderSheetItemListProps {
  checkedCartList: CartProduct[];
}

const OrderSheetItemList = ({ checkedCartList }: OrderSheetItemListProps) => {
  return (
    <ul>
      {checkedCartList.map((cartItem) => (
        <OrderLi key={cartItem.id}>
          <OrderSheetItem {...cartItem} />
        </OrderLi>
      ))}
    </ul>
  );
};

const OrderLi = styled.li`
  &:not(:first-child) {
    padding-top: 10px;
  }
  &:not(:last-child) {
    padding-bottom: 10px;
    border-bottom: 1px solid lightgray;
  }
`;

export default OrderSheetItemList;
