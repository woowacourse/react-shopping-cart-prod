import styled, { createGlobalStyle } from 'styled-components';

import resetStyle from './resetStyle';

const GlobalStyle = createGlobalStyle<{ isModalOpen: boolean }>`
    ${resetStyle}

    button {
        border:none;
    }

    body {
      background-color: #FcFcFc;
      overflow: ${(props) => props.isModalOpen && 'hidden'};
    }
`;

export const CommonPageStyle = styled.div`
  width: 60%;
  min-width: 1080px;
  max-width: 1080px;
  margin: auto;
  padding-top: 100px;
  @media only screen and (max-width: 1200px) {
    // 테블릿
    min-width: 768px;
  }
  @media only screen and (max-width: 768px) {
    // 모바일
    min-width: 400px;
  }
`;

export default GlobalStyle;
