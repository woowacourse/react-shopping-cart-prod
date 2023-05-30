import styled from 'styled-components';
import Flex from '../Flex';

export const Root = styled.section`
  border: 1px solid #aaaaaa;
`;

export const Order = styled(Flex)`
  height: 9.2rem;

  padding: 0 4rem;

  font-weight: 400;
  font-size: 20px;

  color: #333333;
  background: #f6f6f6;
`;

export const DetailButton = styled.button`
  background: transparent;
  border: none;
  font-weight: 400;
  font-size: 20px;
`;

export const ItemList = styled.ul`
  & > li {
    border-top: 1px solid #aaaaaa;
  }
`;
