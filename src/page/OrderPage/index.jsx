import { useSelector } from 'react-redux';

import Styled from 'page/CartPage/index.style';

const OrderPage = () => {
  const { orderList } = useSelector(state => state.cartReducer);

  return <Styled.Container>{JSON.stringify(orderList)}</Styled.Container>;
};

export default OrderPage;
