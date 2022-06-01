import styled from 'styled-components';

export default styled.div`
  padding: 13px;
  background-color: ${({ theme }) => theme.gray_50};
  border-radius: 8px;

  p {
    color: ${({ theme }) => theme.red_50};
    font-size: 1.5rem;
  }
`;
