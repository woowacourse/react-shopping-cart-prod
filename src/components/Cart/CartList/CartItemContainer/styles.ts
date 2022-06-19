import { ReactComponent as TrashCanIcon } from 'assets/trashCanIcon.svg';
import styled from 'styled-components';

export const Styled = {
  CartItemContainer: styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;

    border-bottom: solid silver 0.15rem;
    padding: 2rem 0;
  `,

  ItemName: styled.div`
    width: 26rem;
    padding: 0rem 2rem;
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 400;
    font-size: 2rem;
  `,

  Operator: styled.div`
    display: flex;
    flex-direction: column;

    gap: 2rem;
    align-items: flex-end;
    width: 20rem;
  `,

  TrashCan: styled(TrashCanIcon)`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  `,

  TotalPrice: styled.p`
    font-size: 1.6rem;
  `,
};
