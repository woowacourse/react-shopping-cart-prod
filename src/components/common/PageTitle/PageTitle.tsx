import { useLocation } from 'react-router-dom';
import { getPageTitle } from '../../../constants/routes';
import * as S from './PageTitle.styles';

const PageTitle = () => {
  const { pathname } = useLocation();

  return (
    <S.Root>
      <S.Name>{getPageTitle(pathname)}</S.Name>
    </S.Root>
  );
};

export default PageTitle;
