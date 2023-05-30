import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { styled } from 'styled-components';
import Order from '../components/cart/Order';
import SelectedProductList from '../components/cart/SelectedProductList';
import Spinner from '../components/common/Spinner';
import Title from '../components/common/Title';
import MainLayout from '../components/PageMainLayout';
import { ROUTE_PATH } from '../constants';
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [server]);

  if (isLoading) return <Spinner />;

  if (productCountInCart === 0)
    return (
      <>
        <S.Nothing
          src={`${process.env.PUBLIC_URL}/assets/nothing.png`}
          alt='장바구니가 텅 비었어요'
        />
        <S.Link to={ROUTE_PATH.MAIN_PAGE}>홈으로 가기</S.Link>
      </>
    );

  return (
    <>
      <MainLayout>
        <Title title='장바구니' />
        <S.Wrapper>
          <SelectedProductList productCountInCart={productCountInCart} />
          <Order />
        </S.Wrapper>
      </MainLayout>
    </>
  );
};

const S = {
  Nothing: styled.img`
    display: block;
    width: 24%;
    margin: 0 auto;

    @media (max-width: 768px) {
      width: 100%;
    }
  `,

  Link: styled(Link)`
    display: block;
    width: 20%;
    margin: 0 auto;
    padding: 20px 0;
    color: #fff;
    border-radius: 8px;
    text-align: center;
    text-decoration: none;
    background: var(--highlight-color);

    &:hover {
      transform: scale(1.01);
    }
  `,

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
