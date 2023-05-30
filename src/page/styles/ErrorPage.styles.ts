import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;

  font-size: 16px;
`;

export const Image = styled.img`
  margin-bottom: 16px;
`;

export const Title = styled.h1`
  margin: 32px 0;

  font-size: 28px;
`;

export const Message = styled.p`
  margin: 8px 0;

  font-size: 16px;
`;

export const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 160px;
  height: 44px;
  margin: 64px 0;

  background-color: #04c09e;
  border-radius: 8px;

  color: #ffffff;
`;
