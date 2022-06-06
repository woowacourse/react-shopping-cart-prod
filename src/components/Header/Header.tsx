import * as S from 'components/Header/Header.styled';
import Logo from 'components/Logo/Logo';
import PlainLink from 'components/PlainLink/PlainLink';
import RightMenu from 'components/RightMenu/RightMenu';

function Header() {
  return (
    <S.HeaderBox>
      <PlainLink to="/">
        <Logo />
      </PlainLink>
      <RightMenu />
    </S.HeaderBox>
  );
}

export default Header;
