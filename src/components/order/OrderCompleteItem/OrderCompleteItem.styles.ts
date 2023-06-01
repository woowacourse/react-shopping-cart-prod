import { styled } from 'styled-components';

const Button = styled.button`
  padding: 10px;
  border-radius: 7px;
  font-size: 18px;
`;

export const S = {
  Title: styled.h1`
    font-size: 24px;
    font-weight: 700;
    color: var(--mint-color);
  `,

  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
    width: 80%;
    margin-top: 50px;
  `,

  OrderWrapper: styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    border: 1px solid black;
    border-radius: 7px;
    padding: 20px;

    & > :nth-child(n) {
      border-bottom: 1px solid black;
    }

    & > :last-child {
      border-bottom: none;
    }
  `,

  ItemWrapper: styled.div`
    display: flex;
    flex-direction: row;
  `,

  InfoWrapper: styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 5px;
    gap: 10px;

    & > :nth-child(2) {
      color: #aaa;
    }
  `,

  Image: styled.img`
    width: 60px;
    height: auto;
  `,

  HomeButton: styled(Button)`
    background-color: var(--mint-color);
    color: white;
  `,

  DetailButton: styled(Button)``,

  ButtonWrapper: styled.section`
    display: flex;
    justify-content: space-between;
    width: 100%;
  `,
};
