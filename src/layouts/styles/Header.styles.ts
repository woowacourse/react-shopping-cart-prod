import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Wrapper = styled.header`
  position: fixed;
  top: 0;

  display: flex;
  justify-content: center;

  width: 100%;
  height: 80px;

  background: #333333;

  color: white;
`;

export const ContentBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 80%;
  height: 100%;
  padding: 0 16px;
`;

export const RightBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 224px;
`;

export const CartLink = styled(Link)`
  display: flex;

  font-size: 24px;
  font-weight: 500;
`;

export const CartCount = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 28px;
  height: 28px;
  margin-left: 8px;
  border-radius: 50%;

  background: #04c09e;

  font-size: 14px;
  font-weight: 700;
`;
