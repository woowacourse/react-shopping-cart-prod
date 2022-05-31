import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 280px;
  border-radius: 8px;
  border: 2px solid ${({ theme }) => theme.COLOR.GREY_200};
  background-color: ${({ theme }) => theme.COLOR.WHITE};

  display: flex;
  flex-direction: column;
`;
