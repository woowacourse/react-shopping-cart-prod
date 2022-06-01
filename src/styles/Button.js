import styled from 'styled-components';

export default styled.button`
  cursor: pointer;
  border: none;
  background-color: ${({ theme }) => theme.green_50};
  color: white;
  font-size: 2.4rem;
  transition: opacity 0.2s;

  width: 100%;
  height: 73px;

  &:hover:enabled {
    opacity: 0.6;
  }

  &:disabled {
    background-color: ${({ theme }) => theme.gray_100};
    cursor: not-allowed;
  }
`;
