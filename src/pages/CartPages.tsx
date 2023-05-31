import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import Header from '../components/common/Header/Header';
import CartList from '../components/cart/CartList/CartList';
import PaymentAmount from '../components/cart/PaymentAmount/PaymentAmount';
import CheckedCartListProvider from '../provider/CheckedListProvider';
import useCartService from '../hooks/useCartService';
import cartLoadingState from '../globalState/atoms/cartLoadingState';
import serverNameState from '../globalState/atoms/serverName';
import LoadingSpinner from '../components/common/LoadingSpinner/LoadingSpinner';
import cartState from '../globalState/atoms/cartState';

const CartPage = () => {
  const navigate = useNavigate();
  const { fetchCartItem } = useCartService();
  const cartList = useRecoilValue(cartState);
  const isCartLoading = useRecoilValue(cartLoadingState);
  const serverName = useRecoilValue(serverNameState);

  const handleLinkButtonClick = () => {
    navigate('/');
  };

  useEffect(() => {
    fetchCartItem();
  }, [serverName]);

  return (
    <CheckedCartListProvider>
      <Header />
      <Layout>
        <Title>장바구니</Title>
        {isCartLoading || !cartList.length ? (
          <EmptyCartView>
            {isCartLoading ? (
              <LoadingSpinner color="#06c09e" />
            ) : (
              <>
                장바구니에 상품이 존재하지 않습니다.
                <LinkButton onClick={handleLinkButtonClick}>상품 담으러 가기</LinkButton>
              </>
            )}
          </EmptyCartView>
        ) : (
          <Contents>
            <>
              <CartList />
              <PaymentAmount />
            </>
          </Contents>
        )}
      </Layout>
    </CheckedCartListProvider>
  );
};

const Layout = styled.main`
  width: 1320px;

  margin: 0 auto;
  padding: 80px 0;

  @media screen and (max-width: 1320px) {
    width: 90%;
  }
`;

const Title = styled.h2`
  font-weight: 700;
  font-size: 32px;

  padding: 30px 0;
  border-bottom: 4px solid #333333;

  text-align: center;
`;

const Contents = styled.div`
  display: flex;
  justify-content: space-between;

  margin-top: 34px;

  @media screen and (max-width: 1320px) {
    flex-direction: column;
    justify-content: baseline;
    gap: 100px;
  }
`;

const EmptyCartView = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  margin-top: 200px;

  font-weight: 500;
  font-size: 30px;
`;

const LinkButton = styled.button`
  width: 300px;
  padding: 20px 50px;
  background-color: #333;

  border: none;
  border-radius: 15px;

  font-size: 20px;
  color: white;

  cursor: pointer;
`;

export default CartPage;
