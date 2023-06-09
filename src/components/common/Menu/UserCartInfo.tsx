import styled from '@emotion/styled';
import { Text } from '../Text/Text';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCartFetch } from '../../../hooks/useCartFetch';
import { URL } from '../../../abstract/constants';
import { useRecoilState } from 'recoil';
import { checkCartListState } from '../../../service/atom';

const UserCartInfo = () => {
  const { cartData } = useCartFetch();
  const [checkCartList, setCheckCartList] = useRecoilState(checkCartListState);
  const [cartTotalQuantity, setCartTotalQuantity] = useState(0);

  useEffect(() => {
    if (cartData) {
      setCartTotalQuantity(cartData.length);
    }
    if (cartData && checkCartList.length === 0) {
      setCheckCartList(cartData.map((cart) => cart.id));
    }
  }, [cartData]);

  return (
    <UserCartInfoWrapper to={URL.CART}>
      <Text color="#fff" size="small">
        장바구니
      </Text>
      <CartCounter>
        <Text size="smallest" color="#fff" lineHeight="20px">
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
