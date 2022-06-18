import styled from 'styled-components';
import { flexCenter } from 'styles/mixin';

export const Styled = {
  CartList: styled.div`
    grid-area: cl;
    display: inline-block;
    width: 73.6rem;
    height: 72.4rem;
  `,

  ButtonSet: styled.div`
    display: flex;
    justify-content: space-between;

    margin-bottom: 2rem;
  `,

  DeleteSelectedButton: styled.button`
    ${flexCenter}
    width: 11.7rem;
    height: 5rem;
    border: solid silver 1px;
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 400;
    font-size: 1.6rem;
    line-height: 2.1rem;

    text-align: center;
  `,

  CheckBoxWrapper: styled.div`
    display: flex;
    font-size: 2rem;
    width: 13.5rem;

    justify-content: space-between;
  `,

  CartItemListHeader: styled.p`
    padding: 0.5rem 0rem;

    border-bottom: solid silver 0.4rem;
    font-size: 2rem;
  `,

  CartItemList: styled.div`
    width: 73.6rem;
    height: 70rem;
    overflow: auto;

    padding-right: 1rem;

    &::-webkit-scrollbar {
      width: 6px;
      background-color: inherit;
    }
    &::-webkit-scrollbar-thumb {
      background-color: inherit;
    }
    &::-webkit-scrollbar-track {
      background-color: inherit;
    }
  `,
};
