import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { styled } from 'styled-components';
import Order from '../components/cart/Order';
import SelectedProductList from '../components/cart/SelectedProductList';
import Nothing from '../components/common/Nothing';
import Spinner from '../components/common/Spinner';
import Title from '../components/common/Title';
import MainLayout from '../components/PageMainLayout';
import { IMAGE_PATH } from '../constants';
import { CART_URL } from '../constants/url';
import { useFetchData } from '../hooks/useFetchData';
import { cartState, serverState } from '../recoil';

const CartPage = () => {
  const [cart, setCart] = useRecoilState(cartState);
  const productCountInCart = cart.length;

  const server = useRecoilValue(serverState);
  const { api, isLoading } = useFetchData();

  useEffect(() => {
    api
      .get(`${server}${CART_URL}`, {
        Authorization: 'Basic YUBhLmNvbToxMjM0',
        'Content-Type': 'application/json',
      })
      .then((data) => {
        setCart(data);
      });
  }, [server]);

  if (isLoading) return <Spinner />;

  if (productCountInCart === 0)
    return <Nothing src={IMAGE_PATH.EMPTY_CART} alt='장바구니가 텅 비었어요' />;

  return (
    <>
      <MainLayout>
        <>
          <Title value='장바구니' />
          <S.Wrapper>
            <SelectedProductList productCountInCart={productCountInCart} />
            <Order />
          </S.Wrapper>
        </>
      </MainLayout>
    </>
  );
};

const S = {
  Wrapper: styled.div`
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
  `,
};

export default CartPage;
