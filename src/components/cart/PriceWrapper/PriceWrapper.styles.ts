import { styled } from 'styled-components';

export const S = {
  PriceWrapper: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 70%;
    height: 410px;
    margin-top: 40px;
    border: 1px solid #ddd;

    & > :nth-child(1) {
      display: flex;
      align-items: flex-start;
      padding: 20px;
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
  `,

  PriceInfo: styled.div`
    width: 90%;
    font-size: 18px;
    font-weight: 700;
    margin-top: 30px;

    & > :last-child {
      margin-top: 30px;
    }
  `,

  OrderButton: styled.button`
    width: calc(100% - 60px);
    height: 75px;
    font-size: 20px;
    font-weight: 400;
    margin-top: 45px;
    color: #fff;
    background-color: ${(props) => (props.disabled ? '#aaa' : '#04c09e')};
  `,

  PriceSection: styled.section`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    list-style: none;
  `,
};
