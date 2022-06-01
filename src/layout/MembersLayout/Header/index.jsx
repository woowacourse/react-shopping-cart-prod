import { Link } from 'react-router-dom';

import useCart from 'hooks/useCart';

import { PAGE_LIST } from 'constants/';

import * as S from './styles';

function Header() {
  return (
    <S.Container>
      <S.Logo />
    </S.Container>
  );
}

export default Header;
