import { createGlobalStyle } from 'styled-components';
import Perpetua from '../assets/fonts/perpetua.ttf';

const GlobalStyle = createGlobalStyle`
  * {
    padding: 0;
    border: 0;
    box-sizing: border-box;
    color: #333333
  }

  :root {
    --main-bg-color: #0ABAB5;
    --grey-100:#dddddd
  }
  
  body {
    margin: 0;
    padding: 0;
  }
  
  ul,li {
  list-style: none;
  }

  button{
  all: unset;
  cursor: pointer;
  }

  a {
    text-decoration: none;
  }

  span{
    font-weight: 200;
  }

  @font-face {
      font-family: "Perpetua";
      src: url("${Perpetua}");
  }

  *{
    font-family: "Perpetua";
  }
`;

export default GlobalStyle;
