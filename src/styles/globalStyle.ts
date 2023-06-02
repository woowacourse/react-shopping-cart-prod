import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: -apple-system,'Do Hyeon','Noto Sans KR', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    
  }

  main {
    padding-top: 80px;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
  }
  
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    border:none;
  }
  
  ul,
  li {
    list-style: none;
  }
  
  button {
    border: none;
    background-color: transparent;
    outline: none;
    cursor: pointer;
    transition: ${(props) => props.theme.transitions.default};


  }

  html,
  body {

    margin: 0 auto;
    font-size: 62.5%;

    min-width: 400px;
  }

  img {
    max-width: 100%;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  input {
    border: none;
    outline: none;
  }

  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
`;

export default GlobalStyle;
