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
    width: 100%;
    margin-top: 50px 0px;
  `,

  ItemWrapper: styled.div`
    display: flex;
    flex-direction: row;
    padding: 10px 0;
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
    width: 70px;
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
    width: 40%;

    @media all and (min-width: 768px) and (max-width: 1023px) {
      width: 60%;
    }

    @media all and (min-width: 480px) and (max-width: 767px) {
      width: 70%;
    }

    @media all and (max-width: 479px) {
      width: 80%;
    }
  `,

  PaymentWrapper: styled.section`
    width: 40%;
    border: 1px solid #aaa;
    border-radius: 7px;
    padding: 20px;
    margin-top: 50px 0px;
    display: flex;
    flex-direction: column;
    gap: 10px;

    @media all and (min-width: 768px) and (max-width: 1023px) {
      width: 60%;
    }

    @media all and (min-width: 480px) and (max-width: 767px) {
      width: 70%;
    }

    @media all and (max-width: 479px) {
      width: 80%;
    }

    & > :nth-child(n) {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
  `,
};
