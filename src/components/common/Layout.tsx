import { PropsWithChildren } from 'react';
import { styled } from 'styled-components';
import { Header } from './Header';

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <Style.Main>{children}</Style.Main>
    </>
  );
};

const Style = {
  Main: styled.main`
    display: flex;
    flex-direction: column;

    align-items: center;

    position: relative;

    top: 140px;
  `,
};
