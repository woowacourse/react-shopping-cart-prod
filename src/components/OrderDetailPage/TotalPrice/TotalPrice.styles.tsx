import styled from 'styled-components';
import Flex from '../../common/Flex';

export const Root = styled.aside`
  max-width: 40%;
  border: 1px solid #aaaaaa;

  margin-left: auto;
`;

export const Info = styled(Flex)`
  height: 9.2rem;

  padding: 0 4rem;

  font-weight: 400;
  font-size: 2rem;

  color: #333333;
  background: #f6f6f6;
`;

export const Price = styled(Flex)`
  height: 9.2rem;

  border-top: 1px solid #aaaaaa;

  font-weight: 700;
  font-size: 1.7rem;

  padding: 0 4rem;
`;
