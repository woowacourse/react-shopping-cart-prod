import { createGlobalStyle } from 'styled-components';
import '../src/css/reset.css';

export const GlobalStyle = createGlobalStyle`
  @import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap");

  * {
    box-sizing: border-box;
    font-family: "Noto Sans KR", sans-serif !important;
  }
  
  html,
  body {
    /* hidden scroll */
    scrollbar-width: none;
  }

  body::-webkit-scrollbar {
    /* hidden scroll */
    display: none;
  }

  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    width: 16px;
    height: 24px;
    margin: 0;
    padding: 2px 5px;
    opacity: 0;
    cursor: pointer;
  }

  :root {
    --black-color: #000;
    --gray-color: #AAAAAA;
    --gray-color-200: #c7c7c7;
    --gray-color-300: #f6f6f6;
    --text-color: #333;
    --mint-color: #04c092;
    --mint-color-002: #4ea685;
    --mint-color-003: #57b894;
    --white-color: #ffffff;
    --mint-color-hover: #439a97;
  }
`;
