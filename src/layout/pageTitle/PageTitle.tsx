import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';

export const PageTitle = ({ children }: PropsWithChildren) => {
  return (
    <Style.Header>
      <Style.HeaderTitle>{children}</Style.HeaderTitle>
    </Style.Header>
  );
};

const Style = {
  Header: styled.div`
    width: 100%;
    height: 67px;

    display: flex;
    justify-content: center;

    border-bottom: 4px solid #333333;
    margin-bottom: 34px;
  `,
  HeaderTitle: styled.h1`
    padding: 0;
    margin: 0;

    font-size: 32px;

    @media (max-width: 480px) {
      font-size: 24px;
    }
  `,
};
