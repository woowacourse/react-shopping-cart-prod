import { createGlobalStyle } from "styled-components";

const Palette = createGlobalStyle`
  :root {
    --primary-blue-color:#789395;
    --primary-green-color:#94B49F;
    --primary-mint-color:#B4CFB0;
    --primary-beige-color:#E5E3C9;
    
    --dark-color:#333333;
    --light-color: #ffffff;
    --gray-color:##d0d5dd;

    --transparency-color:rgba(0,0,0,0);

    --skeleton-color:rgba(0,0,0,0.1);
    --skeleton-name-color:rgba(0,0,0,0.07);
    --skeleton-price-color:rgba(0,0,0,0.04);

    --modal-background-color:rgba(0,0,0,0.3);
    --image-hover-color:rgba(0,0,0,0.25);
  }
`;

export default Palette;
