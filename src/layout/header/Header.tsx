import styled from 'styled-components';

import { LogoIcon } from '../../assets/ShoppingCartIcon';
import { useNavigate } from 'react-router-dom';
import { CartListLengthViewer } from './CartListLengthViewer';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { APIAtom } from '../../recoil/atoms/serverAtom';
import { useCartFetch } from '../../hooks/fetch/useCartFetch';
import { cartItemsState } from '../../recoil/atoms/cartAtom';

export const Header = () => {
  const navigate = useNavigate();
  const [apiEndPoint, setAPIEndPoints] = useRecoilState(APIAtom);
  const { getCartItems } = useCartFetch();
  const setCartItems = useSetRecoilState(cartItemsState);

  return (
    <Style.Container>
      <Style.ContentWrapper>
        <Style.LogoContainer onClick={() => navigate('/')}>
          <LogoIcon />
          <Style.Logo>배민문방구</Style.Logo>
        </Style.LogoContainer>
        <Style.LogoContainer>
          서버 선택:
          <select
            name="serverList"
            onChange={(e) => {
              setAPIEndPoints(() => {
                const newApiEndPoint = e.target.value;

                getCartItems(newApiEndPoint).then((cartItems) => {
                  setCartItems(cartItems);
                });

                return newApiEndPoint;
              });
            }}
            value={apiEndPoint}
          >
            <option value="">MSW</option>
            <option value="https://woowacourse-sunshot.store">썬샷</option>
            <option value="https://woowacours-abel.store">아벨</option>
            <option value="https://woowacourse-teo.store">테오</option>
          </select>
        </Style.LogoContainer>
        <Style.CartContainer>
          <Style.Cart onClick={() => navigate('/cart')}>장바구니</Style.Cart>
          <CartListLengthViewer />
        </Style.CartContainer>
      </Style.ContentWrapper>
    </Style.Container>
  );
};

const Style = {
  Container: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    height: 80px;
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;

    background-color: #333333;

    @media screen and (max-width: 480px) {
      max-width: 100%;
    }
  `,
  ContentWrapper: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 1320px;

    @media screen and (max-width: 480px) {
      padding: 0 10px;

      max-width: 480px;
    }
  `,
  LogoContainer: styled.div`
    display: flex;
    align-items: center;

    gap: 15px;

    cursor: pointer;
  `,
  Logo: styled.h1`
    margin-top: 5px;
    padding: 0;

    font-size: 40px;
    font-weight: 300;

    color: white;

    @media screen and (max-width: 480px) {
      font-size: 24px;
    }
  `,
  CartContainer: styled.div`
    display: flex;
    gap: 10px;

    cursor: pointer;
  `,
  Cart: styled.h1`
    margin-top: 4px;
    padding: 0;

    font-size: 24px;
    font-weight: 300;

    color: white;
  `,
};
