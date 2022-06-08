import styled from 'styled-components';

export default styled.div`
  width: 100%;
  height: 70px;
  padding: 0 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.white_50};
  border: 1px solid ${({ theme }) => theme.gray_200};

  p {
    font-size: 1.5rem;
    letter-spacing: 0.5px;
    color: ${({ theme }) => theme.black_50};
  }
`;
