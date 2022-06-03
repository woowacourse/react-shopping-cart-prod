import styled from 'styled-components';

const Styled = {
  Modal: styled.div`
    height: fit-content;
    width: fit-content;
    padding: 16px 24px;
    background-color: transparent;
    border-radius: 5px;
    position: fixed;
    left: 50%;
    top: 20%;
    transform: translateX(-50%);
    z-index: 100;
  `,

  Backdrop: styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 10;
    background-color: black;
    opacity: 0.4;
  `,

  CloseButton: styled.div`
    position: absolute;
    top: 40px;
    right: 55px;
  `,
};

export default Styled;
