import styled from 'styled-components';

export default styled.div`
  display: flex;

  .page-item {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 35px;
    height: 38px;
    border: 1px solid ${({ theme }) => theme.gray_200};
    background-color: white;

    &:hover {
      background-color: ${({ theme }) => theme.gray_100};

      p {
        color: ${({ theme }) => theme.green_100};
      }
    }

    &.__disabled {
      cursor: default;
      background-color: ${({ theme }) => theme.gray_100};
    }
  }

  .page-item p {
    font-size: 1.5rem;
    color: ${({ theme }) => theme.green_50};
  }
`;
