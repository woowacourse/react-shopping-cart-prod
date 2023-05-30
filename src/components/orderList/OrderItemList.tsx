import { styled } from 'styled-components';
import OrderDetailNavigator from './OrderDetailNavigator';
import OrderItem from './OrderItem';

const OrderItemList = () => {
  return (
    <S.List>
      <OrderDetailNavigator orderId={1} />
      <OrderItem
        id={1}
        name={'PET보틀-정사각(420ml)'}
        price={10000}
        imageUrl={
          'https://cdn-mart.baemin.com/sellergoods/main/2ddb9f04-c15d-4647-b6e7-30afb9e8d072.jpg?h=300&w=300'
        }
        quantity={3}
      />
    </S.List>
  );
};

const S = {
  List: styled.ul`
    flex: 1;
    margin-bottom: 50px;
    padding: 0 24px;
  `,
};

export default OrderItemList;
