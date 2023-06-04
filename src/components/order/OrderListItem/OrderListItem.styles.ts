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
  `,

  DetailButton: styled.button`
    font-size: 18px;
    background-color: transparent;
    color: white;
    font-weight: 600;
  `,

  Image: styled.img`
    width: 140px;
    height: auto;
    border-radius: 7px;
  `,

  ItemInfoWrapper: styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 30px;
    width: 100%;
    gap: 25px;
  `,

  Name: styled.label`
    font-size: 20px;
  `,

  Price: styled.label`
    font-size: 16px;
    color: #888;
  `,
};
