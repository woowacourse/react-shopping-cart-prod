import { styled } from 'styled-components';

export const S = {
  Wrapper: styled.div`
    display: flex;
    flex-direction: row;
    position: relative;
    width: 100%;
    padding: 30px;

    img {
      width: 145px;
      height: auto;
    }

    & > :nth-child(3) {
      position: absolute;
      right: 40px;
    }

    & > :nth-child(4) {
      position: absolute;
      top: 70px;
      right: 40px;
    }

    @media (min-width: 480px) and (max-width: 767px) {
      flex-direction: column;

      & > :nth-child(2) {
        margin: 20px 0 0 0;
      }

      & > :nth-child(3) {
        position: absolute;
      }

      & > :nth-child(4) {
        position: absolute;
        bottom: 0;
        right: 40px;
      }
    }

    @media all and (max-width: 479px) {
      flex-direction: row;
      align-items: flex-start;

      img {
        width: 50px;
        height: auto;
      }
      & > :nth-child(3) {
        right: 20px;
      }

      & > :nth-child(4) {
        top: 80px;
        left: 20px;
      }

      & > :last-child {
        position: absolute;
        bottom: 20px;
        right: 20px;
      }
    }
  `,

  CheckBox: styled.input`
    width: 28px;
    min-width: 28px;
    height: 28px;
    min-height: 28px;
    margin-right: 15px;
  `,

  RemoveButton: styled.button`
    background-color: transparent;
  `,

  Name: styled.p`
    margin-left: 20px;
    font-size: 20px;
    @media all and (max-width: 479px) {
      font-size: 16px;
    }
  `,

  Price: styled.p`
    position: absolute;
    right: 40px;
    bottom: 30px;

    @media all and (max-width: 479px) {
      position: absolute;
      bottom: 12px;
      right: 120px;
    }
  `,
};
