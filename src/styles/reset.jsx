import emotionReset from "emotion-reset";
import { Global, css } from "@emotion/react";

function GlobalStyle() {
  return (
    <Global
      styles={css`
        ${emotionReset}

        html,
        body {
          width: 100%;
          height: 100%;
          margin: 0;
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
      `}
    />
  );
}

export default GlobalStyle;
