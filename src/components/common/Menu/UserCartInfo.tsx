import styled from '@emotion/styled';
import { Text } from '../Text/Text';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCartFetch } from '../../../hooks/useCartFetch';

const UserCartInfo = () => {
  const { cartData } = useCartFetch();

  const [cartTotalQuantity, setCartTotalQuantity] = useState(0);

  useEffect(() => {
    if (cartData) {
      setCartTotalQuantity(cartData.length);
    }
  }, [cartData]);

  return (
    <UserCartInfoWrapper to="/cart">
      <Text color="#ffffff" size="small">
        장바구니
      </Text>
      <CartCounter>
        <Text size="smallest" color="#ffffff" lineHeight="20px">
          {cartTotalQuantity && cartTotalQuantity > 99 ? 99 : cartTotalQuantity}
        </Text>
      </CartCounter>
    </UserCartInfoWrapper>
  );
};

export default UserCartInfo;

const UserCartInfoWrapper = styled(Link)`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 6px 0 6px;
`;

const CartCounter = styled.div`
  width: 22px;
  height: 22px;
  background-color: #04c09e;
  border-radius: 100px;
  margin-left: 6px;
  text-align: center;
`;
