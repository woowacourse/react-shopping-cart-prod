import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body{    
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  
  body:has([role='dialog']){
    overflow: hidden;
  }

  * {
    font-family: 'Pretendard';
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  li, ul {
    list-style: none;
  }

  a {
    text-decoration: none;
  }

  :root{
    --header-height: 80px;
    --color-primary: #30e3dd;
    --color-primary-tone-down: #00a5ae;
    --color-pure-white: #ffffff; 
    --color-grayscale-100: #f2f2f2;
    --color-grayscale-200: #d9d9d9;
    --color-grayscale-300: #bfbfbf;
    --color-grayscale-400: #a6a6a6;
    --color-grayscale-500: #999999;
    --color-pure-dark: #000000; 
  }
`;

export default GlobalStyles;
