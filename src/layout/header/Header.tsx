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

  const handleChangeSelectedServer: React.ChangeEventHandler<
    HTMLSelectElement
  > = (e) => {
    setAPIEndPoints(() => {
      const newApiEndPoint = e.target.value;

      getCartItems(newApiEndPoint).then((cartItems) => {
        setCartItems(cartItems);
      });

      return newApiEndPoint;
    });
  };

  return (
    <Style.Container>
      <Style.ContentWrapper>
        <Style.Logo
          onClick={() => navigate('/')}
          src={`${process.env.PUBLIC_URL}/logo.png`}
          alt="배민 문방구 로고 이미지"
        />
        <Style.LogoContainer>
          <Style.ServerSelectBox
            name="serverList"
            onChange={handleChangeSelectedServer}
            value={apiEndPoint}
          >
            <Style.ServerOption value="">MSW</Style.ServerOption>
            <Style.ServerOption value="https://woowacourse-sunshot.store">
              썬샷
            </Style.ServerOption>
            <Style.ServerOption value="https://woowacours-abel.store">
              아벨
            </Style.ServerOption>
            <Style.ServerOption value="https://woowacourse-teo.store">
              테오
            </Style.ServerOption>
          </Style.ServerSelectBox>
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

    /* background-color: #333333; */
    background-color: white;
    z-index: 999;
    border-bottom: 1px solid #d0d0d0;

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
  Logo: styled.img`
    width: 170px;
    height: 40px;

    @media screen and (max-width: 480px) {
      width: 100px;
      height: 25px;
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

    /* color: white; */
  `,
  ServerSelectBox: styled.select`
    width: 102px;
    height: 42px;
    border: 1px solid #d0d0d0;
    border-radius: 5px;

    @media screen and (max-width: 480px) {
      height: 30px;
    }
  `,
  ServerOption: styled.option``,
};
