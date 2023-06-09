import { styled } from 'styled-components';

export const S = {
  PaymentForm: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 70%;
    height: fit-content;
    padding: 20px 0;
    margin: 40px 0;
    border-radius: 7px;
    border: 2px solid #ddd;

    & > :nth-child(1) {
      display: flex;
      align-items: flex-start;
      padding: 0 20px 20px 20px;
      width: 100%;
      border-bottom: 3px solid #ddd;
    }

    p {
      display: inline-block;
      width: 50%;
      margin: 10px 0px;
    }

    p:nth-child(even) {
      text-align: right;
    }

    @media all and (max-width: 1023px) {
      width: 90%;
    }
  `,

  PriceLabel: styled.div`
    width: 100%;
    font-size: 20px;
    font-weight: 400;

    @media all and (max-width: 1023px) {
      font-size: 18px;
    }
  `,

  PriceInfo: styled.div`
    width: 90%;
    font-size: 18px;
    font-weight: 700;
    margin-top: 30px;

    @media all and (max-width: 1023px) {
      font-size: 16px;
    }

    & > :last-child {
      margin-top: 30px;
    }
  `,

  OrderButton: styled.button`
    width: calc(100% - 40px);
    height: 75px;
    font-size: 22px;
    font-weight: 700;
    margin-top: 45px;
    border-radius: 7px;
    color: #fff;
    background-color: ${(props) => (props.disabled ? '#aaa' : '#04c09e')};

    @media all and (max-width: 1023px) {
      height: 50px;
      font-size: 18px;
    }
  `,

  PriceSection: styled.section`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    list-style: none;
  `,
};
