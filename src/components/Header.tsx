import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { CartLogo } from '../assets/svg';
import CartCountBadge from './cart/CartCountBadge';
import ServerSelectBox from './ServerSelectBox';

export default function Header() {
  const navigate = useNavigate();

  return (
    <Style.Container>
      <Style.Content>
        <Style.Title title="홈으로 이동" onClick={() => navigate('/')}>
          <CartLogo />
        </Style.Title>
        <Style.RightContainer>
          <ServerSelectBox />
          <Style.OrdersButton title="주문목록 페이지로 이동" onClick={() => navigate('/orders')}>
            주문목록
          </Style.OrdersButton>
          <Style.CartButton title="장바구니 페이지로 이동" onClick={() => navigate('/cart')}>
            <CartCountBadge />
          </Style.CartButton>
        </Style.RightContainer>
      </Style.Content>
    </Style.Container>
  );
}

const Style = {
  Container: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    min-width: 992px;
    height: 80px;

    position: fixed;
    top: 0;
    left: 0;
    background-color: var(--grey-500);

    color: var(--grey-100);

    z-index: 1000;

    /* 태블릿 */
    @media screen and (max-width: 991px) {
      min-width: 768px;
    }

    /* 모바일 */
    @media screen and (max-width: 767px) {
      min-width: 375px;
    }
  `,

  Content: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 932px;

    /* 태블릿 */
    @media screen and (max-width: 991px) {
      width: 708px;
    }

    /* 모바일 */
    @media screen and (max-width: 767px) {
      width: 315px;
    }
  `,

  RightContainer: styled.div`
    display: flex;
    justify-content: space-between;

    gap: 10px;

    /* 모바일 */
    @media screen and (max-width: 767px) {
      gap: 5px;
    }
  `,

  Title: styled.button`
    display: flex;
    align-items: center;

    font-size: 32px;
    font-weight: 900;

    &::after {
      content: 'SHOP';
      padding-left: 12px;
    }

    /* 모바일 */
    @media screen and (max-width: 767px) {
      font-size: 20px;
      font-weight: 900;
    }
  `,

  OrdersButton: styled.button`
    align-items: center;

    /* 모바일 */
    @media screen and (max-width: 767px) {
      font-size: 12px;
    }
  `,

  CartButton: styled.button`
    display: flex;
    align-items: center;

    font-weight: 500;

    &::before {
      content: '장바구니';
      padding-right: 6px;
    }

    /* 모바일 */
    @media screen and (max-width: 767px) {
      font-size: 12px;
    }
  `,
};
