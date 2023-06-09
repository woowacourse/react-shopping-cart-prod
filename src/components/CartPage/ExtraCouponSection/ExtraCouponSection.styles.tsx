import styled from 'styled-components';
import Flex from '../../common/Flex';
export const Root = styled.section`
  flex-grow: 1;

  padding: 5rem 0;
`;

export const Title = styled.div`
  padding-bottom: 1.5rem;

  font-size: 1.6rem;
  color: #333333;
  border-bottom: 3px solid #aaaaaa;
`;

export const TextWrapper = styled(Flex)`
  justify-content: space-between;

  width: 100%;

  padding: 3rem 2rem;
`;

export const Text = styled.span<{ color?: string }>`
  font-weight: 700;
  font-size: 2rem;

  color: ${({ color }) => color ?? '#333333'};
`;
