import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}
  
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    border:none
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
    font-size: 62.5%;
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
