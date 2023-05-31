import { styled } from 'styled-components';

export const S = {
  Wrapper: styled.section`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  `,

  PointLabel: styled.span`
    font-size: 18px;
    font-weight: 700;
  `,

  InputWrapper: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: 10px;
    width: 60%;
  `,

  Input: styled.input`
    width: 70%;
    text-align: end;
    border: solid #aaa;
    border-width: 0px 0px 1px 0px;
  `,

  PointButton: styled.button`
    width: 70px;
    height: 28px;
    border: 1px solid #aaa;
    border-radius: 7px;
    padding: 2px;
    font-weight: 400;
    font-size: 16px;
  `,
};
