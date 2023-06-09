import { Outlet } from 'react-router-dom';
import * as S from './styles/RootPage.styles';
import Header from '../layouts/Header';

export default function RootPage() {
  return (
    <S.Wrapper>
      <Header />
      <S.Main>
        <Outlet />
      </S.Main>
    </S.Wrapper>
  );
}
