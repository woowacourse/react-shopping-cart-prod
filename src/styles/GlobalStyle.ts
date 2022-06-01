import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    * {  
      margin: 0;
      box-sizing: border-box;
    }

    body {
      overflow: overlay;
    }
`;

export default GlobalStyle;
