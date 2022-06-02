import styled from 'styled-components';

const Styled = {
  Snackbar: styled.div<{ status: string }>`
    min-width: 250px;
    margin: 0;
    text-align: center;
    padding: 16px;
    position: fixed;
    z-index: 1;
    left: 50%;
    transform: translateX(-50%);
    bottom: 30px;
    font-size: 17px;
    border-radius: 5px;
    color: #fff;
    background-color: ${({ theme, status }) =>
      status === 'SUCCESS' ? theme.colors.green : theme.colors.red};

    -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
    animation: fadein 0.5s, fadeout 0.5s 2.5s;

    @-webkit-keyframes fadein {
      from {
        bottom: 0;
        opacity: 0;
      }
      to {
        bottom: 30px;
        opacity: 1;
      }
    }

    @keyframes fadein {
      from {
        bottom: 0;
        opacity: 0;
      }
      to {
        bottom: 30px;
        opacity: 1;
      }
    }

    @-webkit-keyframes fadeout {
      from {
        bottom: 30px;
        opacity: 1;
      }
      to {
        bottom: 0;
        opacity: 0;
      }
    }

    @keyframes fadeout {
      from {
        bottom: 30px;
        opacity: 1;
      }
      to {
        bottom: 0;
        opacity: 0;
      }
    }
  `,
};

export default Styled;
