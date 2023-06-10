import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;

    font-family: Apple SD Gothic Neo, 맑은 고딕, Malgun Gothic,sans-serif;
  }

  ul,
  li {
    list-style: none;
  }
  
`;

export default GlobalStyle;
