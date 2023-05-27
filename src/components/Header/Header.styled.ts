import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

export const Container = styled.div`
  position: fixed;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0px 16px;

  width: 100vw;
  height: 80px;
  background-color: var(--grey-500);

  color: var(--grey-100);

  z-index: 100;
`;

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 1263px;
`;

export const Title = styled(Link)`
  display: flex;
  align-items: center;

  font-size: 32px;
  font-weight: 900;

  &::after {
    content: 'SHOP';
    padding-left: 12px;
  }
`;

export const RightWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const Selector = styled.select`
  height: 42px;
  width: 102px;

  font-size: 16px;
  margin-right: 30px;
`;

export const CartLink = styled(Link)`
  display: flex;
  align-items: center;

  font-weight: 500;

  &::before {
    content: '장바구니';
    padding-right: 6px;
  }
`;
