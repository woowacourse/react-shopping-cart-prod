import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';
import { ROUTE_PATH } from '../constants';
import { useGoToAnotherPage } from '../hooks/useGoToAnotherPage';
import { cartBadgeSelector } from '../recoil';

const Cart = () => {
  const goToPage = useGoToAnotherPage();

  const selectedProducts = useRecoilValue(cartBadgeSelector);

  return (
    <S.Wrapper>
      <S.Button onClick={() => goToPage(ROUTE_PATH.CART_PAGE)}>장바구니</S.Button>
      <S.Badge role='status' aria-label='장바구니에 담긴 상품 종류의 수'>
        {selectedProducts.size}
      </S.Badge>
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    display: flex;
    align-items: center;
  `,

  Button: styled.button`
    padding: 0;
    margin-right: 8px;
    font-size: 18px;
    font-weight: 500;
    background: none;
    color: #fff;
    cursor: pointer;
  `,

  Badge: styled.span`
    width: 24px;
    height: 24px;
    background: var(--highlight-color);
    border-radius: 50%;
    font-size: 13px;
    font-weight: 400;
    text-align: center;
    line-height: 24px;
    color: #fff;
  `,
};

export default Cart;
