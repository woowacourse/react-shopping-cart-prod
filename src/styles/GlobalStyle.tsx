import { createGlobalStyle } from 'styled-components';

import { skeleton } from './animations';
import theme from './theme';

const GlobalStyle = createGlobalStyle`
   * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  ul,
  ol,
  li {
    list-style: none;
  }

  html,
  body {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 16px;
    color: #0e0e0e;
  }

  #root {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: space-around;
  }

  main {
    position: relative;
    margin: 0 ${theme.spacer.spacing4};
    padding-top: 140px;
    padding-bottom: 72px;
    max-width: 1080px;
    min-height: 100vh;
  }

  a {
    text-decoration: none;
    cursor: pointer;
  }

  .hide-overflow {
    overflow: hidden;
  }

  .skeleton {
    background: linear-gradient(
      -90deg,
      ${theme.color.gray3},
      ${theme.color.gray2},
      ${theme.color.gray3},
      ${theme.color.gray2}
    );
    background-size: 400%;
    border-radius: ${theme.borderRadius.small};
    animation: ${skeleton} 5s infinite ease-out;
  }
`;

export default GlobalStyle;
