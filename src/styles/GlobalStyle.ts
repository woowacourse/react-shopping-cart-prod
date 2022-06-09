import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

import theme from './theme';

const GlobalStyle = createGlobalStyle<{ theme: typeof theme }>`
  ${reset}

  body {
    background: ${({ theme: { colors } }) => colors.sakuraPink};

    font-family: 'Gowun Dodum', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 16px;
  }

  input {
    font-family: 'Gowun Dodum', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    :disabled {
      background: ${({ theme: { colors } }) => colors.shadow};
    }
  }

  button {
    border: none;

    padding: 0;

    font-family: 'Gowun Dodum', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    cursor: pointer;
  }
`;

export default GlobalStyle;
