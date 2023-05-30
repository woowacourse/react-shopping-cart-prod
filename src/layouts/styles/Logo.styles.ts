import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Select = styled.select`
  width: 20px;
  height: 48px;
  border: none;
  margin-left: 12px;
  font-size: 20px;
  background-color: transparent;
  color: #fff;

  & > option {
  }
`;

export const LogoTitle = styled.h1`
  margin-left: 12px;

  vertical-align: center;

  @media (max-width: 520px) {
    font-size: 24px;
  }
`;

export const HomeLink = styled(Link)`
  display: flex;
  align-items: center;

  font-size: 40px;
  font-weight: 900;
`;
