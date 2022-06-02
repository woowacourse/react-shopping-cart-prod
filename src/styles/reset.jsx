import emotionReset from "emotion-reset";
import { Global, css } from "@emotion/react";
import dohyeon from "@/assets/fonts/DOHYEON.woff";

function GlobalStyle() {
  return (
    <Global
      styles={css`
        ${emotionReset}

        @font-face {
          font-family: "dohyeon";
          src: url(${dohyeon}) format("truetype");
        }

        html,
        body {
          width: 100%;
          height: 100%;
          margin: 0;
          font-family: "dohyeon", sans-serif;
          font-weight: 300;
        }

        *,
        *::after,
        *::before {
          box-sizing: border-box;
          -moz-osx-font-smoothing: grayscale;
          -webkit-font-smoothing: antialiased;
          font-smoothing: antialiased;
        }

        #root {
          padding-bottom: 30px;
        }

        button {
          font-family: "dohyeon", sans-serif;
        }
      `}
    />
  );
}

export default GlobalStyle;
