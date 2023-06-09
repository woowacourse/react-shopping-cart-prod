import { Suspense } from 'react';
import { ROUTER_PATH } from '@router/router';
import { useServer } from '@hooks/recoil/server/useServer';
import { useUser } from '@hooks/recoil/user/useUser';
import CartStepperWithIcon from '@components/cart/CartStepperWithIcon';
import SelectBox from '@components/common/SelectBox';
import Logo from '@components/layout/Logo';
import { SERVER_NAME } from '@constants/serverUrlConstants';
import { USER_INFORMATION } from '@constants/userConstant';
import { Container } from '@styles/style';
import * as S from './Header.style';

function Header() {
  const { userInfo, onUserChange } = useUser();
  const { server, onServerChange } = useServer();

  return (
    <S.Navbar>
      <Container>
        <S.HeaderWrapper>
          <Logo />
          <SelectBox
            options={SERVER_NAME.map((name) => ({ value: name, name }))}
            onChange={onServerChange}
            value={server}
          />
          <Suspense>
            <SelectBox
              options={USER_INFORMATION.map((user) => ({
                value: user.nickname,
                name: user.nickname,
              }))}
              onChange={onUserChange}
              value={userInfo.nickname}
            ></SelectBox>
            <S.HeaderLink to={ROUTER_PATH.ORDERS}>주문 내역</S.HeaderLink>
            <CartStepperWithIcon />
          </Suspense>
        </S.HeaderWrapper>
      </Container>
    </S.Navbar>
  );
}

export default Header;
