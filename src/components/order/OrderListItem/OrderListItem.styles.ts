import { styled } from 'styled-components';

export const S = {
  ItemsWrapper: styled.li`
    width: 100%;
    height: fit-content;
    border-bottom: 1px solid #aaa;
    border-radius: 7px;
    :last-child {
      border-bottom: none;
    }
  `,

  ItemWrapper: styled.div`
    display: flex;
    flex-direction: row;
    padding: 20px 20px;
    border-bottom: 1px solid #aaa;
    width: 100%;
  `,

  OrderInfoWrapper: styled.section`
    display: flex;
    justify-content: space-between;
    padding: 20px 20px;
    background-color: var(--mint-color);
    border-bottom: 1px solid #aaa;
    border-radius: 7px 7px 0 0;
    width: 100%;
  `,

  OrderNumber: styled.span`
    font-size: 18px;
    color: white;
    font-weight: 600;
    @media all and (max-width: 479px) {
      font-size: 16px;
    }
  `,

  DetailButton: styled.button`
    font-size: 18px;
    background-color: transparent;
    color: white;
    font-weight: 600;
    @media all and (max-width: 479px) {
      font-size: 16px;
    }
  `,

  Image: styled.img`
    width: 140px;
    height: auto;
    border-radius: 7px;
    @media all and (max-width: 479px) {
      width: 80px;
      height: 80px;
    }
  `,

  ItemInfoWrapper: styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 30px;
    width: 100%;
    gap: 25px;
    @media all and (max-width: 479px) {
      margin-left: 15px;
    }
  `,

  Name: styled.label`
    font-size: 20px;
    @media all and (max-width: 479px) {
      font-size: 14px;
    }
  `,

  Price: styled.label`
    font-size: 16px;
    color: #888;
    @media all and (max-width: 479px) {
      font-size: 14px;
    }
  `,
};
