import styled from 'styled-components';
import Flex from '../Flex';

export const Item = styled.li`
  display: flex;

  height: 20rem;

  padding: 4rem 0;
`;

export const Thumbnail = styled.img`
  aspect-ratio: 1/1;
  height: 100%;

  margin: 0 2rem;

  background: red;
`;

export const Info = styled(Flex)``;

export const SubInfo = styled.div`
  padding: 2rem 0;

  color: #888888;
  font-size: 1.6rem;
  font-weight: 400;
`;

export const Name = styled.div`
  font-size: 2rem;
  color: #33333;

  line-height: 24px;
`;
