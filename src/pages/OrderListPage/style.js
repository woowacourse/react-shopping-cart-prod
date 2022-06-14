import styled from 'styled-components';

export default styled.div`
  width: 100%;
  height: 100%;
  padding: 60px 15%;
  background-color: ${({ theme }) => theme.white_100};

  .order-wrapper {
    margin-bottom: 40px;

    &:last-of-type {
      margin: 0;
    }
  }
`;
