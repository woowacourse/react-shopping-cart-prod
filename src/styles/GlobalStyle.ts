import theme from './theme';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle<{ theme: typeof theme }>`
  ${reset}

  body {
    font-family: 'Gowun Dodum', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 16px;
    background: ${({ theme: { colors } }) => colors.sakuraPink};
  }

  button {
    border: none;
    cursor: pointer;
    padding: 0;
  }

  input, button {
    font-family: 'Gowun Dodum', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  input:disabled {
    background: ${({ theme: { colors } }) => colors.shadow};
  }
`;

export default GlobalStyle;
