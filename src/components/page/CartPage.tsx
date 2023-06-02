import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import SubPageTemplate from '../common/SubPageTemplate';
import CartItemList from '../cart/CartItemList';
import CartBill from '../cart/CartBill';

import {
  cartCountState,
  cartState,
  checkedListState,
  serverNameState,
  tokenState,
} from '../../recoil/state';
import * as api from '../../api';
import useToast from '../../hooks/useToast';
import { API_ERROR_MESSAGE } from '../../constants';

export default function CartPage() {
  const serverName = useRecoilValue(serverNameState);
  const token = useRecoilValue(tokenState);
  const cartCount = useRecoilValue(cartCountState);
  const setCart = useSetRecoilState(cartState);
  const setCheckedList = useSetRecoilState(checkedListState);

  const { showToast } = useToast();

  useEffect(() => {
    if (token === null) return;

    try {
      api.getCart(serverName, token).then((cart) => {
        setCart(cart);
        setCheckedList(Array(cart.length).fill(true));
      });
    } catch {
      showToast('error', API_ERROR_MESSAGE.getCart);
    }
  }, [serverName, token]);

  return (
    <SubPageTemplate title="장바구니">
      {cartCount !== 0 ? (
        <Main>
          <CartItemList />
          <CartBillBox>
            <CartBill />
          </CartBillBox>
        </Main>
      ) : (
        <EmptyCartMain>
          <Image src="/shoppingBag.svg" />
          <Message>장바구니에 상품이 없습니다.</Message>
          <Message>상품을 추가해보세요.</Message>
          <StyledLink to="/">상품 담으러 가기</StyledLink>
        </EmptyCartMain>
      )}
    </SubPageTemplate>
  );
}

const Main = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;

  @media (max-width: 1480px) {
    flex-direction: column;
    align-items: center;
  }
`;

const CartBillBox = styled.div`
  display: flex;
  justify-content: center;

  @media (max-width: 448px) {
    width: 100%;
  }
`;

const EmptyCartMain = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  margin-top: 64px;
  margin-bottom: 36px;
`;

const Message = styled.p`
  font-size: 18px;
  color: rgba(0, 0, 0, 0.4);

  margin-top: 16px;
`;

const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 224px;
  height: 52px;
  margin: 64px 0;
  border-radius: 8px;

  background: #04c09e;

  font-size: 20px;
  font-weight: 600;
  color: #ffffff;

  transition: transform 0.4s;

  &:hover {
    transform: translate(0, 6px);
  }
`;
