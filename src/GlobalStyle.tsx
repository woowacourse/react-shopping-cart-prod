import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}
  
  * {
    box-sizing: border-box;

    margin: 0;
    padding: 0;
    border: none;

    font-family: 'Noto Sans KR', sans-serif;
  }
  
  ul,
  li {
    list-style: none;
  }
  
  html,
  body,
  #root {
    height: 100%;
    font-family: 'Noto Sans KR', sans-serif;
  }

  #root {
    position: relative;
  }

  button {
    cursor: pointer;
  }

  a {
    text-decoration: none;
    color: inherit;

    cursor: pointer;
  }
`;

export default GlobalStyle;
