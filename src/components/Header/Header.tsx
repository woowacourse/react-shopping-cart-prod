import PlainLink from 'components/PlainLink/PlainLink';
import Logo from 'components/Logo/Logo';
import RightMenu from 'components/RightMenu/RightMenu';
import * as S from 'components/Header/Header.styled';

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
