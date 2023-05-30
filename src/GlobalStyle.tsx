import { createGlobalStyle } from 'styled-components';
import background from './assets/image/background.jpg';
import colors from './colors';

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: "Pretendard";
  }
  
  html {
    background-color: ${colors.gray500};
    background: url(${background});
    background-size: 1500px;
    background-attachment: fixed;
  }

  ul,
  li {
    list-style: none;
  }
  
  input:focus {
    outline: none;
  }
  
  ul,
  li,
  div,
  span,
  p {
    color: white;
  }

  a {
    text-decoration: none;
    outline: none;
    color: #fff;
  }

  a:hover, a:active, a:visited {
    text-decoration: none;
    color: #fff;
  }

  button {
    background: none;
    border: 0;
    cursor: pointer;
  }

  button:disabled {
    cursor: not-allowed;
  }
  
  ::selection {
    color: ${colors.pureBlack};
    background-color: ${colors.gray100};
  }
`;

export default GlobalStyle;
