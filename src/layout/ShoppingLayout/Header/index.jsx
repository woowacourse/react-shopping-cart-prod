import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { PopupContainer } from 'components/@common';

import BackendSelect from 'components/BackendSelect';
import ProfileMenu from 'components/ProfileMenu';

import { PAGE_LIST } from 'constants/';

import * as S from './styles';

function Header() {
  return (
    <S.Container>
      <S.LeftMenu>
        <PopupContainer
          width={380}
          padding={10}
          target={<S.MenuButton type="button">API 서버 선택</S.MenuButton>}
        >
          <BackendSelect />
        </PopupContainer>
      </S.LeftMenu>

      <Link to={PAGE_LIST.HOME}>
        <S.Logo />
      </Link>

      <S.RightMenu>
        <Link to={PAGE_LIST.CART_LIST}>
          <li className="cart">CART</li>
        </Link>

        <ProfileMenu />
      </S.RightMenu>
    </S.Container>
  );
}

export default Header;
