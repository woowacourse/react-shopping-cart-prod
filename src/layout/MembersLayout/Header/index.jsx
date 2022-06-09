import { Link } from 'react-router-dom';

import { PAGE_LIST } from 'constants/';

import * as S from './styles';

function Header() {
  return (
    <S.Container>
      <Link to={PAGE_LIST.HOME}>
        <S.Logo />
      </Link>
    </S.Container>
  );
}

export default Header;
