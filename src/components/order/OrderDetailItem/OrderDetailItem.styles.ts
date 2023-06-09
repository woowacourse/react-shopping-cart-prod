import { styled } from 'styled-components';

export const S = {
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
    width: 40vw;
    border: 2px solid #aaa;
    padding: 20px;
    border-radius: 7px;
    gap: 10px;
    @media all and (max-width: 479px) {
      width: 80vw;
    }

    & > :nth-child(5) {
      margin-top: 10px;
      color: var(--mint-color);
      font-weight: 600;
    }
    & > :last-child {
      margin-top: 30px;
      border-top: 1px solid #aaa;
      font-weight: 600;
      padding: 10px 0 0 0;
    }
  `,
  InfoWrapper: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  `,
};
