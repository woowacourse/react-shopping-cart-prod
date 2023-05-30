import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Select = styled.select`
  width: 160px;
  height: 48px;
  border: none;
  border-radius: 4px;
  margin-left: 12px;
  font-size: 32px;
  background-color: transparent;
  color: #fff;

  & > option {
    text-align: center;
  }
`;

export const HomeLink = styled(Link)`
  display: flex;
  align-items: center;

  font-size: 40px;
  font-weight: 900;
`;
