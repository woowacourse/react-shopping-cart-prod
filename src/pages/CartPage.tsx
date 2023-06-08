import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { styled } from 'styled-components';
import OrderSheet from '../components/cart/OrderSheet';
import SelectedProductList from '../components/cart/SelectedProductList';
import Spinner from '../components/Spinner';
import { CART_URL } from '../constants/url';
import useFetchData from '../hooks/useFetchData';
import { useGoToAnotherPage } from '../hooks/useGoToAnotherPage';
import { cartState, serverState } from '../recoil';
import { CartItem } from '../types';

const CartPage = () => {
  const [cart, setCart] = useRecoilState(cartState);
  const server = useRecoilValue(serverState);
  const { api, isLoading } = useFetchData();

  const goToPage = useGoToAnotherPage();

  useEffect(() => {
    api
      .get(`${server}${CART_URL}`)
      .then((data) => {
        setCart(data.map((item: CartItem) => ({ ...item, isSelected: true })));
      })
      .catch((error) => alert(error));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [server]);

  if (isLoading) return <Spinner />;

  return (
    <StyledMain>
      <Title>장바구니</Title>
      {cart.length > 0 ? (
        <Flex>
          <SelectedProductList />
          <OrderSheet />
        </Flex>
      ) : (
        <EmptyView>
          <Nothing src={`${process.env.PUBLIC_URL}/assets/nothing.png`} alt="장바구니가 텅 비었어요" />
          <Message>장바구니에 담긴 상품이 없습니다.</Message>
          <StyledButton onClick={() => goToPage('/')}>홈으로 가기</StyledButton>
        </EmptyView>
      )}
    </StyledMain>
  );
};

const StyledMain = styled.main`
  max-width: 1320px;
  margin: 0 auto;
  padding: 0 20px;

  @media (max-width: 1270px) {
    padding: 0 36px;
  }

  @media (max-width: 420px) {
    padding: 0 28px;
  }
`;

const Title = styled.h2`
  width: 100%;
  padding-bottom: 30px;
  border-bottom: 4px solid var(--text-color);
  font-size: 32px;
  font-weight: 700;
  text-align: center;
  color: var(--text-color);
`;

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 36px 30px 0 0;

  @media (max-width: 1270px) {
    flex-direction: column;
    margin-right: 0;

    & section {
      max-width: 100%;
    }

    & section:last-child {
      margin: 30px 0 80px;
    }
  }
`;

const EmptyView = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px 0;
`;

const Nothing = styled.img`
  display: block;
  width: 160px;
  height: 160px;
  margin: 0 auto;
`;

const Message = styled.h3`
  margin-top: 16px;
  font-size: 20px;
  font-weight: 500;
`;

const StyledButton = styled.button`
  margin-top: 24px;
  padding: 10px 16px;
  height: 40px;

  cursor: pointer;

  color: white;
  background-color: var(--text-color);

  font-size: 14px;
`;

export default CartPage;
