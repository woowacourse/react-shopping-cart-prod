import { createGlobalStyle } from 'styled-components';
import theme from './theme';

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Open Sans', 'Helvetica Neue', sans-serif;
    color: ${theme.color.BLACK}
  }

  body:has([role="dialog"]) {
    overflow: hidden;
  }

  ul,
  li {
    list-style: none;
  }

  a {
    text-decoration: none;
    outline: none;
    color: ${theme.color.BLACK};
  }

  a:hover, a:active, a:visited {
    text-decoration: none;
  }

  input:disabled {
    background: none;
    cursor: not-allowed;
  }

  button {
    background: none;
    border: 0;
    cursor: pointer;
  }

  button:disabled {
    cursor: not-allowed;
  }
`;

export default GlobalStyle;
