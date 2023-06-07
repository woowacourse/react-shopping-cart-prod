import styled from 'styled-components';

export const ButtonWithHoverScalingEffect = styled.button`
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.02);
  }
`;
