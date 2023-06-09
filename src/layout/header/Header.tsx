import styled from 'styled-components';

import { useNavigate } from 'react-router-dom';
import { CartListLengthViewer } from './CartListLengthViewer';
import { useRecoilState } from 'recoil';
import { APIAtom } from '../../recoil/atoms/serverAtom';
import { Suspense } from 'react';
import { Style as CartAmountStyle } from './CartListLengthViewer';
import { ErrorBoundary } from 'react-error-boundary';

export const Header = () => {
  const navigate = useNavigate();
  const [apiEndPoint, setAPIEndPoints] = useRecoilState(APIAtom);

  const handleChangeSelectedServer: React.ChangeEventHandler<
    HTMLSelectElement
  > = (e) => {
    setAPIEndPoints(() => e.target.value);

    const currentUrl = window.location.href;
    window.location.replace(currentUrl);
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
          <ErrorBoundary fallback={<></>}>
            <Suspense fallback={<Style.CartAmount>0</Style.CartAmount>}>
              <CartListLengthViewer />
            </Suspense>
          </ErrorBoundary>
          <Style.Order onClick={() => navigate('/order')}>
            주문 목록
          </Style.Order>
        </Style.CartContainer>
      </Style.ContentWrapper>
    </Style.Container>
  );
};

const Style = {
  ...CartAmountStyle,
  Container: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    height: 80px;
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;

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

    cursor: pointer;

    @media screen and (max-width: 480px) {
      width: 100px;
      height: 23px;
    }
  `,
  CartContainer: styled.div`
    display: flex;
    gap: 5px;

    cursor: pointer;
  `,
  Cart: styled.h1`
    margin-top: 4px;
    padding: 0;

    font-size: 24px;
    font-weight: 300;

    @media screen and (max-width: 480px) {
      font-size: 15px;
    }

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
  Order: styled.h1`
    margin-top: 4px;
    margin-left: 15px;
    padding: 0;

    font-size: 24px;
    font-weight: 300;

    @media screen and (max-width: 480px) {
      font-size: 15px;
      margin-left: 0px;
    }
  `,
  ServerOption: styled.option``,
};
