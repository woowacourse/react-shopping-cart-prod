import styled from '@emotion/styled';
import { Text } from '../Text/Text';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCartFetch } from '../../../hooks/useCartFetch';

const UserCartInfo = () => {
  const { cartData } = useCartFetch();

  const [cartTotalQuantity, setCartTotalQuantity] = useState(0);

  const [isShown, setIsShown] = useState(false);

  const ref = useRef(null);

  useEffect(() => {
    if (cartData) {
      setCartTotalQuantity(cartData.length);
    }
  }, [cartData]);

  useEffect(() => {
    if (cartTotalQuantity > 0 && !isShown) {
      setIsShown(true);
      return;
    }
    if (cartTotalQuantity === 0 && isShown) {
      setIsShown(false);
    }
  }, [cartTotalQuantity]);

  return (
    <CartCounterWrapper ref={ref} to="/cart">
      <Text color="#ffffff" size="large" lineHeight="12px">
        의 장바구니
      </Text>
      {isShown ? (
        <>
          <CartCounter>
            <Text size="smallest" color="#ffffff">
              {cartTotalQuantity && cartTotalQuantity > 99 ? 99 : cartTotalQuantity}
            </Text>
          </CartCounter>
        </>
      ) : (
        <Wrapper />
      )}
    </CartCounterWrapper>
  );
};

export default UserCartInfo;

const CartCounterWrapper = styled(Link)`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const CartCounter = styled.div`
  width: 26px;
  height: 26px;
  background-color: #04c09e;
  border-radius: 100px;
  margin-left: 6px;
  text-align: center;
`;

const Wrapper = styled.div`
  width: 26px;
  height: 26px;
  margin-left: 6px;
`;
