import { createGlobalStyle } from 'styled-components';

import reset from './reset';
import typography from './typography';

const GlobalStyle = createGlobalStyle`
  ${reset}
  ${typography}

  #root {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

export default GlobalStyle;
