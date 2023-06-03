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

  
  /* Scroll bar */
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background: var(--text-color);
  }
  &::-webkit-scrollbar-track {
    border-radius: 8px;
    background: var(--gray-color-100);
  }
  &::-webkit-scrollbar-button:start:decrement,
  &::-webkit-scrollbar-button:end:increment {
    display: block;
    height: 6px;
    background: var(--white-color);
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
    --white-color: #fafafa;
    --gray-color-100: #ddd;
    --gray-color-200: #c7c7c7;
    --gray-color-300: #aaa;
    --gray-color-400: #767676;
    --text-color: #333;
    --highlight-color: #04c09e;
    --red-color: #e93535;
  }
`;
