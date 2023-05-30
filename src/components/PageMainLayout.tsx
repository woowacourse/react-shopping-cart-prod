import { ReactNode } from 'react';
import { styled } from 'styled-components';

interface Props {
  children: ReactNode;
}

const MainLayout = ({ children }: Props) => {
  return <S.Main>{children}</S.Main>;
};

const S = {
  Main: styled.main`
    max-width: 1320px;
    margin: 0 auto;
    padding: 0 20px;

    @media (max-width: 1270px) {
      padding: 0 36px;
    }

    @media (max-width: 420px) {
      padding: 0 28px;
    }
  `,
};

export default MainLayout;
