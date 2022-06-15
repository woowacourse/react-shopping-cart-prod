import * as S from 'components/Header/Header.styled';
import PlainLink from 'components/PlainLink/PlainLink';
import RightMenu from 'components/RightMenu/RightMenu';

import ICONS from 'constants/icons';

function Header() {
  return (
    <S.HeaderBox>
      <PlainLink to="/">
        <S.LogoBox>
          {ICONS.LOGO}
          <h1>WOOWA SHOP</h1>
        </S.LogoBox>
      </PlainLink>
      <RightMenu />
    </S.HeaderBox>
  );
}

export default Header;
