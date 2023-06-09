/* eslint-disable react-hooks/exhaustive-deps */
import { styled } from 'styled-components';
import Order from '../components/cart/Order';
import SelectedProductList from '../components/cart/SelectedProductList';
import Nothing from '../components/common/Nothing';
import Spinner from '../components/common/Spinner';
import Title from '../components/common/Title';
import MainLayout from '../components/PageMainLayout';
import { IMAGE_PATH } from '../constants';
import { useGetSelectedProductList } from '../hooks/useGetSelectedProductList';

const CartPage = () => {
  const { cart, checkedItemIdList, setCheckedItemIdList, isLoading } = useGetSelectedProductList();
  const productCountInCart = cart.length;

  if (isLoading) return <Spinner />;

  if (productCountInCart === 0)
    return <Nothing src={IMAGE_PATH.EMPTY_CART} alt='장바구니가 텅 비었어요' />;

  return (
    <>
      <MainLayout>
        <>
          <Title value='장바구니' />
          <S.Wrapper>
            <SelectedProductList
              productCountInCart={productCountInCart}
              cart={cart}
              checkedItemIdList={checkedItemIdList}
              setCheckedItemIdList={setCheckedItemIdList}
            />
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
