import { styled } from 'styled-components';

export const S = {
  Wrapper: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 30px 0;
    gap: 20px;

    section {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
  `,

  PointLabel: styled.span`
    display: flex;
    align-items: center;
    font-size: 18px;
    font-weight: 700;
  `,

  InputWrapper: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    width: 60%;
  `,

  Input: styled.input`
    width: 50%;
    text-align: end;
    padding: 0 5px;
    border: solid #aaa;
    border-width: 0px 0px 1px 0px;
  `,

  PointButton: styled.button`
    width: 70px;
    height: 28px;
    border: 1px solid #aaa;
    border-radius: 7px;
    padding: 2px;
    margin-left: 10px;
    font-weight: 400;
    font-size: 16px;
  `,

  CloseButton: styled.button`
    width: 18px;
    height: 18px;
    border: 0.5px solid #aaa;
    border-radius: 50%;
    margin-left: 10px;
    color: white;
    background-color: #ccc;
  `,
};
